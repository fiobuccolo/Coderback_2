const objeto = {}

for(let i=0;i<1000;i++){
    const numeroAleatorio = Math.floor(Math.random()*20)+1;
    if(objeto[numeroAleatorio]){
        objeto[numeroAleatorio]++;
    }else{
        objeto[numeroAleatorio]=1
    }
}

console.log(objeto);