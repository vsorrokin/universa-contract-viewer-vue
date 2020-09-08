const webpack = require('webpack');
const {merge} = require('webpack-merge');
const baseConfig = require('./base.conf.js');

const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(baseConfig, {
  mode: 'production',

  output: {
    filename: 'index.js',
    library: 'VueContractViewer',
    libraryTarget: 'umd',
    globalObject: 'typeof self !== \'undefined\' ? self : this',
  },

  optimization: {
    //minimize: false,
    minimizer: [new TerserJSPlugin({sourceMap: true}), new OptimizeCSSAssetsPlugin({})],
  },

  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: 'style.css'
    // })
  ]
});
