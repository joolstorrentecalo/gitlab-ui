import { GlLoadingIcon } from '../../../index';
import { viewModeOptions, loadingIconSizes } from '../../../utils/constants';
import readme from './loading_icon.md';

const template = `
  <div :class="['gl-p-3', 'gl-rounded-base', 'gl-text-center', { 'bg-dark' : color === 'light' } ]" >
    <gl-loading-icon
      :label="label"
      :size="size"
      :inline="inline"
      :color="color"
    />Loading
  </div>
`;

const defaultValue = (prop) => GlLoadingIcon.props[prop].default;

const generateProps = () => ({
  label: defaultValue('label'),
  size: defaultValue('size'),
  color: defaultValue('color'),
  inline: defaultValue('inline'),
});

const Template = (args) => ({
  components: { GlLoadingIcon },
  props: Object.keys(args),
  template,
});

export const Default = Template.bind({});
Default.args = generateProps();

export default {
  title: 'base/loading icon',
  component: GlLoadingIcon,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
    knobs: {
      disabled: true,
    },
  },
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: viewModeOptions,
      },
    },
    size: {
      control: {
        type: 'select',
        options: loadingIconSizes,
      },
    },
  },
};
