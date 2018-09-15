const webpack = require('webpack');
const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');

module.exports = {

    entry: {
        app: path.resolve(__dirname, 'assets/index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/build/',
        filename: 'index.js',
        chunkFilename: 'index.[name].js'
    },
    resolve: {
        extensions: ['.js']
    }
};
