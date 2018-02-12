const path = require('path');
var webpack = require('webpack');
const SOURCE_DIR = path.resolve(__dirname, 'src/');
const BUILD_DIR = path.resolve(__dirname, 'build/');
module.exports = {
    entry: SOURCE_DIR + '/react-bubble-chart-d3.js',
    output: {
        path: BUILD_DIR,
        filename: 'react-bubble-chart-d3.js',
        libraryTarget: 'commonjs2'
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            include: SOURCE_DIR,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react']
            }
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            beautify: true,
            comments: true,
            mangle: false,
            compress: {
                dead_code: true,
                warnings: false
            },
        }),
    ],
    externals: {
        'react': 'commonjs react'
    }
};
