import { GlAvatarLink, GlAvatar, GlAvatarLabeled } from '../../../index';
import { avatarSizeOptions, avatarShapeOptions } from '../../../utils/constants';
import readme from './avatar_link.md';

const components = { GlAvatarLink, GlAvatar };

const generateDefaultProps = ({
  href = 'https://gitlab.com/gitlab-org/gitlab',
  shape = 'circle',
  size = 32,
} = {}) => ({
  href,
  shape,
  size,
});

const generateLabelsProps = ({ label = 'GitLab User', subLabel = '@gitlab' } = {}) => ({
  label,
  subLabel,
});

const generateImageProps = ({
  src = 'https://assets.gitlab-static.net/uploads/-/system/project/avatar/278964/logo-extra-whitespace.png?width=64',
} = {}) => ({
  src,
});

export const Default = (args, { argTypes }) => ({
  components,
  props: Object.keys(argTypes),
  template: `
    <gl-avatar-link target="blank" :href="href">
      <gl-avatar :src="src" :size="size" :shape="shape" />
    </gl-avatar-link>
    `,
});
Default.args = { ...generateDefaultProps(), ...generateImageProps() };

export const WithLabeledAvatar = (args, { argTypes }) => ({
  components: { GlAvatarLink, GlAvatarLabeled },
  props: Object.keys(argTypes),
  template: `
  <gl-avatar-link target="blank" :href="href">
    <gl-avatar-labeled :src="src" :size="size" :shape="shape" :label="label" :sub-label="subLabel" />
  </gl-avatar-link>
  `,
});
WithLabeledAvatar.args = {
  ...generateDefaultProps({}),
  ...generateLabelsProps({}),
  ...generateImageProps({}),
};

export const WithNoImageAvatar = (args, { argTypes }) => ({
  components,
  props: Object.keys(argTypes),
  template: `
    <gl-avatar-link target="blank" :href="href">
      <gl-avatar-labeled :entity-name="label" :label="label" :sub-label="subLabel" :size="size" :shape="shape" />
    </gl-avatar-link>
    `,
});
WithNoImageAvatar.args = { ...generateDefaultProps({}), ...generateLabelsProps({}) };

export default {
  title: 'base/avatar/avatar-link',
  component: GlAvatarLink,
  parameters: {
    knobs: { disable: true },
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    shape: {
      options: avatarShapeOptions,
      control: {
        type: 'select',
      },
    },
    size: {
      options: avatarSizeOptions,
      control: {
        type: 'select',
      },
    },
  },
};
