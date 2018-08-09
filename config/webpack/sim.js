/* eslint global-require: 0 */

const webpack = require('webpack');
const merge = require('webpack-merge');
const BrotliPlugin = require('brotli-webpack-plugin');
const sharedConfig = require('./shared.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
                        warnings: false
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
        }),
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerHost: '127.0.0.1',
          analyzerPort: 8090,
          reportFilename: 'report.html',
          defaultSizes: 'gzip',
          openAnalyzer: false,
          generateStatsFile: false,
          statsFilename: 'stats.json',
          statsOptions: null,
          logLevel: 'info'
        })
    ]
});
