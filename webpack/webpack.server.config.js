const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
   entry: './source/server.jsx',

   output: {
      filename: 'index.js',
      path: path.resolve(__dirname, '../built/server'),
      publicPath: process.env.NODE_ENV === 'production'
      ? 'https://platzi-react-sfs.now.sh'
      : 'http://localhost:3001'
   },

   module: {

      loaders: [
         {
            test: /\.json$/,
            loader: 'json-loader'
         },
         {
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /(node_modules)/,

            query: {
               presets: ['latest-minimal', 'react'],

               env: {

                  production: {
                     plugins: ['transform-regenerator', 'transform-runtime'],
                     presets: ['es2015'],
                  },

                  development: {
                     presets: ['latest-minimal'],
                  }

               }

            }

         },
         {
            test: /\.css$/,
            loader:  ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?modules' })
         }
      ]

   },
   target: 'node',
   resolve: {
      'extensions': ['.js', '.jsx', '.css']
   },
   plugins: [
      new webpack.DefinePlugin({
      'process.env': {
           NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
         },
      }),
      new webpack.optimize.OccurrenceOrderPlugin(true),
      new ExtractTextPlugin('../statics/styles.css'),
   ]

};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      mangle: {
        except: ['$super', '$', 'exports', 'require'],
      },
    })
  );
}

module.exports = config;
