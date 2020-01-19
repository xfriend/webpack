import mine from "../../view/mine.art"
import tabbar from "../tabbar"
class Mine{
    constructor(){

    }
    init(){
        this.render();
    }
    render(){
        $("#app").html("");
        var html = mine();
        $("#app").append(html);
        tabbar.init();
    }
}

export default new Mine