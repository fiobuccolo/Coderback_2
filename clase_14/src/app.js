import  express from "express";
import handlebars from "express-handlebars"
import __dirname from "./utils.js";
import Viewrouter from "./routes/views.router.js";
import userRouter from "./routes/user.routes.js";
import {Server} from "socket.io"
import { PORT,password, db_name } from "./env.js";
import mongoose from "mongoose";

const app = express()
// mongoose connection
mongoose.connect(
    `mongodb+srv://fio:${password}@cluster0.mi1diym.mongodb.net/${db_name}?retryWrites=true&w=majority`
)
.then(()=>{
    console.log("DB connected");
})
.catch((err)=>{
    console.log(`Hubo un error: ${err}`);
})


const httpServer = app.listen(PORT,()=>console.log(`Server listening on port: ${PORT}`)) 
// Instanciar websocket:
const socketServer = new Server(httpServer)
 
//Middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(__dirname+`/public`))
// configurarmos el motor:
app.engine("hbs", handlebars.engine({
    extname: "hbs",
    defaultLayout:"main"
}))

// seteamos nuestro motor
app.set("view engine", "hbs")
app.set("views",__dirname+`/views`) // setemamos la carpeta que el motor va a ser uso
//routes
app.get("/", (req,res)=>{
    let name = "martita"
    res.render("index",{name})
})

app.use("/",Viewrouter)
app.use("/api/users",userRouter)
  
const messages = [];
// Socket communication

socketServer.on("connection",(socketClient)=>{
   console .log("Nuevo cliente conectado");
   socketClient.on("message",(data)=>{
    console.log(data);
    messages.push(data)
    socketServer.emit("messages", messages)
   })
   socketClient.on("newUser",(data)=>{
    socketServer.emit("messages", messages)
    socketClient.broadcast.emit("connected",data)
   })

   socketServer.emit("messages", messages)
   })
   



