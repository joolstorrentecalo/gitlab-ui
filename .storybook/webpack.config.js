const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const sassLoaderOptions = {
  includePaths: [require('path').resolve(__dirname, '..', 'node_modules')],
};

module.exports = ({ config }) => {
  config.module.rules = [
    {
      test: /\.(md|html)$/,
      loader: 'raw-loader',
    },
    {
      test: /\.example\.vue$/,
      loader: 'raw-loader',
    },
    {
      /*
       * This rule is used to load the typescale demo CSS
       * in a isolated shadow root
       */
      test: /typescale\/\w+_demo\.scss$/,
      loaders: [
        'raw-loader',
        {
          loader: 'sass-loader',
          options: sassLoaderOptions,
        },
      ],
    },
    {
      test: /\.s?css$/,
      exclude: /(typescale\/\w+_demo\.scss)$/, // skip typescale demo stylesheets
      loaders: [
        {
          loader: 'style-loader',
          options: {
            insert: function(styles) {
              if (!process.env.IS_GITLAB_INTEGRATION_TEST) {
                document.head.appendChild(styles);
              }
            },
            attributes: {
              'data-gitlab-ui-style': true,
            },
          },
        },
        'css-loader',
        { loader: 'postcss-loader', options: { plugins: [autoprefixer] } },
        {
          loader: 'sass-loader',
          options: sassLoaderOptions,
        },
      ],
    },
    {
      test: /\.vue$/,
      exclude: /\.example\.vue$/,
      loader: 'vue-loader',
    },
    {
      test: /@gitlab\/svgs\/dist\/(icons|illustrations\/.+)\.svg$/,
      loader: 'file-loader',
    },
    {
      test: /\.js$/,
      exclude: /node_modules\/(?!(bootstrap-vue)\/).*/,
      use: {
        loader: 'babel-loader',
        options: {
          envName: 'storybook',
        },
      },
    },
  ];

  config.plugins.push(
    new webpack.EnvironmentPlugin({
      IS_GITLAB_INTEGRATION_TEST: false,
      IS_VISUAL_TEST: false,
    })
  );

  if (process.env.WEBPACK_REPORT) {
    config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'static' }));
  }

  config.resolve.alias['@gitlab/ui'] = path.join(__dirname, '..', 'index.js');

  // disable HMR in test environment because this breaks puppeteer's networkidle0 setting
  // which is needed for storyshots to function
  if (process.env.NODE_ENV === 'test') {
    config.entry = config.entry.filter(
      singleEntry => !singleEntry.includes('/webpack-hot-middleware/')
    );
  }

  // Filter out the progress plugin on CI, as it is very verbose
  if (process.env.CI) {
    console.log(
      'Webpack compilation will start soon - ProgressPlugin disabled on CI due to too much output'
    );
    config.plugins = config.plugins.filter(plugin => plugin.constructor.name !== 'ProgressPlugin');
  }

  config.plugins.push(new webpack.IgnorePlugin(/moment/, /pikaday/));

  return config;
};
