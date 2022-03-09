import path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import glob from 'glob';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import { string } from 'rollup-plugin-string';
import vue from 'rollup-plugin-vue';

/**
 * Returns true if an import is not considered for inlining into the current file.
 */
const isExternalModule = (moduleId, parentId) => {
  if (
    /**
     * If parentId isn't defined, this module is an entry point and should not be treated as external
     */
    !parentId ||
    /*
    SCSS files are considered to be included, because they will be extracted
    later with the help of rollup-plugin-postcss
     */
    moduleId.endsWith('.scss') ||
    /**
     * We want to inline markdown in our documentation, in order to be able to
     * use it directly in Pajamas
     */
    moduleId.endsWith('.md') ||
    /**
     * scss_to_js/ contains generated variables from our scss.
     * All of the variables would blow up the build size, so inlining only the
     * variables actually used in our JavaScript
     */
    moduleId.includes('scss_to_js/') ||
    /**
     * We want to inline the `<script>` portion of our Vue Single File components
     * Those are added as `modules` with an url like filename:
     * `component.js?rollup-plugin-vue=script.js`
     */
    moduleId.includes('?rollup-plugin-vue=')
  ) {
    return false;
  }

  /**
   * Everything else is an "external module", this means we do not roll up external
   * dependencies (bootstrap-vue / lodash / ...) or internal imports (e.g. ./button)
   *
   * This allows us to make @gitlab/ui treeshakeable.
   */
  return true;
};

/**
 * Fixes import files of compiled files
 *
 * @param {String} code Compiled code of the file
 */
const fixImports = (code) => {
  return (
    code
      /**
       * Remove `.vue` from imports, as we are compiling them to JS
       *
       * from './components/base/icon/icon.vue';
       * =>
       * from './components/base/icon/icon';
       */
      .replace(/(from\s+(["']).+?)\.vue(\2)/g, '$1$3')
      /**
       * Replace direct imports from bootstrap-vue/src with bootstrap-vue/esm,
       * as it is a pre-compiled, treeshakeable version we can use in GitLab
       *
       * from 'bootstrap-vue/src';
       * =>
       * from 'bootstrap-vue/esm/';
       */
      .replace(/(from\s+["'])bootstrap-vue\/src\//g, '$1bootstrap-vue/esm/')
      /**
       * Replace direct imports from bootstrap-vue with bootstrap-vue/esm,
       * as it is a pre-compiled, treeshakeable version we can use in GitLab
       *
       * from 'bootstrap-vue';
       * =>
       * from 'bootstrap-vue/esm/index.js';
       */
      .replace(/(from\s+(["']))bootstrap-vue(\2)/g, '$1bootstrap-vue/esm/index.js$3')
  );
};

export default glob
  .sync('src/**/!(*.stories|*.spec).+(js|vue)')
  .concat('utility_classes.js')
  .map((input) => {
    const outputFilename = input.replace(/^src\//, '').replace(/\.(vue|js)$/, '');

    return {
      external: isExternalModule,
      input,
      output: {
        format: 'esm',
        file: `dist/${outputFilename}.js`,
      },
      plugins: [
        replace({
          preventAssignment: true,
          delimiters: ['/\\* ', ' \\*/'],
          include: 'src/index.js',
          values: {
            'auto-inject-styles': "import './scss/gitlab_ui.scss';",
          },
        }),
        replace({
          preventAssignment: true,
          delimiters: ['/\\* ', ' \\*/'],
          include: 'src/scss/utilities.scss',
          values: {
            'auto-inject-scss-lib': `
              @import './functions';
              @import './variables';
              @import './utility-mixins/index';
            `,
          },
        }),
        postcss({
          extract: true,
          minimize: true,
          sourceMap: true,
          use: [['sass', { includePaths: [path.resolve(__dirname, 'node_modules')] }]],
        }),
        string({
          include: '**/*.md',
        }),
        vue({
          /**
           * Per default rollup-plugin-vue includes a `.mjs` version of
           * the component normalizer, which doesn't play well with jest
           * For this reason we include the common js version
           */
          normalizer: '~vue-runtime-helpers/dist/normalize-component.js',
        }),
        babel({
          babelHelpers: 'bundled',
          exclude: ['node_modules/!(bootstrap-vue)/**'],
        }),
        resolve(),
        commonjs({
          ignore: ['@gitlab/svgs/dist/icons.json'],
        }),
        {
          name: 'fix-imports',
          generateBundle(options, bundle) {
            Object.keys(bundle).forEach((key) => {
              if (bundle[key].code) {
                // eslint-disable-next-line no-param-reassign
                bundle[key].code = fixImports(bundle[key].code);
              }
            });
          },
        },
      ],
    };
  });
