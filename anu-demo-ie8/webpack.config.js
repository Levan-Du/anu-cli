const webpack = require('webpack'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    TransferWebpackPlugin = require('transfer-webpack-plugin');


module.exports = {
    entry: {
        index: [
            'eventsource-polyfill', //兼容ie
            'webpack-hot-middleware/client?reload=true', //看上面
            './src/index.js'
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/dist'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }],
        postLoaders: [{
            test: /\.js$/,
            loader: "es3ify-loader"
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html'),
            filename: 'index.html',
            inject: true
        }),
        new TransferWebpackPlugin([
            { from: 'services/polyfill', to: '/js' }
        ], path.join(__dirname, 'src')),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    resolve: {
        alias: {
            react: "anujs/dist/ReactIE.js",
            "react-dom": "anujs/dist/ReactIE.js"
        }
    }
}