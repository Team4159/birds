const path = require("path");
const validator = require('webpack-validator');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: ['babel-polyfill', path.join(__dirname, "./src/index.js")],
    output: {
        path: path.join(__dirname, "./static"),
        filename: "bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new webpack.DefinePlugin({
            URL_PREFIX: JSON.stringify(process.env.URL_PREFIX || "")
        })
    ],
    module: {
        loaders: [
            {
                loaders: ["babel"],
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }
};

module.exports = validator(config);
