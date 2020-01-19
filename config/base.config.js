const path=require("path");
// console.log(typeof path);是一个对象
const HtmlwebpackPlugin=require("html-webpack-plugin");
// console.log(typeof HtmlwebpackPlugin);是一个函数,
//由于返回的是一个对象，因此粗腰对其进行解构赋值
const {CleanWebpackPlugin}=require("clean-webpack-plugin");
/*
__dirname: 当前文件夹的绝对路径
path.join:做路径的拼接
*/


//配置入口文件和出口文件地址（类似于gulp中文件的读取与写入地址）
const PATH ={
    //配置入口路径
    app:path.join(__dirname,"../src/main.js"),
    //配置出口路径，文件不需要进行创建，会自动进行生成
    build:path.join(__dirname,"../dist"),
}



//配置webpack

module.exports={
    //入口的配置
    entry:{
        //这里的app名字的取名决定了出口文件的名字
        app:PATH.app
    },
    output:{
        path: PATH.build,
        filename: "[name].js",//这里的名字是动态的，就是entry入口的key值
    },
    plugins:[
        //将引入的模块进行实例化(里面需要配置项)
        new HtmlwebpackPlugin({
            //模板文件（这里的路径是基于根目录进行查找的）
            //新建一个public用于存储经静态文件,模板文件放置再里面
            //如果不使用模板文件或者模板文件内容为空的话，则打包之后的文件里只有<script type="text/javascript" src="app.js"></script>
            template:"./public/index.html",
            //打包完成之后生成的文件名字(这个文件再dist里面生成，即出口路径处)
            filename:"index.html",
            //这里的title是网页的title，然后再模板里面进行赋值
            //在html如何进行解析？<%= htmlWebpackPlugin.options.title%>
            
            title:"M站开发",
            //由于每次打包都会取生成一个[hash].html文件，会进行混乱，因此需要引入另一个插件进行文件的清空
            //插件的名字为clean-webpack-plugin，安装命令见md文件，
            //使用方式： 在公共文件夹里面对该模板进行引入
        }),
        new CleanWebpackPlugin()
    ],
    //resolve（别名的配置项）
    resolve:{
        //文件引入的优先级(就是在入口文件中的依赖模板进行引入的路径没有写后缀的情况下优先从左往右去找下面的后缀)

        extensions:[".js","scss","art","css","json"],
        //路径别名的配置
        alias:{
            "@":path.join(__dirname,"../src")
        }
    },
    //loader的配置,有些文件浏览器无法识别，需要通过loader将浏览器不识别的文件转化为浏览器识别的文件

    module:{
        //规则：通过哪种方式进行转换
        //一个对象代表一个规则
        rules:[
            {
                //引入非模块化的插件
                test:require.resolve("zepto"),
                //转换成模块的方式
                loader:"exports-loader?window.Zepto!script-loader"
            },
            {
                //凡是后缀名为js的文件，匹配该规则
                test:/\.js$/,
                //loader的方式(将es6的代码转换为es5的代码)
                //这里需要进行下载babel-loader
                //jsloader除此之外，还需要进行额外的配置(在根目录下创建一个.babelrc文件，
                //里面是一个对象，对象中的presets属性进行配置，里面是一个数组，这个数组里面的每一个数组都是单独的一个配置项)
                loader:"babel-loader",
                exclude:path.join(__dirname,"../node_modules")
            },
            //处理模板引擎文件
            {
                test:/\.art$/,
                loader:"art-template-loader"
            },
            //处理图片的loader
            {
                test:/\.(png|jpg|gif|svg)$/,
                //像上面直接写loader说明不需要其他配置项
                //如果不直接写loader，则需要其他配置项
                use:{
                   loader:"url-loader",
                   options:{
                       limit:2048,
                       //name是图片原始的名称，ext是文件的后缀名
                       name:"img/[name].[ext]"
                   }
                },
                exclude:path.join(__dirname,"../node_modules")
            },
            //处理字体的配置项
            {
                test:/\.(woff|woff2|svg|ttf|eot)$/,
                use:{
                    loader:"url-loader",
                    options:{
                        name:"font/[name].[ext]"
                    }
                },
                exclude:path.join(__dirname,"../node_modules")
            }
        ]
    }
}