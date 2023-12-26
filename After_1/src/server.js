import { Socket } from 'dgram';
import express from 'express'
import postRouter from './routes/post.routes.js';
import userRouter from './routes/user.routes.js';
//import router from './routes/post.routes.js';
import logger from './utils/logger.js';
import { Server } from "socket.io";
import handlebars from "express-handlebars"
import Handlebars from "handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import __dirname from './dirname.js';
import viewsRouter from './routes/views.routes.js';
//import { ManagerPost } from './manager/ejemplo1.js';
import postDao from './daos/dbManager/post.dao.js';
import mongoose from 'mongoose';
import { password, PORT,db_name } from './env.js';
const app = express();

const httpServer = app.listen(PORT, ()=>{console.log(`Server listenin in port ${PORT}`)})
const io = new Server(httpServer)
 
// mongoose connection
//--> para local: "mongodb://127.0.0.1:27017/baseDeDatos"
mongoose    
    .connect(`mongodb+srv://fio:${password}@cluster0.mi1diym.mongodb.net/${db_name}?retryWrites=true&w=majority`)
    .then(()=>{console.log("DB connected")})
    .catch((err)=>{console.log(`Hubo un error: ${err}`)})

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+`/public`))

 app.engine("hbs",handlebars.engine({
    extname: "hbs",
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
 }))

 // Setear motor de plantillas
app.set("view engine", "hbs")
app.set("views",__dirname+`/views`)


app.use("/api/posts",postRouter)
app.use("/api/users",userRouter)
app.use("/",viewsRouter)
app.use(logger)

//const manager = new ManagerPost("./posts.json")
io.on("connection", (socket) => {
   console.log("nuevo cliente conectado");
   
   socket.on("post_send",async (data)=>{
      console.log(data);
      
      try {
         //await manager.savePost(data)
         await postDao.createPost(data)
      //socket.emit("posts",manager.getPosts())
      socket.emit("posts",postDao.findPosts())
      } catch (error) {
         console.log(error);
      } 
   })
   socket.emit("posts",postDao.findPosts())
 
})



