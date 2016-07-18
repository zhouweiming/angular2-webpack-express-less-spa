var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

module.exports = {
  entry: {
    'index': ['./public/index.ts', hotMiddlewareScript]
  },

  resolve: {
    extensions: ['', '.js', '.ts']
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts'
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.ejs$/,
        loader: 'html'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('public', 'components'),
        loader: 'style!css?sourceMap'
      },
      {
        test: /\.css$/,
        include: helpers.root('public', 'components'),
        loader: 'raw'
      }
    ]
  }
};
