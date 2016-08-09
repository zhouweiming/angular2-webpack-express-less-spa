var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
const DefinePlugin = require('webpack/lib/DefinePlugin');
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

const is_development = process.env.NODE_ENV === "development";

var commonExtract = new ExtractTextPlugin("assets/common" + (is_development ? "" : ".[hash]") + ".css");
var componentExtract = new ExtractTextPlugin("assets/component" + (is_development ? "" : ".[hash]") + ".css");

let getEntry = () => {
  if (is_development) {
    return {
      'common': ['./public/common.ts', hotMiddlewareScript],
      'index': ['./public/index.ts', hotMiddlewareScript],
      'test': ['./public/dev_db/zbase.test.ts', hotMiddlewareScript]
    };
  } else {
    return {
      'common': ['./public/common.ts'],
      'index': ['./public/index.ts']
    }
  }
};

module.exports = {
  entry: getEntry(),

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
        test: /\.less$/,
        exclude: [helpers.root('public', 'components'), helpers.root('public', 'routes')],
        loader: commonExtract.extract('style', 'css?sourceMap!less?sourceMap')
      },
      {
        test: /\.less$/,
        include: [helpers.root('public', 'components'), helpers.root('public', 'routes')],
        loader: componentExtract.extract('style', 'css?sourceMap!less?sourceMap')
      }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    commonExtract,
    componentExtract,
    new webpack.optimize.CommonsChunkPlugin({
      name: is_development ? ["index", "test", "common"] : ['index', 'common']
    }),
    new DefinePlugin({
      'ENV': JSON.stringify(process.env.NODE_ENV),
      'HMR': is_development,
      'process.env': {
        'ENV': JSON.stringify(process.env.NODE_ENV),
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
};
