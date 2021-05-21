const path = require('path');

const themeMediaQuery = `
<style>
  @media (prefers-color-scheme: dark) {
    body {
      background: #212121;
    }
  }
  @media (prefers-color-scheme: light) {
    body {
      background :#FAFAFA;
    }
  }
</style>
`;

module.exports = {
  alias: {
    ui: path.resolve('client/src/ui/'),
    bootstrap: path.resolve('client/src/bootstrap/'),
    business: path.resolve('client/src/business/'),
    icons: path.resolve('client/src/icons'),
    hooks: path.resolve('client/src/hooks'),
    services: path.resolve('client/src/services'),
  },
  htmlWebPackPluginTemplate: `${path.resolve('client/public')}/index-template.html`,
  themeMediaQuery,
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
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
    },
  ],
};
