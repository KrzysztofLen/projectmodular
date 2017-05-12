const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('styles/[name].bundle.css');
const postCSSOptions  = require('./postcss.config.js');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

const extractCommons = new webpack.optimize.CommonsChunkPlugin({
    name: 'commons',
    filename: 'js/commons.js'
})

imagemin(['img/*.{jpg,png}'], 'dist/images', {
    plugins: [
        imageminJpegtran({quality: '15-40'}),
        imageminPngquant({quality: '65-80'})
    ]
}).then(files => {
    console.log(files);
    //=> [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
});

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
            },
            {
                test: /\.(png|jpg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {limit: 10000} // Convert images < 10k to base64 strings
                }]
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