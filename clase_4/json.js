const fs = require ("fs");

const operacion = async (fileName,objeto) =>{
    try {
        await fs.promises.writeFile(fileName,JSON.stringify(objeto,null,'\t'));

        let contenido = await fs.promises.readFile(fileName,"utf-8")
       // console.log(contenido);
       // console.log(JSON.parse(contenido))
        let data= JSON.parse(contenido)
       // console.log(data.id)

        let array = [data,{id:2,name:"Arturo",age:25 }]
        await fs.promises.writeFile(fileName,JSON.stringify(array,null,'\t'));

       contenido = await fs.promises.readFile(fileName,"utf-8")
        console.log(contenido);
       console.log(JSON.parse(contenido))
         data = JSON.parse(contenido)
        console.log(data.id)


    } catch (error) {
        console.log("hubo un error");
    }
}

const fileName = "./texto.txt"
const objeto = {
    id:1,
    name: "Roberto",
    age:28
}

operacion(fileName,objeto)

