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

    }
    bindEvents(){
        window.addEventListener("load",this.handleBindEventsCb.bind(this))
        //popstate用来监听路由的变换(浏览器的前进后退按钮)
        window.addEventListener("popstate",this.handleBindEventsCb.bind(this))
    }
    handleBindEventsCb(){
        if(this.$mode == "history"){
            this.current = this.getHistory()
        }

        this.renderTemplate();
    }
    getHistory(){
        //获取请求的地址
        return window.location.pathname;
    }
    createRoutes(){
        this.$routes.forEach((item)=>{
            this.routesMap[item.path] = item;
        })
    }
    renderTemplate(){
        var template = this.routesMap[this.current].template;
        template.init();
    }
    push(path){
        if(this.$mode == "history"){
            //路由跳转
            window.history.pushState(path,"",path);
            //记录路由跳转的地址
            this.current = window.location.pathname;
            //渲染页面
            this.renderTemplate();
        }
    }

}