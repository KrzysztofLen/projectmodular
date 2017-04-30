const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('styles/[name].bundle.css')
const postCSSOptions  = require('./postcss.config.js');

const extractCommons = new webpack.optimize.CommonsChunkPlugin({
    name: 'commons',
    filename: 'js/commons.js'
})

const config = {
    context: path.resolve(__dirname, 'js'),
    entry: "./includehtml.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js'
    },
    module: {
        rules: [
            {
            test: /\.js$/,
            include: path.resolve(__dirname, 'src'),
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['es2015',  {modules: false}]
                    ]
                }
            }]
        },
            {
                test: /\.scss$/,
                loader: extractCSS.extract([
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: postCSSOptions
                    },
                    {
                        loader: 'sass-loader'
                    }
                ])
            }
        ]
    },
    plugins: [
        extractCSS,
        extractCommons
    ]
};

//# TODO next configuration of webpack

module.exports = config;