import examples from './examples';
import description from './truncate.md';

export default {
  description,
  examples,
  propsInfo: {
    text: {
      additionalInfo: 'Text to be ellipsized',
    },
    position: {
      additionalInfo: 'Ellipsis position',
      enum: 'truncateOptions',
    },
  },
};
