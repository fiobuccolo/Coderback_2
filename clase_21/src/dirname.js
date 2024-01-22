import path from "path"
import { fileURLToPath } from "url"
import bcrypt from "bcrypt"
import { password } from "./env.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

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


export default __dirname