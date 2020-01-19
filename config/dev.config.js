const baseConfig=require("./base.config");
const webpackMerge=require("webpack-merge");
const path=require("path");

//合并
const config =webpackMerge(baseConfig,{
    //当前的环境
    mode:"development",
    //开发环境的css与生产环境的css不一样
    module:{
        rules:[
            {
                test:/\.(css|scss)$/,

                //执行顺序是从右到左，从下到上
                //style-loader的作用： 可以将你在js中引入的css放到style里面
                //生产环境中的css配置与开发环境中的配置不一样，这里就是开发环境，这个配置出来的css会在app.js里面，这会导致app.js文件过大，在加载的时候阻塞，形成空白页面，而不是作为独立的css存在
                //因此生产环境中css中的中的配置需要将css从app.js中抽离出来
                use:["style-loader","css-loader","sass-loader"],
                exclude:path.join(__dirname,"../node_modules")
            }
        ]
    },

    //服务器的配置项
    devServer:{//这里设置了服务，需要在命令中进行更改,并且需要安装webpack-dev-server
                //将webpack改为webpack-dev-server，区别：webpack是生产环境的一个命令,用来做打包的，webpack-dev-server是开发环境的一个命令，用来做开发的
        //开启服务的时候浏览器会自动打开,且窗口会对文件中的变动进行监视并作出相应的改变，比如sass中背景颜色改为黄色，那么打开的页面也会自动变为黄色
        open:true,
        //设置端口号
        port:9000,
        
    }
})
module.exports = config;

//由于这里是开发环境，所以要再在script中设置一个命令,并且需要设置开发所需要的服务器
