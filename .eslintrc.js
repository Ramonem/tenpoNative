module.exports = {
  env: {
    es6: true,
    'react-native/react-native': true
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  plugins: [
    'babel',
    'import',
    'react',
    'react-native',
    'prettier',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    //General rules
    "no-use-before-define": 0,
    'arrow-parens': 'off',
    'object-curly-newline': 'off',
    'no-mixed-operators': 'off',
    'arrow-body-style': 'off',
    'function-paren-newline': 'off',
    'no-plusplus': 'off',
    'semi': ['error', 'never'],
    'space-before-function-paren': 0,
    'max-len': ['error', 100, 2, { ignoreUrls: true, ignoreRegExpLiterals: true }],
    'no-console': 'error',
    'no-alert': 'error',
    'no-param-reassign': 'off',
    'radix': 1,
    'prefer-destructuring': 'off',
    'no-useless-concat': 'error',
    'prefer-template': 'error',
    'quotes': ['error', 'backtick'],
    'no-shadow': 0,
    //React rules
    'react/require-default-props': 'off',
    'react/forbid-prop-types': 'off',
    'react/no-did-mount-set-state': 'off',
    'react/no-unused-prop-types': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
    'react/prop-types': 0,
    'react/destructuring-assignment': [1, 'always', { 'ignoreClassFields': true }],
    'react/no-array-index-key': 0,
    //React native rules
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 2,
    'react-native/no-color-literals': 2,
    'react-native/no-raw-text': 0,
    'prettier/prettier': ['error'],
    //Import rules
    'import/prefer-default-export': 0
  },
};