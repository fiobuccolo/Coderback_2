import { Router } from "express";
import cookieParser from "cookie-parser"
import session from "express-session";

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