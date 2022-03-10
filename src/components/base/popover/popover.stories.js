import { GlPopover, GlButton } from '../../../index';
import { popoverPlacements } from '../../../utils/constants';

const defaultValue = (prop) => GlPopover.props[prop].default;

const components = { GlPopover, GlButton };

const contentString = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent volutpat a nisi non
  pellentesque. Pellentesque efficitur vulputate rutrum. Fusce nisl magna, porttitor in
  massa ac, porta condimentum libero. Ut id lacus tristique, egestas arcu non, molestie nisi.
`;

const getTemplate = (id, slots = '') => `
  <div style="height:400px;" class="gl-display-flex gl-justify-content-center gl-align-items-center">
    <gl-button id="${id}">{{placement}}</gl-button>
    <gl-popover
      target="${id}"
      :triggers="triggers"
      :title="title"
      :placement="placement"
      :show-close-button="showCloseButton"
      content="${contentString}"
      data-testid="${id}"
      :show="$options.viewMode !== 'docs'">${slots}</gl-popover>
  </div>`;

const generateProps = ({
  placement = popoverPlacements.top,
  title = 'Popover',
  triggers = defaultValue('triggers'),
  cssClasses = defaultValue('cssClasses'),
  showCloseButton = defaultValue('showCloseButton'),
} = {}) => ({
  placement,
  title,
  triggers,
  cssClasses,
  showCloseButton,
});

export const Default = (_args, { viewMode, argTypes }) => ({
  viewMode,
  components,
  props: Object.keys(argTypes),
  template: getTemplate('popover-with-props'),
});
Default.args = generateProps();

export const WithCloseButton = (_args, { viewMode, argTypes }) => ({
  viewMode,
  components,
  props: Object.keys(argTypes),
  template: getTemplate('popover-with-close-button'),
});
WithCloseButton.args = generateProps({
  showCloseButton: true,
});

export const OnClick = (_args, { viewMode, argTypes }) => ({
  viewMode,
  components,
  props: Object.keys(argTypes),
  template: getTemplate(
    'popover-button-click',
    `
    <template #title>
      <span data-testid="popover-title">Popover title</span>
    </template>
  `
  ),
});
OnClick.args = generateProps({
  triggers: 'click',
});
OnClick.parameters = {
  storyshots: { disable: true },
};

export default {
  title: 'base/popover',
  component: GlPopover,
  parameters: {
    knobs: { disable: true },
    bootstrapComponent: 'b-popover',
  },
  argTypes: {
    placement: {
      options: Object.values(popoverPlacements),
      control: {
        type: 'select',
      },
    },
    title: {
      control: { type: 'text' },
    },
  },
};
