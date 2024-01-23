import { Router } from "express";
import cookieParser from "cookie-parser"
import session from "express-session";
import { authJWToken } from "../../utils/jwt.utlils.js";
import passport from "passport";

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
 usersViewsRouter.get("/", 
 //authToken --> bearer token
 passport.authenticate("jwt", {session:false}),
  (req,res)=>{
    res.render("Profile", {
        user: req.user
    })
  })


export default usersViewsRouter