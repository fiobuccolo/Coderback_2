const mostrarLista = (arr) =>{
    if(arr.length == 0) return "Lista Vacia";
    
    arr.map((elementos)=> {
        console.log(elementos)
    })

    return `El array tiene ${arr.length} elementos`
};

// casos de prueba

console.log(mostrarLista([])); // caso null
console.log(mostrarLista([1])); // caso de 1 lengt
console.log(mostrarLista([23,23,"jose",true])); // caso de mas de 1 lengt


