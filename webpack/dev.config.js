const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
  devtool: 'eval-source-map',
  devServer: {
    host: 'localhost',
    port: '3000',
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  entry: [
    'react-hot-loader/patch',
    './src/index.jsx'
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
});
