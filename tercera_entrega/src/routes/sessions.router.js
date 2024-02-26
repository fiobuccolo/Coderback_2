import { Router } from "express";
import passport from "passport";
import { generateJWToken } from "../utils.js";


const sessionsRouter = Router();

/*===============================
=       PASSPORT GITHUB         =
================================*/

sessionsRouter.get("/github", passport.authenticate("github",
     {scope: ['user:email']}),async(req,res) =>{

     })

sessionsRouter.get("/githubcallback", passport.authenticate("github",{
    failureRedirect: '/github/error'
        }),async(req,res) =>{  
            const user = req.user
            console.log(user);
            req.session.user = {
                name: `${user.first_name} ${user.last_name}`,
                email: user.email,
                age: user.age,
                 };
                 req.session.admin=true
                 console.log("antes del redirec");
                 res.redirect("/users")
             }
             )



/*===============================
=       PASSPORT LOCAL           =
================================*/

//  REGISTER 
sessionsRouter.post("/register", passport.authenticate('register',{
    failureRedirect: 'api/session/fail-register'
}), async (req,res)=>{
    try {
        console.log("Registrando usuario:");
        return res.status(201)
                          .send({
                            status:"success",
                            msg: "El usuario fue creado con exito con ID:"
                        })

    } catch (error) {
        console.log("No se pudo registrar al usuario: " + error);
        process.exit()
    }
})

//  LOG IN  
    sessionsRouter.post("/login",passport.authenticate("login",{
        failureRedirect: 'api/session/fail-register'
    }), async (req,res)=>{
        try {
         
        // ---- Hardcode de admin ------     
    const user = req.user
    console.log(user);
            if(user.email === "adminCoder@coder.com" & user.password === "adminCod3r123"){
                user.role = "admin"
            }else{
                console.log("console log nuevo");
                user.role = "user"
            }

    // === USANDO JWT =====
const accessToken = generateJWToken(user)
console.log(accessToken);
 
    return res.status(200)
            .send({
                status:"success",
                payload: req.session.user,
                accessToken: accessToken,
                msg: "log in con exito"
                })
            
        } catch (error) {
            console.log("error al loguear: " + error);
            process.exit()
        }
    })
// LOG OUT  
sessionsRouter.post("/logout", async (req,res)=>{
    try {
        req.session.destroy(error =>{
            if(error){
                res.json({error:error,msj:`error al cerrar la sesión`})
            }
            res. send("sesion cerrada correctamente")
       })
    } catch (error) {
        console.log("error al cerrar sesuión: " + error);
        process.exit()
    }
  })

  sessionsRouter.get("/fail-register", (req,res)=>{
        res.status(401).send({error:"Failed to process register"})
    })

sessionsRouter.get("/fail-login", (req,res)=>{
    res.status(401).send({error:"Failed to process login"})
    })


// ==== Export ==== 
export default sessionsRouter