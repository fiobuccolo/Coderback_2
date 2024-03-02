import { Router } from "express";


const gitHubLoginViewRouter = Router();

 // ==== LOGIN ==== 
 gitHubLoginViewRouter.get("/login", (req,res)=>{
    res.render("githubLogin")
  })


 // ==== error ==== 
 gitHubLoginViewRouter.get("/error", (req,res)=>{
  console.log(error);
  res.render("error", {error:"No se pudo autentificar usando Guthub"})
})
 
 


export default gitHubLoginViewRouter