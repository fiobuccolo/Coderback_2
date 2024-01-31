import { Router } from "express";
import cookieParser from "cookie-parser"
import session from "express-session";
import { authorization, passportCall } from "../../utils/passport.utils.js";

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
   usersViewsRouter.get("/",  passportCall("jwt"),
   authorization("user"),
     (req,res)=>{
      res.render("Profile", {
          user: req.user
      })
    })


export default usersViewsRouter