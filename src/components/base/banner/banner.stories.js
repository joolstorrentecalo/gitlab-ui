import clusterPopoverSvg from '@gitlab/svgs/dist/illustrations/cluster_popover.svg';
import serviceDeskCalloutSvg from '@gitlab/svgs/dist/illustrations/service_desk_callout.svg';
import { GlBanner, GlButton } from '../../../index';
import { bannerVariants } from '../../../utils/constants';
import readme from './banner.md';

const template = `
    <gl-banner
      :title="title"
      :button-text="buttonText"
      :button-link="buttonLink"
      :svg-path="svgPath"
      :variant="variant"
      :embedded="embedded"
    >
      <p>GitLab Service Desk is a simple way to allow people to create issues in your GitLab instance without needing their own user account. It provides a unique email address for end users to create issues in a project, and replies can be sent either though the GitLab interface or by email. End users will only see the thread though email.</p>
    </gl-banner>
`;

const generateProps = ({
  title = 'Upgrade your plan to activate Service Desk',
  buttonText = 'Upgrade your plan',
  buttonLink = 'https://gitlab.com',
  svgPath = serviceDeskCalloutSvg,
  variant = GlBanner.props.variant.default,
  embedded = false,
} = {}) => ({
  title,
  buttonText,
  buttonLink,
  svgPath,
  variant,
  embedded,
});

const Template = (args, { argTypes }) => ({
  components: {
    GlBanner,
  },
  props: Object.keys(argTypes),
  template,
});
export const Default = Template.bind({});
Default.args = generateProps();

export const NoImage = Template.bind({});
NoImage.args = generateProps({
  svgPath: null,
});

export const Introduction = Template.bind({});
Introduction.args = generateProps({
  svgPath: clusterPopoverSvg,
  variant: bannerVariants[1],
});

export const Embedded = Template.bind({});
Embedded.args = generateProps({
  embedded: true,
});

export const WithActions = (args, { argTypes }) => ({
  components: {
    GlBanner,
    GlButton,
  },
  props: Object.keys(argTypes),
  template: `
    <gl-banner
      :title="title"
      :button-text="buttonText"
      :button-link="buttonLink"
      :svg-path="svgPath"
      :variant="variant"
    >
      <p>There should be a primary button and a link button below this text.</p>
      <template #actions>
        <gl-button class="gl-ml-3" variant="link">Ask again later</gl-button>
      </template>
    </gl-banner>`,
});
WithActions.args = generateProps({
  title: 'Button with actions banner',
  buttonText: 'Primary Button',
  svgPath: null,
});

export default {
  title: 'base/banner',
  component: GlBanner,
  parameters: {
    knobs: { disable: true },
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    variant: {
      options: bannerVariants,
      control: {
        type: 'select',
      },
    },
    svgPath: {
      control: 'text',
    },
  },
};
