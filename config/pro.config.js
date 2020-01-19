const path=require("path");
const webpackMerge=require("webpack-merge");
const baseConfig=require("./base.config");
const ExtractTextWebpackPlugin=require("extract-text-webpack-plugin");

const config=(baseConfig,{
    mode:"production",
    module:{
        rules:[
            {
                test:/\.(css|scss)$/,
                use:ExtractTextWebpackPlugin.extract({
                    //解析css和sass postcss用来加兼容前缀
                    use:[
                        {loader:"css-loader"},
                        //帮你去添加兼容前缀的，直接使用还会报错，需要进行二次配置
                        //如何配置：在根目录下新建一个postcss.config.js文件，里面需要导出一个模块
                        //具体请看文件,导出插件的配置项
                        
                        {loader:"postcss-loader"},
                        //解析sass
                        {loader:"sass-loader"}
                    ],
                    //作用：先将页面中style里面的css进行抽离，然后再进行上面的编译
                    fallback:"style-loader"
                }),
                exclude:path.join(__dirname,"../node_modules")
            }
        ]
    },
    plugins:[
        new ExtractTextWebpackPlugin({
            //hash.8的含义：由于hash值过长，取其中的8位
            filename:"css/[name].[hash:8].css"
        })
    ]
})
module.exports=config;//这里需要将build命令中的base该为pro，因为这才是最后的打包