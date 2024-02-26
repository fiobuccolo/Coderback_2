import { Router } from "express";
import { userModel } from "../daos/models/users.models.js";
import { isValidPassword } from "../utils.js";
import { generateJWToken } from "../utils.js";


const jwtRouter = Router();

 // ==== LOGIN ==== 
 jwtRouter.post("/login", async (req,res)=>{
    const {email, password}=req.body
    try {
        const user = await userModel.findOne({email:email})
        if(!user){
            console.warn("Invalid data");
            return res.status(204)
                          .send({
                            status:"error",
                            error: "Invalidad data"
                        })
        }
        console.log("Usuario encontrado para login");

        if (!isValidPassword(user,password)){
            console.log("If valid password");
            console.warn("Datos erroneos");
            return done(null,false) 
            }
        console.log("supere el is valid passport:");
      const tokenUser={
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
        role:user.role
      }
      // === USANDO JWT =====
        const accessToken = generateJWToken(tokenUser)
        console.log(accessToken);
    
   // === SEGUNDA OPCION:USANDO cookie ====
        return res.status(200)
                  .cookie('jwtCookieToken', accessToken,
                      {
                      maxAge: 60000,
                      //httpOnly: true //No se expone la cookie
                      //httpOnly: false //Si se expone la cookie
                      }
                  )
                  .send({
                      status:"success",
                    // payload: tokenUser,
                      // === PRIMERA OPCION:USANDO LOCAL STORAGE ====
                      //accessToken: accessToken,
                      msg: "log in con exito"
                      })
                
    } catch (error) {
        console.log(error);
        return res.status(500)
                          .send({
                            status:"error",
                            error: "Error interno en la aplicación"
                        })
    }
  })



export default jwtRouter