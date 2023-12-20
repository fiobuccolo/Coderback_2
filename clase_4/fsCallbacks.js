const fs = require ("fs")


console.log(fs)

fs.writeFile("./archivoCallback.txt","el dato que queremos insertar en el archivo",(error) => {
    if(error){
        return console.log("Hubo un error al escribir el archivo")
    }
    fs.readFile("./archivoCallback.txt","utf-8",(error,contenido)=>{
        if(error){
            return console.log("Hubo un error al leer el archivo")
        }
        console.log(contenido)

        fs.appendFile("./archivoCallback.txt","\n nuevo contenido",(error)=>{
            if(error){
                return console.log("Hubo un error al sobreescribir el archivo")
            }
            fs.readFile("./archivoCallback.txt","utf-8",(error,contenido)=>{
                if(error){
                    return console.log("Hubo un error al leer el archivo")
                }
                console.log(contenido)

            fs.unlink("./archivoCallback.txt",(error)=>{
                if(error){
                    return console.log("Hubo un error al eliminar el archivo")
                }
            })
        })
    })
}) 
})
