import iconSpriteInfo from '@gitlab/svgs/dist/icons.json';
import { GlIcon } from '../../../index';
import { iconSizeOptions } from '../../../utils/constants';
import { disableControls } from '../../../utils/stories_utils';
import readme from './icon.md';

const components = {
  GlIcon,
};

const generateProps = ({
  name = 'check-circle',
  size = 32,
  ariaLabel = 'This is an icon',
} = {}) => ({
  name,
  size,
  ariaLabel,
});

const template = `<gl-icon :name="name" :size="size" :aria-label="ariaLabel"/>`;

const Template = (args) => ({
  components,
  props: Object.keys(args),
  template,
});

export const Default = Template.bind({});
Default.args = generateProps();

export default {
  title: 'base/icon',
  component: GlIcon,
  parameters: {
    knobs: { disable: true },
    docs: {
      description: {
        component: readme,
      },
    },
    storyshots: { disable: true },
  },
  argTypes: {
    ...disableControls(['useDeprecatedSizes']),
    name: {
      control: {
        type: 'select',
        options: iconSpriteInfo.icons,
      },
    },
    size: {
      control: {
        type: 'select',
        options: iconSizeOptions,
      },
    },
  },
};
