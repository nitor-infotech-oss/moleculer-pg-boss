module.exports = {
  root: true,
  env: {
    node: true,
    commonjs: true,
    es6: true,
    jquery: false,
    jest: true,
    jasmine: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'no-var': ['warn'],
    'no-console': ['warn'],
    'no-unused-vars': ['warn'],
  },
};
