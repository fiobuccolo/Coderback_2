function dividir (numero1,numero2){
    return new Promise((resolve,reject) =>{
        if(numero2===0){
            reject ("No se puede dividir por cero")
        }else{
            resolve(numero1/numero2)
        }
    })
}

function suma (numero1,numero2){
    return new Promise((resolve,reject) =>{
        if(numero1===0 || numero2===0 ){
            reject ("Operación innecesaria")
        }else{
            const resultado = numero1 + numero2
            resolve(resultado)
        }
    })
}

function resta (numero1,numero2){
    return new Promise((resolve,reject) =>{
        if(numero1===0 || numero2===0 ){
            reject ("Operación innecesaria")
        }else{
            const resultado = numero1 - numero2
            if(resultado<0){
                reject("La calculadora solo devuelve numero positivos")
            }else{
            resolve(resultado)
        }
        }
    })
}

function multiplicar (numero1,numero2){
    return new Promise((resolve,reject) =>{
        if(numero1 < 0 || numero2 < 0 ){
            reject ("Operación innecesaria")
        }else{
            const resultado = numero1 * numero2
            if(resultado<0){
                reject("La calculadora solo devuelve numero positivos")
            }else{
            resolve(resultado)
            } 
        }
    })
}

async function calculos(numero1,numero2){
    try {
        const resultadoSuma = await suma(numero1,numero2)
        console.log(resultadoSuma)

        const resultadoResta = await resta(numero1,numero2)
        console.log(resultadoResta)

        const resultadoDividir = await dividir(numero1,numero2)
        console.log(resultadoDividir)
        
        const resultadoMultiplicar = await multiplicar(numero1,numero2)
        console.log(resultadoMultiplicar)

    } catch (error) {
        console.log(error)
    }
}


calculos(2,3)
calculos(24,3)
calculos(2,33)
calculos(25,1)
calculos(5,3)
