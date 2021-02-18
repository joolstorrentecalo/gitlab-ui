import { withKnobs, text, select } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { GlLink } from '../../../../index';
import { targetOptions } from '../../../utils/constants';
import readme from './link.md';

const components = {
  GlLink,
};

function generateProps({ href = '#' } = {}) {
  return {
    href: {
      type: String,
      default: text('href', href),
    },
    target: {
      type: String,
      default: select('target', targetOptions, null),
    },
  };
}

documentedStoriesOf('base/link', readme)
  .addDecorator(withKnobs)
  .add('default link', () => ({
    props: generateProps(),
    components,
    template: `
      <gl-link
        :href="href"
        :target="target"
      >
          This is a link
      </gl-link>`,
  }));
