import classify from "../../view/classify.art"
import tabbar from "../tabbar"
class Classify{
    constructor(){

    }
    init(){
        this.render()
    }
    render(){
        $("#app").html("");
        var html = classify();
        $("#app").append(html);
        tabbar.init();
    }
}

export default new Classify