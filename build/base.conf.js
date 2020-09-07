const path = require('path');

const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const loaders = require('./loaders');

const context = path.resolve('./src');

module.exports = {
  mode: 'development',

  context,

  entry: './index.js',

  resolve: {
    extensions: ['.js', '.vue', '.styl'],
    alias: {
      '@': context
    },
    symlinks: false
  },

  module: {
    rules: [
      loaders.babel,
      loaders.stylus,
      loaders.vue,
      loaders.pug,
      loaders.css
    ]
  },

  plugins: [
    new VueLoaderPlugin()
  ]
};
