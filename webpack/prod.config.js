const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const baseConfig = require('./base.config.js');

const UglifyJsPluginConfig = new webpack.optimize.UglifyJsPlugin({
  beautify: false,
  mangle: {
    screw_ie8: true
  },
  compress: {
    screw_ie8: true
  },
  comments: false
});

module.exports = merge(baseConfig, {
  entry: [
    './src/index.jsx'
  ],
  output: {
    filename: 'index.js',
    path: path.join(__dirname, '../build')
  },
  plugins: [UglifyJsPluginConfig]
});
