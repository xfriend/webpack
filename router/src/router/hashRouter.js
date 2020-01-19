export default class AlleyRouter{
    constructor(options){
        //配置项
        this.$options = options;
        //路由的形式
        this.$mode = options.mode || "hash";
        //路由表的配置
        this.$routes = options.routes;
        //初始路径
        this.current = "/";
        //路由表(很重要) 因为我们需要根据路由表来渲染页面
        this.routesMap = {};

        //存放路由的参数  query
        this.query = {};

        this.init();
    }
    init(){
        //1、路由的事件  监听路由的变换  
        this.bindEvents();

        //2、遍历路由表
        this.createRoutes();

        //3、路由渲染
        // this.renderTemplate();

        //4、判断路由的形式 因为hash路由是带#的 而history是不带#号的
        this.isMode();
    }
    isMode(){
        if(this.$mode == "hash"){
            var hash = window.location.hash || "#/";
            window.location.hash = hash;
        }
    }
    bindEvents(){
        //页面第一次进入的时候也需要监听
        window.addEventListener("load",this.handleBindEventsCb.bind(this))
        //监听hash值的改变
        window.addEventListener("hashchange",this.handleBindEventsCb.bind(this))
    }
    handleBindEventsCb(){
        //当hash值发生改变的时候需要做的事情
        if(this.$mode == "hash"){
            //获取hash值
            var hash = this.getHash();
            this.current = hash;
        }

        this.renderTemplate();
    }
    getHash(){
        return window.location.hash.split("?")[0].slice(1) || "/"
    }
    createRoutes(){
        //将路由表的配置项转换成对象形式  供页面渲染使用   {"/":{path:"",template:""}}
        this.$routes.forEach((item)=>{
            this.routesMap[item.path] = item;
        })
    }
    renderTemplate(){
        this.getQuery();
        //通过this.current拿到对应的构造函数  执行init方法来进行页面的渲染
        var template = this.routesMap[this.current].template;
        template.init();
    }
    //路由跳转
    push(path){
        if(this.$mode == "hash"){
            window.location.hash = path;
        }
    }
    //获取路由的参数
    getQuery(){
        var href = window.location.href;
        var obj = href.substring(href.indexOf("?")+1).split("&").reduce((pre,cur)=>{
            var key = cur.split("=")[0];
            var val = cur.split("=")[1];

            pre[key] = val;
            return pre;
        },{})

        this.query = obj;
    }
}