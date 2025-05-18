const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    optimization: {
        minimize: false,
    },
    watchOptions: {
        ignored: /node_modules/,
    },
}); 