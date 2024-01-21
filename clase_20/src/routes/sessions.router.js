import { Router } from "express";
import session from "express-session";
import { userModel } from "../daos/models/users.models.js";
import { createHash, isValidPassword } from "../dirname.js";
import initializePassport from "../config/passport.config.js";
import passport from "passport";

const sessionsRouter = Router();

// ==== REGISTER ==== 
sessionsRouter.post("/register", passport.authenticate('register',{
    failureRedirect: 'api/session/fail-register'
}), async (req,res)=>{
    try {
        // COMENTOS LAS COSAS QUE PASE AL PASSPORT CONFIG
        // const { first_name,
        //         last_name,
        //         email,
        //         age,
        //         password} = req.body
        //console.log(`datos del usuario: ${req.body}`);
        // // ---- Validar si el usuario ya existe ------
        // const exists = await userModel.findOne({email})
        //     if(exists){
        //         return res.status(400)
        //                   .send({
        //                     status:"error",
        //                     msg: "El usuario ya existe"
        //                 })
        //          }
        // const user = {
        //     first_name,
        //     last_name,
        //     email,
        //     age,
        //     password: createHash(password)}
       // const result = await userModel.create(user)
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

// ==== LOG IN ==== 
    sessionsRouter.post("/login",passport.authenticate("login",{
        failureRedirect: 'api/session/fail-register'
    }), async (req,res)=>{
        try {
            // const {
            //     email,
            //     password} = req.body
        // console.log(`datos del usuario: ${JSON.stringify(req.body)}`);
        // ---- Validar si el email existe ------
        // const user = await userModel.findOne({email})
        // if(!user){
        //     console.log("If validacion email");
        //     return res.status(401)
        //             .send({
        //                 status:"error",
        //                 msg: "Datos incorrectos"
        //             })
        //     }
        // ---- Validar la contraseña------ 
        // if(!isValidPassword(user,password)){
        //     console.log("If valid password");
        //     return res.status(401)
        //     .send({
        //         status:"error",
        //         msg: "Datos incorrectos"
        //     })
        // }
        // ---- Hardcode de admin ------     
    const user = req.user
    console.log(user);
            if(user.email === "adminCoder@coder.com" & user.password === "adminCod3r123"){
                user.role = "admin"
            }else{
                console.log("console log nuevo");
                user.role = "user"
            }
        
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: `${user.email}`,
        age: `${user.age}`,
        role:`${user.role}`
    }
    console.log(`sesion: ${JSON.stringify(req.session.user)}`)
    

    return res.status(200)
            .send({
                status:"success",
                payload: req.session.user,
                msg: "log in con exito"
                })
            
        } catch (error) {
            console.log("error al loguear: " + error);
            process.exit()
        }
    })
// ==== LOG OUT ==== 
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