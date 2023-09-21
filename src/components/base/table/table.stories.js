import GlFormInput from '../form/form_input/form_input.vue';
import GlTable from './table.vue';
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

const generateProps = ({
  stickyHeader = false,
  fixed = false,
  footClone = false,
  stacked = false,
  caption = '',
} = {}) => ({
  stickyHeader,
  fixed,
  footClone,
  stacked,
  caption,
});

export const Default = (args, { argTypes }) => ({
  components,
  props: Object.keys(argTypes),
  template: `
  <gl-table
    :sticky-header="stickyHeader"
    :items="$options.items"
    :fields="$options.fields"
    :fixed="fixed"
    :stacked="stacked"
    :foot-clone="footClone"
    hover
    selectable
    selected-variant="primary"
  >
    <template v-if="caption" #table-caption>
      {{ caption }}
    </template>
  </gl-table>
`,
  fields: [
    {
      key: 'col_1',  
      label: 'Column 1',
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
              :sticky-header="stickyHeader"
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

export const WithStickyHeader = (args, { argTypes }) => ({
  components: { ...components, GlFormInput },
  props: Object.keys(argTypes),
  template: `<div class="gl-line-height-normal">
      <gl-form-input v-model="filter" placeholder="Type to search" />
      <br />
      <gl-table
              :sticky-header="stickyHeader"
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
  items: [
    ...tableItems,
    ...tableItems,
    ...tableItems,
    ...tableItems,
    ...tableItems,
    ...tableItems,
    ...tableItems,
    ...tableItems,
    ...tableItems,
    ...tableItems,
  ],
  data() {
    return {
      filter: null,
    };
  },
});
WithStickyHeader.args = generateProps({ stickyHeader: true });

export default {
  title: 'base/table/table',
  component: GlTable,
  parameters: {
    bootstrapComponent: 'b-table',
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    stacked: {
      options: ['sm', 'md', 'lg', 'xl', true, false],
      control: 'select',
    },
    stickyHeader: {
      options: [false, true],
      control: 'boolean',
    },
  },
};
