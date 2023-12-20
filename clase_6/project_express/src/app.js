import express from "express"

const app = express();

// definir ruta
app.get("/",(req,res) =>{
    res.send("<h1>Hola mundo desde express</h1>")
})

app.get("/bienvenida",(req,res) =>{
    res.send("<h1 style='color:blue'>Hola mundo desde express</h1>")
})

app.get("/usuario",(req,res) =>{
    res.json({
        nombre:"Emiliano",
        apellido:"Perez",
        edad:23,
        correo:"emi@gmail.com"
    })
})
// escuchar server
app.listen(8080,() => console.log("Server listening on port 8080"));