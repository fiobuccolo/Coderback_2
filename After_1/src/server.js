import express from 'express'
import router from './routes/post.routes.js';
import logger from './utils/logger.js';
const app = express();
app.use(express,json())
app.use(express.urlencoded({extended:true}))

const PORT = 8080


app.get("/", async (req,res)=>{ 
    res.send("Hola")
})

app.use("/api/posts",router)

app.use(logger)

app.listen(PORT, ()=>{console.log(`Server listenin in port ${PORT}`)})


