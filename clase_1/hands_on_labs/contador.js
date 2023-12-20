class Contador {
    static contadorGlobal = 0

    constructor(responsable){
        this.responsable=responsable;
        this.contador = 0
    }

    // metodos:

    getResponsable(){
        return `${this.responsable}`
    }

    contar(){
        this.contador++;
        Contador.contadorGlobal++;
    }

    getCuentaIndividual(){
        return this.contador;
    }

    getCuentaGlobal(){
        return Contador.contadorGlobal
    }
};

// Pruebas:
const contador1 = new Contador("Juan")
const contador2 = new Contador("Jose")
// contamos
contador1.contar();
contador1.contar();
contador2.contar();
contador2.contar();
contador2.contar();
contador1.contar();
contador2.contar();
contador2.contar();
contador1.contar();
contador2.contar();
contador1.contar();
// cuenta individual
console.log(contador1.getResponsable())
console.log(contador1.getCuentaIndividual())
console.log(contador2.getResponsable())
console.log(contador2.getCuentaIndividual())
// cuenta global
console.log(contador1.getCuentaGlobal())
console.log(contador2.getCuentaGlobal())




