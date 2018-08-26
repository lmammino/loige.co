module.exports = {
  extends: ['standard', 'plugin:react/recommended'],
  env: {
    browser: true,
    es6: true,
  },
  plugins: ['react'],
  globals: {
    graphql: false,
    __PATH_PREFIX__: true,
    L: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
  },
}
