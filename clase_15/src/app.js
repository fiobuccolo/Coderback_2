import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./dirname.js";
import mongoose from "mongoose";
import { PORT,password, db_name } from "./env.js";
import {Server} from "socket.io"
import viewsRouter from "./routes/views.routes.js";
import cartRouter from "./routes/carts.routes.js";
import productRouter from "./routes/product.routes.js";

const app = express()
const httpServer = app.listen(PORT,()=>console.log(`Server listening on port: ${PORT}`)) 
// Instanciar websocket:
const socketServer = new Server(httpServer)

// mongoose connection
//--> para local: "mongodb://127.0.0.1:27017/baseDeDatos"
mongoose    
    .connect(`mongodb+srv://fio:${password}@cluster0.mi1diym.mongodb.net/${db_name}?retryWrites=true&w=majority`)
    .then(()=>{console.log("DB connected")})
    .catch((err)=>{console.log(`Hubo un error: ${err}`)})

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(__dirname+`/public`))

// Motor de plantillas:
app.engine("hbs", handlebars.engine({
    extname: "hbs",
    defaultLayout:"main"
}))

// Setear motor de plantillas
app.set("view engine", "hbs")
app.set("views",__dirname+`/views`) // setemamos la carpeta que el motor va a ser uso

//routes
app.get("/",(req,res) =>{res.send("<h1>Hola probando el server</h1>")})
app.use("/",viewsRouter)
app.use("/api/products",productRouter)
app.use("/api/carts",cartRouter)


/*

import userRouter from "./routes/user.routes.js";


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
   




*/


// ---------------------     
/* desafio comple
    continaur sobre el proyecto que has trabajado 
    - incluir: agregar el modelo de persistencia de mongo y mongoose
    - crear base de datos llamda ecommerce
        - crear coleccion y respectivos schemas
            . carts
            .messages
            .products
    - separar los managers de filesystem de los de mongo db en una sola carpeta llamada dao
    . Agregar los models ahi donde estaran los esquemas de mongo 

    implementar nueva vista en handlebars llamda chat.handlebars
        Los mensajes deben guardarse en coleccion messages en mongo 
        user:correoDelUsuario,
        message:mensaje del suaurio
*/