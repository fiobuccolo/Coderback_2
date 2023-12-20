const fs = require ("fs");



const operaciones = async (fileName) => {
    try {
        await fs.promises.writeFile(fileName,
            "contenido");

        let contenido = await fs.promises.readFile(fileName,"utf-8")
        console.log(contenido);

        await fs.promises.appendFile(fileName,
            "\n contenido nuevo");

        contenido = await fs.promises.readFile(fileName,"utf-8")
        console.log(contenido);

        await fs.promises.unlink(fileName)

    } catch (error) {
       console.log("Hubo un error"); 
    }
        
}

operaciones("./nombreArchivo.txt")