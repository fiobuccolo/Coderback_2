//instanciar socket del lado del cliente
const socket = io()
console.log(socket);
console.log("Mensaje del lado del cliente");
socket.emit("message","mensaje desde el navegador")

socket.on("server_message",(data)=>{
    console.log(data);
   })

   socket.on("message_all",(data)=>{
    console.log(data);
   })


   socket.on("message_all2",(data)=>{
    console.log(data);
   }) 