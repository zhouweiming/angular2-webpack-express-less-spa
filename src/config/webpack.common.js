var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
const DefinePlugin = require('webpack/lib/DefinePlugin');
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

let getEntry = () => {
  if(process.env.NODE_ENV === "development"){
    return {
      'common': ['./public/common.ts', hotMiddlewareScript],
      'index': ['./public/index.ts', hotMiddlewareScript],
      'test': ['./public/dev_db/zbase.test.ts', hotMiddlewareScript]
    };
  }else{
    return {
      'common': ['./public/common.ts'],
      'index': ['./public/index.ts'],
      'test': ['./public/dev_db/zbase.test.ts']
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
        loader: 'style!css?sourceMap!less?sourceMap'
      },
      {
        test: /\.less$/,
        include: [helpers.root('public', 'components'), helpers.root('public', 'routes')],
        loader: 'raw!less?sourceMap'
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['index', 'common', 'test']
    }),
    new DefinePlugin({
     'ENV': JSON.stringify(process.env.NODE_ENV),
     'HMR': process.env.NODE_ENV === "development",
     'process.env': {
       'ENV': JSON.stringify(process.env.NODE_ENV),
       'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
     }
   })
  ]
};
