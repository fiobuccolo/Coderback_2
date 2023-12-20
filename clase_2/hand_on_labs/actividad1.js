const objetos = [
    {
        manzanas:3,
        peras:2,
        carne:3,
        jugos:5,
        dulces:2,
    },
    {
        manzanas:1,
        sandias:2,
        huevos:6,
        jugos:1,
        panes:4,
    }
]

const productos = []

objetos.forEach(objeto =>{
    const keys = Object.keys(objeto)

    keys.forEach(key => {
        if(!productos.includes(key))
            productos.push(key)
    })
})

console.log(productos)

let totalVendidos = 0
objetos.forEach(objeto=>{
     let keyValues = Object.entries(objeto);
        
     keyValues.forEach(prod =>{
        if(productos.includes(prod[0])){
            totalVendidos += prod[1]
        }
           
     })
})

console.log(totalVendidos)