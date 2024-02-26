// ---- DIRNAME--- 
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

export default __dirname

// ---- bcrypt--- 
import bcrypt from "bcrypt"

            // GENERAMOS el hash
            export const createHash =  password => { 
                console.log("En el create hash");
                console.log((password));
            return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
            }

            // Validamos el hash
            export const isValidPassword = (user,password)  => { 
                console.log(("is valid"));
                console.log(user);
                console.log(password);
                return bcrypt.compareSync(password,user.password)
            }

// ---- jwt--- 
import jwt from "jsonwebtoken"

export const PRIVATE_KEY = "f10s3cr3t"

export const generateJWToken = (user) =>{
    const token = jwt.sign({user},PRIVATE_KEY,{expiresIn:'24hr'})
    return token
}

export const authJWToken = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res
            .status(401)
            .send({error:"Not authenticated"})
    }
    const token = authHeader.split(" ")[1]
    jwt.verify(token,PRIVATE_KEY,(error,credentials)=>{
        if(error){
            return res
                .status(403)
                .send({error:"Not authorized"})
             }
        req.user = credentials.user;
        next()
        })
}


// ---- passport--- 

import passport from "passport";

export const passportCall = (strategy) => {
    return async (req,res,next)=>{
        console.log("passport strategy");
        passport.authenticate(strategy,function(error,user,info){
            if (error) return next(error);
            if(!user){
                return res.status(401)
                          .send({
                            error: info.messages ? info.messages : info.toString()
                          })
            }
            console.log(("Usuario obtenido en el passport call"));
            console.log(user);
            req.user = user 
            next();
        })(req,res,next)
    }
}

export const authorization = (role) =>{
    return async (req,res,next)=>{
       console.log("autorization");
        console.log(req.user.role);
            if (!req.user) return res.status(401).send("Unauthorized: User not found in JWT")
            if (req.user.role !== role) {
                return res.status(403).send("Forbidden: El usuario no tiene permisos con este rol.");
            }
            next()
        }
    }
