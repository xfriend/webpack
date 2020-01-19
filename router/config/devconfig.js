const baseConfig = require("./baseconfig");
const webpackMerge = require("webpack-merge")


const config = webpackMerge(baseConfig,{
    mode:"development",
    devtool:"cheap-module-eval-source-map",
    module:{
        rules:[
            {
                test:/\.(css|scss)$/,
                use:["style-loader","css-loader","sass-loader"]
            }
        ]
    },
    devServer:{
        port:9000,
        historyApiFallback: {
            rewrites: [{
                from: /.*/g,
                to: '/index.html' //与output的publicPath有关(HTMLplugin生成的html默认为index.html)
            }]
        }
    }
})

module.exports = config;