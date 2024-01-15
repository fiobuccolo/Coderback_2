import { Router } from "express";
import session from "express-session";
import { userModel } from "../daos/models/users.models.js";

const sessionsRouter = Router();

// ==== REGISTER ==== 
sessionsRouter.post("/register", async (req,res)=>{
    try {
        const { first_name,
                last_name,
                email,
                age,
                password} = req.body
        console.log(`datos del usuario: ${req.body}`);
        // ---- Validar si el usuario ya existe ------
        const exists = await userModel.findOne({email})
            if(exists){
                return res.status(400)
                          .send({
                            status:"error",
                            msg: "El usuario ya existe"
                        })
                 }
        
        const user = {
            first_name,
            last_name,
            email,
            age,
            password}
        const result = await userModel.create(user)
        return res.status(201)
                          .send({
                            status:"success",
                            msg: "El usuario fue creado con exito con ID:" + result.id
                        })

    } catch (error) {
        console.log("No se pudo registrar al usuario: " + error);
        process.exit()
    }
})

// ==== LOG IN ==== 


    sessionsRouter.post("/login", async (req,res)=>{
        try {
            const {
                email,
                password} = req.body
        console.log(`datos del usuario: ${JSON.stringify(req.body)}`);
    // ---- Validar si el usuario existe ------
    const user = await userModel.findOne({email, password})
    if(!user){
        return res.status(401)
                .send({
                    status:"error",
                    msg: "Datos incorrectos"
                })
        }
    // ---- Hardcode de admin ------
           
            if(email === "adminCoder@coder.com" & password === "adminCod3r123"){
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

 


// ==== Export ==== 
export default sessionsRouter