import express from "express";
import config from "./config/config.js";
import MongoSingleton from "./config/mongodb-singleton.js";
//import { PORT,password, db_name } from "./env.js";
import cors from "cors"
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import Handlebars from "handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import {Server} from "socket.io"
//import routers:
import mockRouter from "./mocks/products.router.js";
import viewsRouter from "./routes/views.routes.js";
import emailRouter from "./routes/email.router.js";
import usersViewsRouter from "./routes/usersViews.router.js";
import gitHubLoginViewRouter from "./routes/githubViews.router.js";
import jwtRouter from "./routes/jwt.router.js";
import cartRouter from "./routes/carts.routes.js";
import productRouter from "./routes/product.routes.js";
import { productService } from "./services/repository/services.js";
//import ProductsService from "./services/oldproduct.services.js";
import productControllers from "./controllers/product.controllers.js";
import session from "express-session"
import MongoStore from "connect-mongo"
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import cookieParser from "cookie-parser";
import { addLogger } from "./config/logger_CUSTOM.js";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUIExpress from 'swagger-ui-express'


const app = express()
const SERVER_PORT = config.port
const httpServer = app.listen(SERVER_PORT,()=>console.log(`Server listening on port: ${SERVER_PORT}`)) 
// Instanciar websocket:
const io = new Server(httpServer)


//levantamos instancia de MONGO

const mongoInstance = async() =>{
    try {
        console.log("instancia mongo");
        await MongoSingleton.getInstance()
    } catch (error) {
        console.error(error);
    }
}
mongoInstance();

//SWAGGER
const swaggerOptions = {
    definition:{
        openapi: "3.0.1",
        info:{
            title: "Documentacion api d fio",
            descripcion: "Probando la documentación"
        }
     },
    apis:[`./src/docs/**/*.yaml`]
}

const specs = swaggerJSDoc(swaggerOptions)
app.use('/apidocs',swaggerUIExpress.serve, swaggerUIExpress.setup(specs))

//JSON settings
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+`/public`))
// CORS
app.use(cors());

//cookieparser
app.use(cookieParser("f10s3cr3r"));

// **Logger
app.use(addLogger);
// **BASE
// app.get("/logger", (req, res) => {
//     req.logger.warning("Prueba de log level warning --> en Endpoint"); // **CUSTOM
//     res.send("Prueba de logger!");
// });

// Motor de plantillas:
app.engine("hbs", handlebars.engine({
    extname: "hbs",
    defaultLayout:"main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
}))


// Setear motor de plantillas
app.set("view engine", "hbs")
app.set("views",__dirname+`/views`) // setemamos la carpeta que el motor va a ser uso
console.log(config.mongoPassword);


// configuración de sesion
app.use(session({
    // --- fileStrore
        //store: new fileStore({path:"./sessions",ttl:15,retries:0}),
    // --- mongo store:
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://fio:${config.mongoPassword}@cluster0.mi1diym.mongodb.net/${config.mongoDBName}?retryWrites=true&w=majority`,
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
   // app.use("/api/sessions",sessionsRouter)
    app.use("/api/jwt",jwtRouter)
    // mocking
    app.use("/api/",mockRouter)
    //emails
    app.use("/api/email", emailRouter);

// Socket communication
//const productService = new ProductsService()
io.on("connection",(socket)=>{
    console .log("Nuevo cliente conectado");
    // recepcion del emit 1 
    socket.on("products_message", async (product)=>{
        console.log("product desde socket.on de app" + product.title)
    try {
        await productService.save(product)
        console.log("antes del emit");
        socket.emit("products_list", productControllers.getProducts)
    } catch (error) {
         console.log(error);
        return socket.emit("error", error)
    }
   })
   socket.emit("products_list", productControllers.getProducts)
   
 })

 

      

    
       
       
      
  

