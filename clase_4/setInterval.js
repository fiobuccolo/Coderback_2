const contador = () =>{
    let contador = 1;
    console.log("iniciando contador")
    let timer = setInterval(() =>{
        console.log("contador: ", contador);
        contador++
        if(contador>5){
            clearInterval(timer)
        }
    },1000)
}

console.log("Tarea 1")
contador()
console.log("Tarea 3")