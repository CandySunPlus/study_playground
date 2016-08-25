'use strict';

const autoprefixer = require('autoprefixer');
const precss = require('precss');
const webpack = require('webpack');


module.exports = {
  entry: './index',
  output: {
    filename: 'bundle.js'
  },
  plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
      })
  ],
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