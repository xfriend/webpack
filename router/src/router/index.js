//import AlleyRouter from "../lib/alley-router"
import Home from "../controller/home/index"
import List from "../controller/list/index"
import classIfy from "../controller/classify/index"
import Mine from "../controller/mine/index"
import AlleyRouter from "./history"
//路由表
const router = new AlleyRouter({
    mode:"history",
    routes:[
        {
            path:"/",
            template:Home
        },
        {
            path:"/classify",
            template:classIfy
        },
        {
            path:"/list",
            template:List
        },
        {
            path:"/mine",
            template:Mine
        }
    ]
})
if(!window.router)window.router = router

export default router;