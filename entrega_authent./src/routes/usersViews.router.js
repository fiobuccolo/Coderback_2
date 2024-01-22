import { Router } from "express";
import cookieParser from "cookie-parser"
import session from "express-session";

const usersViewsRouter = Router();

 // ==== REGISTER ==== 
 usersViewsRouter.get("/register", (req,res)=>{
    res.render("register")
  })
 // ==== LOG IN ==== 
 usersViewsRouter.get("/login", (req,res)=>{
    res.render("login")
  })
   // ==== PROFILE ==== 
   usersViewsRouter.get("/", (req,res)=>{
    res.render("Profile", {
        user: req.session.user
    })
  })


export default usersViewsRouter