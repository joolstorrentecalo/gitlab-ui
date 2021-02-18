import { storiesOf } from '@storybook/vue';
import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';
import { configureReadme } from 'storybook-readme';

import 'url-search-params-polyfill';

import { GlExampleExplorer, GlComponentDocumentation } from '../documentation';

import { componentValidator as isValidComponent } from './all_components';

/**
 * This functions returns the component's name from the current window location's search
 *
 * Assume you have this Structure:
 * - Base
 *    - Form
 *       - Form-Group
 *          - Default
 *          - With Validations
 *
 * The URI would look like this: `iframe.html?id=base-form-form-group--with-validations`
 *
 * The actual component name we are looking for is `GlFormGroup`.
 * We know that we can remove the last part.
 * But unfortunately from `base-form-form-group` we cannot guess which of the following is the component name:
 *   - GlBaseFormFormGroup
 *   - GlFormFormGroup
 *   - GlFormGroup
 *   - GlGroup
 *
 * So we are going to through loop all of these and return the first valid component (`GlFormGroup`)
 *
 * @returns {string}
 */
function getComponentName() {
  const urlParams = new URLSearchParams(window.location.search);

  const storySlug = urlParams.get('id').split('--')[0];
  const splitSlug = storySlug.split('-');

  let componentName;

  do {
    splitSlug.shift();
    componentName = `Gl${upperFirst(camelCase(splitSlug.join('-')))}`;
  } while (splitSlug.length > 0 && !isValidComponent(componentName));

  if (!isValidComponent(componentName)) {
    throw new Error('Could not find a matching component');
  }

  return componentName;
}

export const setupStorybookReadme = () =>
  configureReadme({
    StoryPreview: {
      disableForComponents: [],
      components: {
        GlComponentDocumentation,
        GlExampleExplorer,
      },
      data() {
        return {
          componentName: null,
          error: '',
          // Style the preview component container
          // Default container forcefully centers the preview element
          styles: {
            padding: '50px 35px',
            margin: '16px 0',
            border: '1px dashed rgb(229, 229, 229)',
          },
        };
      },
      mounted() {
        try {
          this.componentName = getComponentName();
          this.error = '';
        } catch (error) {
          this.componentName = false;
          this.error = error.message;
        }
      },
      template: `
      <div>
        <div class="story-container" v-bind:style="styles"><slot></slot></div>
        {{ error }}
        <template v-if="componentName && !$options.disableForComponents.includes(componentName)">
          <gl-example-explorer :componentName="componentName" />
          <gl-component-documentation :componentName="componentName" />
        </template>
      </div>`,
    },
  });

export const documentedStoriesOf = (name, readme) => {
  const story = storiesOf(name, module);
  if (process.env.NODE_ENV !== 'test') {
    story.addParameters({
      readme: {
        content: readme,
      },
    });
  }
  return story;
};
