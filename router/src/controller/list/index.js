import list from "../../view/list.art"
import tabbar from "../tabbar"
class List{
    constructor(){
        
    }
    init(){
        this.render();
    }
    render(){
        $("#app").html("");
        var html  = list();
        $("#app").html(html);
        tabbar.init();
    }
}

export default new List