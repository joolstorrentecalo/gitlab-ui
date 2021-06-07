module.exports = {
  verbose: true,
  moduleFileExtensions: ['js', 'json', 'vue'],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
    '^@gitlab/ui$': '<rootDir>/index.js',
    '\\.(css|scss|less)$': 'identity-obj-proxy',
  },
  modulePathIgnorePatterns: ['cypress/integration'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.example.(vue)$': 'vue-jest',
    '.*\\.(vue)$': 'vue-jest',
    '\\.(svg|html)$': 'jest-raw-loader',
    '^.+\\.md?$': 'markdown-loader-jest',
  },
  transformIgnorePatterns: [
    '/node_modules(?![\\\\/]bootstrap-vue[\\\\/]|(/@storybook/.*\\.vue$)|(/@gitlab/svgs/))/',
  ],
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
  setupFilesAfterEnv: ['<rootDir>/tests/jest_setup.js'],
};
