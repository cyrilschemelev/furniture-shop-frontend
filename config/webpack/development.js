// Note: You must restart bin/webpack-dev-server for changes to take effect

const merge = require('webpack-merge');
const sharedConfig = require('./shared.js');
const { settings, output } = require('./configuration.js');
// const JsDocPlugin = require('jsdoc-webpack-plugin');

module.exports = merge(sharedConfig, {
    mode: 'development',
    devtool: 'cheap-eval-source-map',
    output: {
      pathinfo: true
    },
    // plugins: [
    // //     new JsDocPlugin({
    // //         conf: './jsdoc.conf'
    // //     })
    // ],
    devServer: {
        hot: false,
        hotOnly: false,
        inline: false,
        clientLogLevel: 'none',
        https: settings.dev_server.https,
        host: settings.dev_server.host,
        port: settings.dev_server.port,
        contentBase: output.path,
        publicPath: output.publicPath,
        compress: true,
        headers: { 'Access-Control-Allow-Origin': '*' },
        historyApiFallback: true,
        watchOptions: {
            ignored: /node_modules/
        },
        stats: {
            colors: true,
            hash: false,
            version: true,
            timings: true,
            assets: false,
            chunks: false,
            modules: false,
            reasons: true,
            children: false,
            source: false,
            errors: true,
            errorDetails: true,
            warnings: true,
            publicPath: false
        }
    }
});
