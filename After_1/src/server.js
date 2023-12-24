import { Socket } from 'dgram';
import express from 'express'
import router from './routes/post.routes.js';
import logger from './utils/logger.js';
import { Server } from "socket.io";
import handlebars from "express-handlebars"
import __dirname from './dirname.js';
import viewsRouter from './routes/views.routes.js';
import { ManagerPost } from './manager/ejemplo1.js';

const app = express();

const PORT = 5000
const httpServer = app.listen(PORT, ()=>{console.log(`Server listenin in port ${PORT}`)})
const io = new Server(httpServer)
 
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+`/public`))

 app.engine("hbs",handlebars.engine({
    extname: "hbs",
    defaultLayout: "main"
 }))

 // Setear motor de plantillas
app.set("view engine", "hbs")
app.set("views",__dirname+`/views`)


app.use("/api/posts",router)
app.use("/",viewsRouter)
app.use(logger)

const manager = new ManagerPost("./posts.json")
io.on("connection", (socket) => {
   console.log("nuevo cliente conectado");
   
   socket.on("post_send",async (data)=>{
      console.log(data);
      try {
         await manager.savePost(data)
      socket.emit("posts",manager.getPosts())
      } catch (error) {
         console.log(error);
      } 
   })
   socket.emit("posts",manager.getPosts())
 
})



