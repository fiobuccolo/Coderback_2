
import passport from "passport"
import local from "passport-local"

import { userModel } from "../models/users.models.js";
import { createHash, isValidPassword  } from "../utils.js";
import GitHubSrategy from "passport-github2"
import jwtStategy from "passport-jwt"
import { PRIVATE_KEY } from "../utils.js";


const localStrategy = local.Strategy
const JwtStrategy = jwtStategy.Strategy
const ExtractJWT = jwtStategy.ExtractJwt
const initializePassport = () =>{

   passport.use('register', new localStrategy(
        {
        passReqToCallback:true,
        usernameField:'email'
        },
        async (req,username, password, done)=>{
          console.log(("en el passport"));
                const { first_name,
                    last_name,
                    email,
                    age
                    } = req.body
            try {
             // // ---- Validar si el usuario ya existe ------
                    const exists = await userModel.findOne({email:username})
                        if(exists){
                            console.log("El usuario ya existe");
                            return done(null,false)
                            }
                // No EXISTE 
                    const user = {
                        first_name,
                        last_name,
                        email,
                        age,
                        password: createHash(password)}
                    console.log("user a registrar"+ user);
                    // darlo de alta en base de datos
                    const result = await userModel.create(user)
                    return done(null, result)
            } catch (error) {
                 done("Error registrando al uauario" + error)
            } 
           
        }
   ))   
   
   passport.use('login', new localStrategy(
    {
        passReqToCallback:true,
        usernameField:'email'
        },
        async (req, username, password, done) => {
            try {
                // const {
                //     email,
                //     password} = req.body
                const user = await userModel.findOne({email: username})
                console.log("user:"+ user);
                if(!user){
                    console.log("If validacion email");
                    console.warn("Datos incorrectos");
                    return done(null,false)
                    }
                    console.log("is valid passport:");
                   console.log("password"+password);
                if (!isValidPassword(user,password)){
                    console.log("If valid password");
                    console.warn("Datos erroneos");
                    return done(null,false) 
                    }
                console.log("supere el is valid passport:");
                return done(null,user)
            } catch (error) {
                 return done("Error al loguear al usuario" + error)
            }
        }
   ))
  
   /* =======================================
   =        CLASE 21: ESTRATEGIA GITHUB     =
   ======================================== */
   // 
   // App ID: 371181  
   // 
   // 
    passport.use("github", new GitHubSrategy({
        scope: [ 'user:email' ],
        clientID: "Iv1.0a968fb82c4611c4",
        clientSecret: "69eaa4829c9faceea348f637e5036fd3e3271dbf",
        callbackUrl: "http://localhost:5000/api/sessions/githubcallback"
        },
        async( accessToken, refreshToken, profile,done)=>{
            try {
                console.log("Profile obtenido desde github");
                //console.log(profile);
                console.log(profile.emails[0].value);
                const exists = await userModel.findOne({email: profile.emails[0].value})
                if(!exists){
                    const user = {
                        first_name: profile._json.name,
                        last_name: "",
                        email: profile.emails[0].value,
                        age:"",
                        password: "",
                        loggedBy: "GitHub"}
                    console.log("user a registrar"+ user);
                     // darlo de alta en base de datos
                    const result = await userModel.create(user)
                    return done(null, result)
                    }else{
                        // si entramos por aca significa que el usuario ya existe en DB
                        return done(null,exists)
                    }
                
            } catch (error) {
                return done(error)
            }
        }
        )
    )

    passport.use("jwt", new JwtStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY
    }, async (jwt_payload,done)=>{
        console.log("Entando a passport strategy con jwt");
        try {
            console.log("jwt obtenido del payload");
            console.log(jwt_payload);
            return done (null,jwt_payload.user)
        } catch (error) {
            return done(error)
        }
    }
))



    // FUNCIONES DE SERIALIZACION Y DESERIALIZACION
passport.serializeUser((user,done) => {
    done(null,user._id )
})

passport.deserializeUser(async (id,done)=>{
   try {
        let user = await userModel.findById(id);
        done(null, user)
   } catch (error) {
        console.log("Error deserializando el usuario: " + error);
   }
    
})

}

const cookieExtractor = req =>{
    let token = null
    console.log("Entrando a cookie extractor");
    console.log(req.cookies);
    if (req && req.cookies) {//Validamos que exista el request y las cookies.
        token = req.cookies['jwtCookieToken']
        console.log("token");
        console.log(token);
    }
    return token;
 }

export default initializePassport
