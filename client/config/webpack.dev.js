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
    filename: '[hash].js',
    path: path.resolve('client/public/build'),
  },
  devtool: 'source-map',
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      filename: `${path.resolve('client/public')}/index-dev.html`,
      template: htmlWebPackPluginTemplate,
      themeMediaQuery,
    }),
  ],
};
