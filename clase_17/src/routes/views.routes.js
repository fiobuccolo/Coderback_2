import { Router } from "express";
import cookieParser from "cookie-parser"
import session from "express-session";

const viewsRouter = Router();

// --- Cookie parser sin firma
    // viewsRouter.use(cookieParser())


// --- Cookie parser CON firma
  viewsRouter.use(cookieParser('f10s3cr3t'))

viewsRouter.get("/", async(req,res)=>{
    res.render('index',{})
})

// --- Cookie parser sin firma
        // viewsRouter.get("/setcookie", async(req,res)=>{
        // //sin firma:
        // res.cookie(
        //             'cooderCookie',
        //             'valor:cookie sin firma',
        //             {
        //             //maxAge max-age in milliseconds, converted to expires
        //                 maxAge:30000,
        //             })
        //         .send('cookie registrada con exito')
        // })

 // --- Cookie parser CON firma
    viewsRouter.get("/setcookie", async(req,res)=>{  
            res.cookie(
                        'cooderCookie',
                        'valor:cookie sin firma',
                        {
                        //maxAge max-age in milliseconds, converted to expires
                            maxAge:30000,
                            signed:true
                        })
                    .send('cookie registrada con exito')
            })

viewsRouter.get("/getcookie", async(req,res)=>{
    //sin firma:
       // res.send(req.cookies)
    //Con firma:
        res.send(req.signedCookies)
 })

 viewsRouter.get("/deletecookie", async(req,res)=>{
    //sin firma:
       res.clearCookie('cooderCookie',)
        .send("coookie eliminada")
 })

 /* ---------------------------------
-        2Da parte: session         -
 -----------------------------------*/

 viewsRouter.get("/session", async (req,res)=>{
    if (req.session.counter){
        req.session.counter++
        res.send (`ya visito el sitio ${req.session.counter}`)
    }else{
        req.session.counter = 1
        res.send ("Bienvenido")
    }
 })

 viewsRouter.get("/logout", async(req,res)=>{
   req.session.destroy(error =>{
        if(error){
            res.json({error:error,msj:`error al cerrar la sesión`})
        }
        res. send("sesion cerrada correctamente")
   })
 })

 viewsRouter.get("/login", async(req,res)=>{
   const {username, password}= req.query
        if(username!= "pepe" || password !== "1234"){
            return res.status(402).send("login failed")
        }else{
            req.session.admin = true
            req.session.user = username;
            res.send("login succesfull")
            console.log(req.session.admin,req.session.user)
        }
  })

  //auth:
  function auth(req,res,next){
    if(req.session.admin){
        return next()
    }
    return res.status(403).send("no autorizado")
  }

  viewsRouter.get("/private",auth, async(req,res)=>{
    res.send("autorizado")
   })
 


export default viewsRouter