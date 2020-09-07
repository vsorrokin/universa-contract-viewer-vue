const fs = require('fs');
const path = require('path');

const webpack = require('webpack');
const {merge} = require('webpack-merge');
const baseConfig = require('./base.conf.js');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devServerConfig = {
  disableHostCheck: true,
  //bonjour: true, //allow to open server in all localhost devices
  host: '0.0.0.0', // If you want your server to be accessible externally then use '0.0.0.0'
  historyApiFallback: true,
  hot: true,
  overlay: {
    warnings: true,
    errors: true
  },
  open: true,
  contentBase: path.resolve('dev/static')
};

module.exports = merge(baseConfig, {
  mode: 'development',

  entry: '../dev/index.js',

  devServer: devServerConfig,

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new HTMLWebpackPlugin({
      template: '../dev/index.html'
    })
  ]
});
