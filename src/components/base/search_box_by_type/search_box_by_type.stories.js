import { GlSearchBoxByType } from '../../../index';
import { disableControls } from '../../../utils/stories_utils';
import readme from './search_box_by_type.md';

const template = `
  <gl-search-box-by-type
    v-model="searchQuery"
    :clear-button-title="clearButtonTitle"
    :disabled="disabled"
    :is-loading="isLoading"
    :placeholder="placeholder"
  />
`;

const defaultValue = (prop) => GlSearchBoxByType.props[prop].default;

const generateProps = ({
  clearButtonTitle = defaultValue('clearButtonTitle'),
  disabled = defaultValue('disabled'),
  placeholder = 'Search',
  isLoading = defaultValue('isLoading'),
} = {}) => ({
  clearButtonTitle,
  disabled,
  placeholder,
  isLoading,
});

const Template = (args, { argTypes }) => ({
  components: {
    GlSearchBoxByType,
  },
  props: Object.keys(argTypes),
  data: () => ({ searchQuery: '' }),
  template,
});
export const Default = Template.bind({});
Default.args = generateProps();

export default {
  title: 'base/search-box-by-type',
  component: GlSearchBoxByType,
  parameters: {
    knobs: { disable: true },
    bootstrapComponent: 'b-form-input',
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    ...disableControls(['value']),
  },
};
