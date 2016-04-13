'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackBaseConfig = require('./webpack.config');

module.exports =
Object.assign(webpackBaseConfig, {
  devtool: 'source-map', // Add source maps
  entry: Object.assign({},  {
    example: webpackBaseConfig.entry.example,
    base: [] // Hot reload will be injected here
  }),
  output: Object.assign(webpackBaseConfig.output, {
    filename: '[name].min.js', // Change js file name to `min.js` even though it's not minified just so won't need to change `index.html` to fit github
    publicPath: 'dist' // So that index.html won't need to change emoji-windiw.js import location also on github
  }),
  plugins: webpackBaseConfig.plugins.concat([
    new HtmlWebpackPlugin({
      chunks: ['base'],  // Others are added manually to `index.html`
      template: './index.html',
      inject: 'head'
    })
  ])
});