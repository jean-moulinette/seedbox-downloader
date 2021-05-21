const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  alias,
  themeMediaQuery,
  rules,
  htmlWebPackPluginTemplate,
} = require('./shared');

module.exports = {
  entry: path.resolve('client/src/index.js'),
  module: {
    rules,
  },
  resolve: {
    alias,
  },
  output: {
    filename: 'build.js',
    path: path.resolve('client/public/build-prod'),
  },
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      filename: `${path.resolve('client/public')}/index.html`,
      template: htmlWebPackPluginTemplate,
      themeMediaQuery,
    }),
  ],
};
