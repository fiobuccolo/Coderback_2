//instanciar socket del lado del cliente
const socket = io()
console.log(socket);
socket.emit("message","mensaje desde el chat<")

socket.on("users_list",(data)=>{
    console.log("socket on en chat.js");
    console.log(data);
    const div = document.querySelector(".usersList")
    div.innerHTML = `${data.map((user) => `${user.name} - ${user.age}`)}`
})


const button =  document.querySelector("#button")
button.addEventListener("click",(e)=>{
    e.preventDefault();
    const name= document.querySelector("#name")
    const age= document.querySelector("#age") 
    const user = {
        name: name.value,
        age: age.value
    }
    socket.emit("chat_message",user)

})

/*
socket.on("server_message",(data)=>{
    console.log(data);
   })

   socket.on("message_all",(data)=>{
    console.log(data);
   })


   socket.on("message_all2",(data)=>{
    console.log(data);
   }) 
   */