//import fs from "fs"
//import crypto from "crypto"
const fs = require("fs");
const crypto = require("crypto")
class UserManager{
    constructor(path) {
        try{    
            this.path = path;
            let users =  fs.readFileSync(path,"utf-8")
            this.users = JSON.parse(users)
         } catch(error){
            this.users = []
          //  console.log((`Hubo un error: ${error}`));
         }
    }

    // METODOS:
    async crearUsuario(user){
        const hashPassword = crypto
        .createHash("sha256")
        .update(user.password)
        .digest("hex")
    
        user.password = hashPassword;
        this.users.push(user)
    try {
        await fs.promises.writeFile(this.path,JSON.stringify(this.users,null,`\t`) )
        console.log("User created");
     } catch (error) {
       console.log(`Hubo un error al crear el usuario: ${error}`); 
     }
    }

    async validarUsuario(username,password){
      //console.log("entre en valirdar");
      //console.log(this.users)
        const userExists = this.users.find((user)=> user.username === username)
        if(!userExists){
            return console.log(("El usuario no existe"))
        }

        const hashPassword = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex")

        if(userExists.password === hashPassword){
            console.log("Logged");
        }else{
            console.log("Invalid password");
        }
 
        try {
            
        } catch (error) {
            
        }
    }
}

class User {
 constructor(nombre,apellido,username,password){
        this.nombre=nombre,
        this.apellido = apellido,
        this.username = username,
        this.password = password
    }
}

const user = new UserManager("./Users.json")

//user.crearUsuario(new User("Emi","Perez","emiPerez","123"))
// user.crearUsuario(new User("Luis","Perez","LuisPerez","12313"))

user.validarUsuario("emiPerez","123")
user.validarUsuario("emiPerez","12qewr3")
user.validarUsuario("EmiPerez","123")