'use strict';

const autoprefixer = require('autoprefixer');
const precss = require('precss');


module.exports = {
  entry: './index',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel?presets[]=es2015',
      exclude: /node_modules/
    }, {
      test: /\.less$/,
      loader: 'style!css!postcss',
      exclude: /node_modules/
    }]
  },
  postcss: () => {
    return [autoprefixer, precss];
  }
};