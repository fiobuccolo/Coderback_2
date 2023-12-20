const objeto = {
    nombre: "Alberto",
    edad: 35,
    color:"Azul"
}

const propiedades = Object.keys(objeto)
console.log(propiedades)

propiedades.forEach((prop) =>{
    console.log(prop)
});

console.log(Object.keys(objeto));
console.log(Object.values(objeto));
console.log(Object.entries(objeto));  

const numeros = [2,24,53,6354,256]
const total = numeros.reduce(
    (valorPrevio,valorAcumulado) =>
    valorPrevio+valorAcumulado   
)
console.log(total)