const fs = require ("fs")

const fecha = new Date().toLocaleString()
console.log(fecha)
console.log(fs)

fs.writeFile("./archivoCallback.txt",`${fecha}`,(error) => {
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

        
        })
    })
}) 
})
