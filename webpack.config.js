"use strict";

const merge = require('webpack-merge');
const webpack = require('webpack');
const PATHS = require('./webpack-paths');
const loaders = require('./webpack-loaders');

const common = {
    entry: {
        app: ['babel-polyfill', PATHS.src]
    },
    output: {
        path: PATHS.dist,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
          loaders.babel,
          loaders.css,
          loaders.font,
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};

let config;

switch(process.env.NODE_ENV) {
    case 'build':
        config = merge(
            common,
            { devtool: 'source-map' },
            {plugins: [ // Hot module
                new webpack.optimize.DedupePlugin(), //dedupe similar code 
                new webpack.optimize.UglifyJsPlugin(), //minify everything
                new webpack.optimize.AggressiveMergingPlugin()]}//Merge chunks  // SourceMaps on separate file
         );
        break;

    case 'development':
        config = merge(
            common,
            { devtool: 'eval-source-map' }, // Default value
            loaders.devServer({
                host: process.env.host,
                port: 3001
            })
        );
}

module.exports = config;
