import {Router} from "express"
const viewsRouter = Router ()

viewsRouter.get("/",(req,res)=>{
   res.render("home") 
})

viewsRouter.get("/realTimePost",(req,res)=>{
    res.render("realTimePost") 
 })

export default viewsRouter