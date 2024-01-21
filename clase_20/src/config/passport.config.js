import { doesNotReject } from "assert";
import passport from "passport"
import local from "passport-local"
import { userModel } from "../daos/models/users.models.js";
import { createHash, isValidPassword } from "../dirname.js";

const localStrategy = local.Strategy
const initializePassport = () =>{

   passport.use('register', new localStrategy(
        {
        passReqToCallback:true,
        usernameField:'email'
        },
        async (req,username, password, done)=>{
          
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

export default initializePassport
