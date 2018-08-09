// Note: You must restart bin/webpack-dev-server for changes to take effect

/* eslint global-require: 0 */

const webpack = require('webpack');
const merge = require('webpack-merge');
const BrotliPlugin = require('brotli-webpack-plugin');
const sharedConfig = require('./shared.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(sharedConfig, {
    mode: 'production',
    output: {filename: '[name]-[chunkhash].js'},
    devtool: 'source-map',
    stats: 'normal',
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: true,
                parallel: true,
                uglifyOptions: {
                    compress: {
                        warnings: false,
                        drop_console: true
                    },
                    ecma: 5,
                    output: {
                        comments: false
                    }
                }
            })
        ],
    },
    plugins: [
        new BrotliPlugin({
            asset: '[path].br[query]',
            test: /\.(js|css|html|json|ico|svg|eot|otf|ttf)$/,
            threshold: 10240,
            minRatio: 0.9,
            quality: 11
        })
    ]
});
