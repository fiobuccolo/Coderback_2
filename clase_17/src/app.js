import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./dirname.js";
import viewsRouter from "./routes/views.routes.js";
import session from "express-session"

const PORT = 5000
const app = express()



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



// configuración de sesion
app.use(session({
    secret:"f10s3cr3t",
    resave:true,
    saveUninitialized:true
})
)
// rutas
app.use("/",viewsRouter)


app.listen(PORT,()=>console.log(`Server listening on port: ${PORT}`)) 