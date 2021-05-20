module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
    'import/prefer-default-export': [0],
    'babel/semi': 0,
    'react/jsx-props-no-spreading': 0,
  },
  env: {
    browser: true,
  },
  plugins: [
    'babel',
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: 'client/config/webpack.dev.js',
      },
    },
  },
};
