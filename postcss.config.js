module.exports={

    //插件
    plugins:[
        //自动添加浏览器前缀
        require("autoprefixer")({
            //重写浏览器清单
            overrideBrowserslist:[
                "defaults",
                "Android 4.1",
                "ios 7.1",
                "chrome>31",
                "ff>31",
                "ie>=8",
                "last 2 version",
                ">0%"
            ]
        })
    ]
}