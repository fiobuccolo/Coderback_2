import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./dirname.js";

import { PORT,password, db_name } from "./env.js";
import {Server} from "socket.io"
import viewsRouter from "./routes/views.routes.js";
import sessionsRouter from "./routes/sessions.router.js";
import usersViewsRouter from "./routes/usersViews.router.js";
import gitHubLoginViewRouter from "./routes/githubViews.router.js";
import jwtRouter from "./routes/jwt.router.js";
import cartRouter from "./routes/carts.routes.js";
import productRouter from "./routes/product.routes.js";
import ProductDao from "./daos/dbManager/product.dao.js";
import Handlebars from "handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import session from "express-session"

import mongoose from "mongoose";
import MongoStore from "connect-mongo"

import passport from "passport";
import initializePassport from "./config/passport.config.js";

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


// configuración de sesion
app.use(session({
    // --- fileStrore
        //store: new fileStore({path:"./sessions",ttl:15,retries:0}),
    // --- mongo store:
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://fio:${password}@cluster0.mi1diym.mongodb.net/${db_name}?retryWrites=true&w=majority`,
        //mongoOptions --> opciones de confi para el save de las sessions
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 10 * 60
    }),
    secret:"f10s3cr3t",
    resave:false, //false: cuando no necesitamso que guarde en memoria
    saveUninitialized:true
})
)
/* ====================================
=         MIDDLEWARE PASSPORT         =
======================================*/ 

initializePassport()
app.use(passport.initialize())
app.use(passport.session())



/* ====================================
=                 Rutas               =
======================================*/ 
    app.get("/",(req,res) =>{res.send("<h1>Hola probando el server</h1>")})
    // --- VISTAS ---
    app.use("/",viewsRouter)
    app.use("/users",usersViewsRouter)
    app.use("/github",gitHubLoginViewRouter)
    // --- API ---
    app.use("/api/products",productRouter)
    app.use("/api/carts",cartRouter)
    app.use("/api/sessions",sessionsRouter)
    app.use("/api/jwt",jwtRouter)


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

 

      

    
       
       
      
  






/* 
- agregar un sistema de roles: 
si agregamos adminCoder@coder.com y contraseña adminCod3r123 --admin 
resto rol usuario
boton de log out y rederigir a log in*/