# webpack基本使用
> 1. 进行项目的初始化，生成package.json文件
> 2. 安装 `webpack webpack-cli`    `cnpm install webpack webpack-cli webpack-dev-server -D`
    将webpack主要模块进行加载
> 3. 创建src文件夹(开发环境的目录),src文件夹中必须要有一个入口文件(main.js)名字可以随便取,将src文件夹下的main.js设置为入口文件,他自身以及他的依赖的模板通过          loader进行打包进入出口文件夹dist中，文件名为入口配置的key值
> 4. 创建webpack.config.js文件，因为webpack在执行的时候会默认找到根目录下面的webpack.config.js文件
> 5. webpack.config.js进行配置(包括对入口即出口文件地址的配置，以及webpack的配置)
    __dirname:当前的根目录
    ```
    var path=require("path");//path 为nodejs的主要模块
    console.log(__dirname);    //这里打印文件的根目录
    console.log(path.join(__dirname,"./src))//路径的拼接
    ```shuibianqu

> 6. 打包命令(初级使用)npx webpack      
    npx:默认从当前文件的node——modules中找到对应的模块

> 7. script里面运行命令     npm run 命令的key

> 8. script中的配置项  --config:指定文件的配置项   --progress:显示文件打包的进度条

> 9. plugins:使用插件   webpack中凡是用插件的地方都必须要在plugins中进行使用 
    1.插件 html-webpack-plugin   `cnpm install html-webpack-plugin -D`
        上面的插件的功能是每次打包之后会生成一个html进行打包好的模板文件的引用，验证其打包的正确性
    2.插件 clean-webpack-plugin   `cnpm install clean-webpack-plugin -D`
        上面的插件的功能是将每次打包之前生成的[hash].html文件进行清除，防止文件的污染
    3.extract-text-webpack-plugin  抽离css，将app.js文件中的css抽离，优化    该模块是一个构造函数
    `cnpm install extract-text-webpack-plugin@next -D`
> 10. loader:模块的转换，凡是需要将浏览器不识别的文件转换为浏览器识      别的文件的配置项都需要在module中进行配置

> 11. webpack.merge:合并webpack配置项 `cnpm install webpack-merge -D`

> 12. webpack-dev-server   创建开发环境服务 `cnpm webpack-dev-server -D`

> 13. 处理非模块化的插件 安装： `cnpm install script-loader exports-loader -D `,然后在module.exports中配置，即在base环境中的module中进行配置
```js
    {
                //引入非模块化的插件(工作中如果需要则直接更该zepto为所需要转换的模块)
                test:require.resolve("zepto"),
                //转换成模块的方式
                loader:"exports-loader?window.Zepto!script-loader"
            },



```
**jsloader**//由于这些文件之间是相互依赖的，所以需要安装多个
    1.babel-loader//关联后两个
    2.@babel/core
    3.@babel/preset-env
    //安装命令： `cnpm install babel-loader @babel/core @babel/preset-env -D`
**cssloader**
    1.style-loader
    2.css-loader
    3.sass-loader
    4.postcss-loader
    //在解析sass的时候除了需要sass-loader之外还需要一个特别重要的模块node-sass，sass-loader依赖node-sass

    //安装命令    `cnpm install style-loader css-loader node-sass sass-loader postcss-loader autoprefixer -D`
    peerDependencies WARNING sass-loader@* requires a peer of node-sass@^4.0.0 but none was installed 
    peerDependencies WARNING sass-loader@* requires a peer of sass@^1.3.0 but none was installed      
    peerDependencies WARNING sass-loader@* requires a peer of fibers@>= 3.1.0 but none was installed 
**图片loader**
    1.url-loader
    2.file-loader
    //安装命令   `cnpm install url-loader file-loader -D`
    //两个loader的区别：
    //url-loader一般用来解析一些体积比较小的图片，可以通过options中的limit来设置图片的大小，如果图片大于limit的大小，则会用file-loader进行解析 file-loader一般用来解析比较大的图片


**打包的时候速度比较慢，怎么进行优化**
    //在配置规则中添加exclude:path.join(__dirname,"../node_modules")

```json
    {
    //一个配置项，预设的意思
    "presets": [
        [
            //定义版本的转换
            "@babel/preset-env",
            {
                //设置浏览器版本
                "targets":{
                    //兼容到所有浏览器的最后两个版本
                    "browsers":["last 2 version"]
                }
            }
        ]
    ]
}
```


//搭建一个开发环境和一个生产环境，所以webpack的配置文件需要配置两套出来，因此需要创建一个配置文件的文件夹，里面包含三个文件，
//一个公共的配置文件，一个开发环境的配置文件，一个生产环境的配置文件，
并且打包的命令也要由之前的npx webpack 改为npx webpack --progress --config  config/base.config.js,相应的入口和出口路径也需要进行调整,其中progress为显示进度条

package.json中的script可以理解为一个命令对象
在script中写模块的化系统会自动在node——modules中进行寻找，因此不需要写npx
script里面运行命令     npm run 命令的key

如果需要检测文件打包之后代码是否正确，则需要在src文件夹中(也可以在其他文件夹中)创建一个html文件，将打包好的app.js文件引入该html文件中，然后在浏览器进行运行
但是我们不可能每次都去打包然后进行创建html文件进行验证，利用plugins可以帮我们自动搞定这个步骤，安装好插件之后再公用的配置文件里面引入该模块，然后再导出的配置项当中进行配置












# 琐碎的概念
> -D   :-save-dev   将当前依赖安装到开发环境中去
> -S   :-save       将当前环境安装到生产环境中去