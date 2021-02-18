import examples from './examples';
import description from './sprintf.md';

export default {
  followsDesignSystem: false,
  description,
  examples,
  propsInfo: {
    message: {
      additionalInfo: 'A translated string with named placeholders, e.g., "Written by %{author}".',
    },
    placeholders: {
      additionalInfo: `An object mapping slot names to custom start/end placeholders. Use this to avoid changing an existing message, and in turn invalidating existing translations, in the case it uses non-default placeholders.`,
    },
  },
  slots: [
    {
      name: '* (arbitrary)',
      description:
        'Available slots are determined by the placeholders in the provided message prop. For example, a message of "Written by %{author}" has a slot called "author", and its content is used to replace "%{author}" in the rendered output. When two placeholders indicate a start and an end region in the message, e.g., "%{linkStart}foo%{linkEnd}", the common base name can be used as a scoped slot, where the content between the placeholders is passed via the `content` scoped slot prop.',
    },
  ],
};
