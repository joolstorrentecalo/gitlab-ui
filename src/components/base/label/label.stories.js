import { GlLabel } from '../../../index';
import { labelSizeOptions, tooltipPlacements } from '../../../utils/constants';
import readme from './label.md';

const template = `
  <div class="gl-display-flex">
    <gl-label
      :background-color="backgroundColor"
      :size="size"
      :title="title"
      :description="description"
      :tooltip-placement="tooltipPlacement"
      :target="target"
      :scoped="scoped"
      :show-close-button="showCloseButton"
      :disabled="disabled"
    />
  </div>`;

const Template = (args, { argTypes }) => ({
  components: { GlLabel },
  props: Object.keys(argTypes),
  template,
});

const generateProps = ({
  title = 'Label title',
  size = labelSizeOptions.default,
  tooltipPlacement = tooltipPlacements.top,
  scoped = false,
  description = '',
  target = '#',
  backgroundColor = '#D9C2EE',
  showCloseButton = false,
  disabled = false,
} = {}) => ({
  backgroundColor,
  title,
  description,
  size,
  tooltipPlacement,
  target,
  scoped,
  showCloseButton,
  disabled,
});

export const Default = Template.bind({});
Default.args = generateProps();

export const Scoped = Template.bind({});
Scoped.args = generateProps({ title: 'scoped::label', scoped: true });

export const WithCloseButton = Template.bind({});
WithCloseButton.args = generateProps({ showCloseButton: true });

export default {
  title: 'base/label',
  component: GlLabel,
  parameters: {
    knobs: { disable: true },
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    backgroundColor: {
      control: {
        type: 'color',
      },
    },
    size: {
      options: labelSizeOptions,
    },
    tooltipPlacement: {
      options: tooltipPlacements,
      control: {
        type: 'select',
      },
    },
  },
};
