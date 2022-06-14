import readme from './token_selector.md';
import GlTokenSelector from './token_selector.vue';

const template = `
  <div>
    <gl-token-selector
      v-model="selectedTokens"
      v-bind="$props"
      @text-input="handleTextInput"
      @focus="handleFocus" />
    {{ selectedTokens }}
  </div>
`;

const generateProps = () => ({
  dropdownItems: [
    {
      id: 1,
      name: 'Vue.js',
    },
    {
      id: 2,
      name: 'Ruby On Rails',
      class: 'gl-text-white! gl-bg-data-viz-magenta-950!',
    },
    {
      id: 3,
      name: 'GraphQL',
    },
    {
      id: 4,
      name: 'Redis',
      class: 'gl-text-white! gl-bg-data-viz-green-700!',
    },
    {
      id: 5,
      name: 'CSS',
      class: 'gl-text-red-500!',
      style: { backgroundColor: '#97acff' },
    },
  ],
});

const Template = (args, { argTypes }) => ({
  components: { GlTokenSelector },
  props: Object.keys(argTypes),
  template,
  mounted() {
    document.querySelector('.gl-token-selector input[type="text"]').focus();
  },
  data() {
    return {
      filteredDropdownItems: [],
      inputText: '',
      selectedTokens: [
        {
          id: 1,
          name: 'Vue.js',
        },
      ],
    };
  },
  methods: {
    handleTextInput(value) {
      this.inputText = value;

      if (this.inputText === '') {
        this.filteredDropdownItems = this.dropdownItems;

        return;
      }

      this.filterDropdownItems();
    },
    handleFocus() {
      if (this.inputText !== '') {
        this.filterDropdownItems();
      } else {
        this.filteredDropdownItems = this.dropdownItems;
      }
    },
    filterDropdownItems() {
      this.filteredDropdownItems = this.dropdownItems.filter((dropdownItem) => {
        return dropdownItem.name.toLowerCase().includes(this.inputText.toLowerCase());
      });
    },
  },
});

export const Default = Template.bind({});
Default.parameters = { storyshots: { disable: true } };
Default.args = generateProps();

export default {
  title: 'base/token_selector',
  component: GlTokenSelector,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    state: {
      options: [true, false, null],
      control: 'radio',
    },
  },
};
