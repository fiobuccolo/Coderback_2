class TicketManager  {
    #precioBaseGanancia = 0.15;
    constructor (){
        this.eventos = [] 
    }

    // METODOS
    getEventos(){
        return this.eventos
    }
    agregarEvento(evento){
        evento.precio += evento.precio*this.#precioBaseGanancia;

        if(this.eventos.length === 0){
            evento.id=1;
        }else{
            evento.id = this.eventos[this.eventos.length-1].id +1
        }
        this.eventos.push(evento)
    } 

    agregarUsuario(idEvento,idUsuario){
        const evento = this.eventos.find((evento) => evento.id===idEvento);
        if(!evento){
            return "no existe el evento";
        }
        if(!evento.participantes.includes(idUsuario)){
            evento.participantes.push(idUsuario)
        }else{
               return "ya existe el usuario";
            }
    }

    ponerEventoEnGira(idEvento,nuevaLocalidad,nuevaFecha){
        const evento = this.eventos.find((evento) => evento.id===idEvento);
        if(!evento){
            return "no existe el evento";
        }
        const nuevoEvento={
            //asignarle los valor que ya tiene:
            ...evento,
            lugar: nuevaLocalidad, 
            fecha: nuevaFecha,
            id: this.eventos[this.eventos.length-1].id +1,
            participantes:[]
        }
        this.eventos.push(nuevoEvento)

    }
}

class Evento{
    constructor(nombre,lugar,precio,capacidad=50,fecha = new Date().toLocaleDateString(), participantes){
        this.nombre = nombre,
        this.lugar = lugar,
        this.precio = precio,
        this.capacidad = capacidad,
        this.fecha = fecha,
        this.participantes = []
    }
}


const manejadorEventos = new TicketManager();

console.log(
    "agreganto evento coder 1 para argentina, precio 200, 50 participantes"
)
manejadorEventos.agregarEvento(
    new Evento("evento coder 1","Argentina,200,50")
)

console.log(
    "agreganto al evento con id 1 la participación del usuario con id 2"
)
manejadorEventos.agregarUsuario(1,2)

console.log("agregando una copia vacia del evento 1 pero en mexico y para 2024")

manejadorEventos.ponerEventoEnGira(1,"Mexico","30/11/2024")

console.log(manejadorEventos.getEventos())
