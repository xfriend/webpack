import homeView from "../../view/home.art"
import tabbar from "../tabbar"

class Home{
    constructor(){
        
    }
    init(){
        
        this.render();
        
    }
    render(){
        $("#app").html("");
        var html  = homeView();
        $("#app").append(html);
        tabbar.init();
    }
}

export default new Home