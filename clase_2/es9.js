const objeto1 = {
    nombre: "Alberto",
    edad: 35,
    color:"Azul"
}

const objeto2 = {
    nombre: "Maria",
    edad: 25,
}
// SPREAD OPERATOR
// si se repiten las propuedades se queda con el valor del ultimo objeto
const objeto3 = {...objeto1,...objeto2, equipo:"River"}

console.log(objeto3)

const nuevoObjeto = {
    a: "Algo",
    b: "Otro algo",
    c: "Algo mas"
}

// REST Operator
const {a, ...rest} = nuevoObjeto;
console.log(a)
console.log(rest)


const {b, ...lasdemas} = nuevoObjeto;
console.log(b)
console.log(lasdemas)

