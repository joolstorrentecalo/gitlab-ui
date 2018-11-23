import { withKnobs } from '@storybook/addon-knobs/vue';
import documentedStoriesOf from '../utils/documented_stories';

const template = `
  <div>
    <gl-button id="pop-top">Top</gl-button>
    <gl-popover target="pop-top"
      placement="top"
      title="Popover!"
      triggers="hover focus"
      content="Placement Top"
      show
      />
  </div>
  `;

documentedStoriesOf('popover', '')
  .addDecorator(withKnobs)
  .add('default', () => ({
    template,
  }));
