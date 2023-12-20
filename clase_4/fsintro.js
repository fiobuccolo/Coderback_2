const fs = require ("fs")

console.log(fs)

fs.writeFileSync("./nombredelarchivo.txt","el dato que queremos insertar en el archivo") 

//comprobar que exista el archivo:
if(fs.existsSync("./nombredelarchivo.txt")){
    console.log("el archivo existe")

    let contenido = fs.readFileSync("./nombredelarchivo.txt","utf-8")
    console.log(contenido)

    fs.appendFileSync("./nombredelarchivo.txt","\nnuevo contenido")
     contenido = fs.readFileSync("./nombredelarchivo.txt","utf-8")
    console.log(contenido)

    fs.unlinkSync("./nombredelarchivo.txt")
}