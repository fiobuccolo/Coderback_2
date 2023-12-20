const numeros = [2,3,4,5,6]
console.log(numeros)

const numerosNuevos = numeros.map(numero => numero **2)
console.log(numerosNuevos)

const nombres = ["Matias","Cinthya","Maria","Enzo"]
 
const nombre = "Joaquin"

if(nombres.includes(nombre)){
    console.log(`${nombre} esta presente`)
}else{
    console.log(`${nombre} no esta presente`)
}