import  express from "express";
import handlebars from "express-handlebars"
import __dirname from "./utils.js";
import Viewrouter from "./routes/views.router.js";

const app = express()
const PORT = 5000
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

app.listen(PORT,()=>console.log(`Server listening on port: ${PORT}`))