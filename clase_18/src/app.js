import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./dirname.js";
import viewsRouter from "./routes/views.routes.js";
import sessionsRouter from "./routes/sessions.router.js";
import usersViewsRouter from "./routes/usersViews.router.js";
import session from "express-session"
import FileStore from "session-file-store"
import MongoStore from "connect-mongo"
import mongoose from "mongoose"

const PORT = 5000
const app = express()

// --- Sessions guardadas en file---
    // const fileStore = FileStore(session)
// Conexión con Mongo:
const MONGO_URL = "mongodb://localhost:27017/clase18"

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(__dirname+`/public`))

// Motor de plantillas:
app.engine("hbs", handlebars.engine({
    extname: "hbs",
    defaultLayout:"main",
}))


// Setear motor de plantillas
app.set("view engine", "hbs")
app.set("views",__dirname+`/views`) 


/
// configuración de sesion
app.use(session({
    // --- fileStrore
        //store: new fileStore({path:"./sessions",ttl:15,retries:0}),
    // --- mongo store:
    store: MongoStore.create({
        mongoUrl: MONGO_URL,
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
=                 Rutas               =
======================================*/ 
app.use("/",viewsRouter)
app.use("/users",usersViewsRouter)
app.use("/api/sessions",sessionsRouter)


/* ====================================
=           connect Mongo DB          =
=====================================*/ 

const connectMongoDB =  async ()=>{
    try {
       await mongoose.connect(MONGO_URL) 
       console.log("Conectado con exito a la BD");
    } catch (error) {
        console.log("No se pudo conectar a la DB usando mongoose: " + error);
        process.exit()
    }
}
connectMongoDB()



app.listen(PORT,()=>console.log(`Server listening on port: ${PORT}`)) 