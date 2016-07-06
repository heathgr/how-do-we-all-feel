//jscs:disable
'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    __dirname + '/src/index'
  ],
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    alias: {
      firebaseConfig: __dirname + '/../config/firebase/development/firebaseConfig',
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        include: __dirname,
        query: {
          presets: ["es2015", "react"]
        }
      }
    ]
  }
};
