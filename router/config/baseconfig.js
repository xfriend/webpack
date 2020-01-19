const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin=require('copy-webpack-plugin');
const PATH = {
    app: path.join(__dirname, "../src/main.js"),
    build: path.join(__dirname, "../dist")
}

module.exports = {
    entry: {
        app: PATH.app
    },
    output: {
        path: PATH.build,
        filename: "js/[name].js",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "index.html"
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                context: path.join(__dirname, '../public/'),
                from: '**/*',
                to:path.join(__dirname,"../dist"),
                ignore:["index.html"]
            }
        ])
    ],
    resolve: {
        extensions: [".js", ".art", ".json", ".css"],
        alias: {

        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader"
            },
            {
                test: require.resolve('zepto'),
                use: ['exports-loader?window.Zepto', 'script-loader']
            },
            {
                test: /\.art/,
                loader: "art-template-loader"
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 2048,
                        name: "img/[name].[ext]"
                    }
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        name: "font/[name].[ext]"
                    }
                }
            }
        ]
    }
}