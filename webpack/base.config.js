const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const EnvPlugin = new webpack.EnvironmentPlugin([
  'NODE_ENV'
]);

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.join(__dirname, '../public/index.html'),
  favicon: path.join(__dirname, '../public/favicon.png'),
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    EnvPlugin,
    HTMLWebpackPluginConfig
  ]
};
