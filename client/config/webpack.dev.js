const path = require('path');

module.exports = {
  entry: path.resolve('client/src/index.js'),
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-transform-react-jsx',
              'babel-plugin-styled-components',
              '@babel/plugin-proposal-class-properties',
            ],
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      ui: path.resolve('client/src/ui/'),
      bootstrap: path.resolve('client/src/bootstrap/'),
      business: path.resolve('client/src/business/'),
    },
  },
  output: {
    filename: 'main.js',
    path: path.resolve('client/public'),
  },
  devtool: 'eval-source-map',
  mode: 'development',
};
