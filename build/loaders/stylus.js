const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// stylus-loader - converts stylus to css
// css-loader is processing url() and import from css
// style-loader/vue-style-loader inserts the style into the page

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  test: /\.(styl|stylus)$/,
  use: [
    !isProd ? {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: process.env.NODE_ENV === 'development'
      }

    } : 'vue-style-loader',
    {loader: 'css-loader', options: {esModule: false}},
    'stylus-loader'
  ]
};
