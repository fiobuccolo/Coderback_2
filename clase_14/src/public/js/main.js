//instanciar socket del lado del cliente
const socket = io()
console.log(socket);
console.log("Mensaje del lado del cliente");
const chatbox = document.querySelector("#chatbox")
let user;

Swal.fire({
    title: "Bienvenido",
    text: "ingrese su nombre para continuar",
    input:"text",
    inputValidator:(value)=>{
            return !value && "Necesitas identificarte"
    },
    type:"info",
    allowOutsideClick: false,
}).then((value) => {
    user = value.value
    console.log(user);
    socket.emit("newUser",user)
})

chatbox.addEventListener("keyup",(e)=>{
    if(e.key === "Enter"){
        //console.log(e.target.value);
        socket.emit("message",{
            user,
            message: e.target.value
        });
        chatbox.value = ""
    }
}) 
const log = document.querySelector("#messages")
socket.on("messages",(data)=>{
    if(data == []){return}
    console.log(data);
    let messages= ""
    data.forEach((message) => {
        messages += `<strong>${message.user}:</strong> ${message.message} <br>`
    });
    log.innerHTML = messages
})
socket.on("connected",(data)=>{
    if(data == []){return}
    console.log(data);
    if (user !== undefined){
    Swal.fire({
        text: `Nuevo usuario conectado: ${data}`,
        toast: true,
        position:"top-right"
        })
    }
    })
