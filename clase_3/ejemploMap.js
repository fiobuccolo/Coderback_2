//ejemplo 1
const numeros = [1,2,3,4,5,6545]

numeros.map((numero,index) =>{
    console.log(numero,index)
})

//ejemplo 2
const numeros2 = [1,2,3,4,5,6]

const numeros3 = numeros2.map((numero) =>{
    return numero **2
})
console.log(numeros3)

//ejemplo 3
const numeros4 = [1,2,3,4,5,6]

const numeros5 = numeros2.map((numero,index) =>{
    if(index===3){
    return numero
        }
    return numero **2
})
console.log(numeros5)

// esto sucede dentro de un map: 
 function mapCustom(array,callback){
    let newArray = []
    for (let i = 0; i<array.length;i++){
         let nuevoValor =  callback(array[i])
         newArray.push(nuevoValor)
    }
    return newArray
 }

 const arrayNuevo = [2,3,4,5]

 const nuevoArr = mapCustom(arrayNuevo,(valor)=>{
    return valor **2
 })

 console.log(nuevoArr)