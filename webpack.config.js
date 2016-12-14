const path = require('path');
const webpack = require('webpack');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const failPlugin = require('webpack-fail-plugin');

module.exports = {
    resolve: {
     root: path.resolve(__dirname, 'src'),
     extensions: ['', '.ts', '.js'],
   },
    plugins: [
      failPlugin,
      new WebpackCleanupPlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
    ],
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loaders: ['babel-loader'],
        }, {
            test: /\.glsl$/,
            loaders: ['es6-text-loader'],
        }, {
            test: /\.ts$/,
            exclude: /(node_modules|bower_components)/,
            loaders: ['babel-loader', 'ts-loader'],
        }],
    },
    entry: [
        path.resolve(__dirname, 'src/index.ts'),
    ],
    node: {
      global: false,
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        libraryTarget: 'commonjs',
    },
};
