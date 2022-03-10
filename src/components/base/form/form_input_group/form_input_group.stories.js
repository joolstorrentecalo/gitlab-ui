import { GlFormInputGroup, GlInputGroupText } from '../../../../index';
import { disableControls } from '../../../../utils/stories_utils';
import readme from './form_input_group.md';

const template = `
  <gl-form-input-group
    :readonly="readonly"
    :select-on-click="selectOnClick"
    :predefined-options="predefinedOptions"
    :label="label"
    :inputClass="inputClass">
    <template #prepend v-if="prepend">
      <gl-input-group-text>{{prepend}}</gl-input-group-text>
    </template>
    <template #append v-if="append">
      <gl-input-group-text>{{append}}</gl-input-group-text>
    </template>
  </gl-form-input-group>
`;

const defaultValue = (prop) => GlFormInputGroup.props[prop].default;

const generateProps = ({
  prepend = 'Username',
  append = 'Add',
  readonly = false,
  selectOnClick = false,
  predefinedOptions = defaultValue('predefinedOptions')(),
  label = '',
  inputClass = '',
} = {}) => ({
  prepend,
  append,
  readonly,
  selectOnClick,
  predefinedOptions,
  label,
  inputClass,
});

const Template = (args, { argTypes }) => ({
  components: { GlFormInputGroup, GlInputGroupText },
  props: Object.keys(argTypes),
  template,
});

export const Default = Template.bind({});
Default.args = generateProps();

export const PredefinedOptions = Template.bind({});
PredefinedOptions.args = generateProps({
  prepend: '',
  predefinedOptions: [
    { name: 'Embed', value: 'https://embed.com' },
    { name: 'Share', value: 'https://share.org' },
  ],
});

export default {
  title: 'base/form/form-input-group',
  component: GlFormInputGroup,
  knobs: { disabled: true },
  parameters: {
    bootstrapComponent: 'b-form-input',
    docs: {
      description: {
        component: readme,
      },
    },
    knobs: { disabled: true },
  },
  argTypes: {
    ...disableControls(['value']),
    prepend: {
      control: {
        type: 'text',
      },
    },
    append: {
      control: {
        type: 'text',
      },
    },
    inputClass: {
      control: {
        type: 'text',
      },
    },
    label: {
      control: {
        type: 'text',
      },
    },
  },
};
