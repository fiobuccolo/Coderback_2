import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./dirname.js";
import mongoose from "mongoose";
import { PORT,password, db_name } from "./env.js";
import {Server} from "socket.io"
import viewsRouter from "./routes/views.routes.js";
import cartRouter from "./routes/carts.routes.js";
import productRouter from "./routes/product.routes.js";
import ProductDao from "./daos/dbManager/product.dao.js";
import Handlebars from "handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";



const app = express()
const httpServer = app.listen(PORT,()=>console.log(`Server listening on port: ${PORT}`)) 
// Instanciar websocket:
const io = new Server(httpServer)



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
    defaultLayout:"main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
}))



// Setear motor de plantillas
app.set("view engine", "hbs")
app.set("views",__dirname+`/views`) // setemamos la carpeta que el motor va a ser uso

//routes
app.get("/",(req,res) =>{res.send("<h1>Hola probando el server</h1>")})
app.use("/",viewsRouter)
app.use("/api/products",productRouter)
app.use("/api/carts",cartRouter)


// Socket communication

io.on("connection",(socket)=>{
    console .log("Nuevo cliente conectado");
    // recepcion del emit 1 
    socket.on("products_message", async (product)=>{
     console.log(product)
    try {
        await ProductDao.CreateOneProduct(product)
        console.log("antes del emit");
        socket.emit("products_list", ProductDao.getAllProducts())
        
    } catch (error) {
        console.log(error);
    }
   })
   socket.emit("products_list", ProductDao.getAllProducts())
   
 })

 

      

    
       
       
      
  






