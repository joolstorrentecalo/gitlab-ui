import Vue from 'vue';
import { disableControls } from '../../../../utils/stories_utils';
import { GlTooltipDirective } from '../../../../directives/tooltip';
import GlIcon from '../../icon/icon.vue';
import GlLink from '../../link/link.vue';
import GlFormInput from '../form_input/form_input.vue';
import GlFormTextarea from '../form_textarea/form_textarea.vue';
import readme from './form_group.md';
import GlFormGroup from './form_group.vue';

Vue.directive('gl-tooltip', GlTooltipDirective);

const components = {
  GlFormGroup,
};

const generateProps = ({
  id = 'group-1',
  label = 'Label Name',
  description = 'form group description (used as help text).',
  labelDescription = '',
  optional = GlFormGroup.props.optional.default,
  optionalText = GlFormGroup.props.optionalText.default,
} = {}) => ({
  id,
  label,
  labelDescription,
  optional,
  optionalText,
  description,
});

const makeBindings = (overrides = {}) =>
  Object.entries({
    ':id': "id + '_group'",
    ':label-for': 'id',
    ':label': 'label',
    ':label-description': 'labelDescription',
    ':optional': 'optional',
    ':optional-text': 'optionalText',
    ':description': 'description',
    ...overrides,
  })
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');

const wrap = (template, bindingsOverrides = {}) => `
  <gl-form-group
    ${makeBindings(bindingsOverrides)}
    >
    ${template}
  </gl-form-group>
`;

export const Default = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ...components, GlFormInput },
  template: wrap('<gl-form-input :id="id" />'),
});
Default.args = generateProps();

export const Disabled = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ...components, GlFormInput },
  template: wrap('<gl-form-input :id="id"  type="text" value="Disabled" disabled />'),
});
Disabled.args = generateProps({ description: 'This feature is disabled.' });

export const WithTextarea = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ...components, GlFormTextarea },
  template: wrap('<gl-form-textarea :id="id" placeholder="Enter something" />'),
});
WithTextarea.args = generateProps({
  id: 'textarea2',
  optional: true,
  description: '',
});

export const WithLabelDescription = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ...components, GlFormInput },
  template: wrap('<gl-form-input :id="id" />'),
});
WithLabelDescription.args = generateProps({
  optional: true,
  labelDescription: 'form group label description (used as description).',
});

const WithLabelSlotTemplateString = `<template #label>
    Label name
    <gl-icon v-gl-tooltip title="Information" name="information-o" :size="16" />
    <div class="label-description">
      form group label description with a <gl-link variant="ui" href="#">link</gl-link> (used as description).
    </div>
  </template>
  <gl-form-input :id="id" />`;
export const WithLabelSlot = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ...components, GlFormInput, GlLink, GlIcon },
  template: wrap(WithLabelSlotTemplateString, { description: '' }),
});
WithLabelSlot.args = generateProps({
  optional: true,
});
WithLabelSlot.parameters = {
  docs: {
    source: {
      code: `
<gl-form-group
  labelDescription=""
  optional
  optionalText=""
  id="group-1_group"
  label-for="group-1"
  label=""
  description=""
>
  ${WithLabelSlotTemplateString}
</gl-form-group>
      `,
    },
  },
};

const WithDescriptionSlotTemplateString = `<gl-form-input :id="id" />
  <template #description>
    form group description with a <gl-link variant="ui" href="#">link</gl-link> (used as help text).
  </template> `;
export const WithDescriptionSlot = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ...components, GlFormInput, GlLink },
  template: wrap(WithDescriptionSlotTemplateString, { description: '' }),
});
WithDescriptionSlot.args = generateProps({
  optional: true,
});
WithDescriptionSlot.parameters = {
  docs: {
    source: {
      code: `
<gl-form-group
  labelDescription=""
  optional
  optionalText="(optional)"
  id="group-1_group"
  label-for="group-1"
  label="Label Name"
  description=""
>
  ${WithDescriptionSlotTemplateString}
</gl-form-group>
      `,
    },
  },
};

export const WithValidations = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ...components, GlFormInput },
  template: `
    <div>
    ${wrap('<gl-form-input :id="id + \'-name1\'" :state="false" />', {
      'invalid-feedback': 'This field is required.',
      ':label-for': "id + '-name1'",
    })}
    ${wrap('<gl-form-input :id="id + \'-name2\'" :state="true" value="Sidney Jones" />', {
      'valid-feedback': 'This field is valid.',
      ':id': "'group2'",
      ':label-for': "id + '-name2'",
    })}
    </div>
  `,
});
WithValidations.args = generateProps({
  label: 'Name',
  description: 'Enter a first and last name.',
});

export default {
  title: 'base/form/form-group',
  component: GlFormGroup,
  parameters: {
    bootstrapComponent: 'b-form-group',
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    ...disableControls(['labelClass']),
    label: {
      control: 'text',
    },
  },
};
