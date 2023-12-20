class Persona {
    constructor(nombre,edad){
        this.nombre = nombre;
        this.edad = edad
    }
static especie ="humano"
//metodo
hablar(texto){
    console.log(texto)
}
datos(){
    console.log(`${this.nombre} - ${this.edad}`)
}
}

// Instancias:

const lautaro = new Persona("Lautaro",23);
const matias = new Persona("Matias",33);

lautaro.datos()
matias.datos()

console.log(Persona.especie)