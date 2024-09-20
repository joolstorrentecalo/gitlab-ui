import { progressBarOptions } from '../../../utils/constants';
import GlProgressBar from './progress_bar.vue';

const generateProps = ({ value = 30, variant = progressBarOptions.primary } = {}) => ({
  value,
  variant,
});

const Template = (args, { argTypes }) => ({
  components: { GlProgressBar },
  props: Object.keys(argTypes),
  template: '<gl-progress-bar :value="value" :variant="variant" />',
});

export const Default = Template.bind({});
Default.args = generateProps();

export const SuccessVariant = Template.bind({});
SuccessVariant.args = generateProps({ variant: progressBarOptions.success });
SuccessVariant.parameters = { controls: { disabled: true } };

export const WarningVariant = Template.bind({});
WarningVariant.args = generateProps({ variant: progressBarOptions.warning });
WarningVariant.parameters = { controls: { disabled: true } };

export const DangerVariant = Template.bind({});
DangerVariant.args = generateProps({ variant: progressBarOptions.danger });
DangerVariant.parameters = { controls: { disabled: true } };

export default {
  title: 'base/progress-bar',
  component: GlProgressBar,
  parameters: {
    bootstrapComponent: 'b-progress',
  },
  argTypes: {
    variant: {
      options: progressBarOptions,
      control: 'select',
    },
  },
};
