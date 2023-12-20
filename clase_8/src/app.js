import express  from "express";
import { loader } from "../utils/multer.js";
const app = express();

const usuarios = []

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
// import de rutas
import petsRouter from './routes/pets.router.js'
import usersRouter from './routes/user.router.js'


app.get("/",(req,res)=>{
    res.json({
        mensaje:"Bienvenido a mi api"
    })
})
// Routes
app.use("/api/pets",petsRouter)
app.use("/api/users",usersRouter)
//loader
app.post("/uploads",loader.single("file"),(req,res)=>{
    if(!req.file){
        return res.status(500).json({
            error:"Hubo un error al subir al archivo"
        })
    }
    console.log(req.file);
    console.log(req.body);

    return res.json({
        message: "el archivo se subio"
    })
})


app.listen(5000,()=> console.log("Server listening on port 5000"));

