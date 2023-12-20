const fs = require("fs")

class ManagerUsuarios{
    
    constructor(fileName){
        this.fileName= fileName
        if(fs.existsSync(fileName)){
            try {
                let usuarios = fs.readFileSync(fileName,"utf-8")
                this.usuarios = JSON.parse(usuarios)
            } catch (error) {
                this.usuarios= []
            }
        }else{
            this.usuarios= []
        }
    }

    //METODOS

    async saveFile(data){
        try {
            await fs.promises.writeFile(this.fileName,JSON.stringify(data,null, '\t'))
            return true
        } catch (error) {
            console.log(error)
            return false;
        }
    }
     
   async crearUsuario(usuario){
        this.usuarios.push(usuario)
        const respuesta = await this.saveFile(this.usuarios)
        if(respuesta){
            console.log("Usuario creado")
        }else{
            console.log("Hubo un error");
        }
    }

    consultarUsuarios() {
        //console.log(this.usuarios)
        return this.usuarios
    }
}



class Usuario{
    constructor(nombre,apellido,edad,curso){
        this.nombre= nombre,
        this.apellido = apellido,
        this.edad= edad,
        this.curso= curso
    }
}


// PRUEBAS

const usuario1 = new Usuario("Jose","Perez",22,"matematica")
const usuario2 = new Usuario("Maria","Lopez",24,"matematica")
const usuario3 = new Usuario("Marta","Gonzalez",23,"matematica")

const manager = new ManagerUsuarios("./Usuarios.json")

console.log(manager.consultarUsuarios())

manager.crearUsuario(usuario1)
manager.crearUsuario(usuario2)
manager.crearUsuario(usuario3)
console.log(manager.consultarUsuarios())