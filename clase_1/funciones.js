// funcion normal

function imprimirSaludo() {
    console.log("hola")
}

imprimirSaludo()
imprimirSaludo()
imprimirSaludo()


// funcion flecha

const imprimirSaludo2 = ()=>{
    console.log("hola 2")
}

const imprimir = (texto) =>{
    console.log(texto)
}

imprimir("HOlaaa la")

const esMayorQue = (numero1,numero2) => numero1 >numero2;
console.log(esMayorQue(2,12));