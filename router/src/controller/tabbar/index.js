import tabbar from "../../view/tabbar.art"
import "../../styles/tabbar/index.scss"
class Tabbar {
    constructor() {
        this.footers = [
            {
                icon: "&#xe634;",
                text: "首页",
                path: "/"
            },
            {
                icon: "&#xe66c;",
                text: "分类",
                path: "/classify"
            },
            {
                icon: "&#xe60e;",
                text: "排行",
                path: "/list"
            },
            {
                icon: "&#xe63a;",
                text: "我的",
                path: "/mine"
            }
        ]
    }
    init() {
        this.render();
    }
    render() {
        let data = this.footers
        let html = tabbar({ data });
        $("#app").append(html)
        this.bindEvent()
    }
    bindEvent() {
        this.ali = $("#footer>ul li");
        this.ali.each(this.handleAliEach.bind(this))
    }
    handleAliEach(index) {
        this.ali.eq(index).on("click", this.handleAliTabCb.bind(this, index))
    }
    handleAliTabCb(index) {
       
        switch (index) {
            case 0:
                router.push("/");
                break;
            case 1:
                router.push("/classify");
                break;
            case 2:
                router.push("/list");
                break;
            case 3:
                router.push("/mine");
                break;
        }
    }
}

export default new Tabbar