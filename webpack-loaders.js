"use strict";

const webpack = require('webpack');
const PATHS = require('./webpack-paths');

exports.devServer = function(options) {
    return {
        devServer:{
            historyApiFallback: true,
            hot: true, // Enable hot module
            inline: true,
            stats: 'errors-only',
            host: options.host, // http://localhost
            port: options.port, // 3000
            contentBase: './dist',
        },
        // Enable multi-pass compilation for enhanced performance
        plugins: [ // Hot module
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.HotModuleReplacementPlugin({
                multistep: true
            }),
            new webpack.NamedModulesPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.LoaderOptionsPlugin({
              debug: true
            }),
            new webpack.optimize.DedupePlugin(), //dedupe similar code 
            new webpack.optimize.UglifyJsPlugin(), //minify everything
            new webpack.optimize.AggressiveMergingPlugin()//Merge chunks 
        ]
    };
}

exports.css = {
  test: /\.css$/,
  loaders: ['style-loader', 'css-loader'],
  include: PATHS.css
}

exports.font = {
  test: /\.ttf$/,
  loaders: ['file-loader']
}

exports.babel = {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  loaders: ['babel-loader']
};
