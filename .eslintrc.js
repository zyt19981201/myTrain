module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier'],
  env: {
    browser: true,
    es6: true,
  },
  rules: {
    'react/jsx-filename-extension': [1, {
      extensions: ['.js', '.jsx'],
    }],
    'react/prop-types': 0,
    'react/prefer-stateless-function': 0,
    'react/no-array-index-key': 0,
    'no-console': 0,
    'jsx-ally/anchor-is-valid': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-one-expression-per-line': 0,
    'linebreak-style': ["off", "windows"],
    'import/extensions': 0
  },
};