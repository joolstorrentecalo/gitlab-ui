import has from 'lodash/has';
import { documentedStoriesOf } from '../../../documentation/documented_stories';
import typescaleDocs from './typescale.md';
import uiTypescaleDemoContent from './typescale_demo.html';
import uiTypescaleDemoStyles from './typescale_demo.scss';

const createTypescaleDemoComponent = (componentName, typescaleCSS, demoContent) => {
  if (!has(window, 'customElements') || customElements.get(componentName)) {
    return;
  }
  class TypescaleDemo extends HTMLElement {
    constructor() {
      super();

      const shadow = this.attachShadow({ mode: 'open' });
      const style = document.createElement('style');
      const wrapper = document.createElement('body');

      style.textContent = typescaleCSS;
      wrapper.innerHTML = demoContent;

      shadow.appendChild(style);
      shadow.appendChild(wrapper);
    }
  }

  customElements.define(componentName, TypescaleDemo);
};

createTypescaleDemoComponent('ui-typescale-demo', uiTypescaleDemoStyles, uiTypescaleDemoContent);

const component = {
  template: '<ui-typescale-demo />',
};

documentedStoriesOf('scss/typescale', typescaleDocs).add('default', () => component, {
  viewport: { defaultViewport: 'breakpointExtraLarge' },
});
