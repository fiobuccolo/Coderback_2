function dividir (numero1,numero2){
    return new Promise((resolve,reject) =>{
        if(numero2===0){
            reject ("No se puede dividir por cero")
        }else{
            resolve(numero1/numero2)
        }
    })
}

dividir(3,0)
    .then((resultado)=>{
        console.log(resultado)
    })
    .catch((error) =>{
        console.log(error)
    })