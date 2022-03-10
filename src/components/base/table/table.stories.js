import { GlTable, GlFormInput } from '../../../index';
import readme from './table.md';

const components = { GlTable };

const tableItems = [
  {
    column_one: 'test',
    col_2: 1234,
  },
  {
    column_one: 'test2',
    col_2: 5678,
  },
  {
    column_one: 'test3',
    col_2: 9101,
  },
];

const generateProps = ({ fixed = false, footClone = false, stacked = false } = {}) => ({
  fixed,
  footClone,
  stacked,
});

export const Default = (args, { argTypes }) => ({
  components,
  props: Object.keys(argTypes),
  template: `
  <gl-table
    :items="$options.items"
    :fields="$options.fields"
    :fixed="fixed"
    :stacked="stacked"
    :foot-clone="footClone"
    hover
    selectable
    selected-variant="primary"
  />
`,
  fields: [
    {
      key: 'column_one',
      label: 'Column One',
      variant: 'secondary',
      sortable: false,
      isRowHeader: false,
    },
    {
      key: 'col_2',
      label: 'Column 2',
      formatter: (value) => value,
    },
  ],
  items: tableItems,
});
Default.args = generateProps();

export const Empty = (args, { argTypes }) => ({
  components,
  props: Object.keys(argTypes),
  template: `
      <gl-table show-empty />
    `,
});
Empty.parameters = { controls: { disable: true } };

export const WithFilter = (args, { argTypes }) => ({
  components: { ...components, GlFormInput },
  props: Object.keys(argTypes),
  template: `<div class="gl-line-height-normal">
      <gl-form-input v-model="filter" placeholder="Type to search" />
      <br />
      <gl-table 
              :items="$options.items" 
              :fields="$options.fields" 
              :filter=filter
              :fixed="fixed"
              :stacked="stacked"
              :foot-clone="footClone"
              hover
              selectable
              selected-variant="primary"
          />
      </div>`,
  items: tableItems,
  data() {
    return {
      filter: null,
    };
  },
});
WithFilter.args = generateProps();

export default {
  title: 'base/table/table',
  component: GlTable,
  parameters: {
    bootstrapComponent: 'b-table',
    knobs: { disable: true },
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    stacked: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg', 'xl', true, false],
      },
    },
  },
};
