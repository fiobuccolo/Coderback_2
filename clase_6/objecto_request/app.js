import express from "express";
const app = express();
const PORT = 5000

app.get("/",(req,res)=>{ 
    console.log(req.params); 
    console.log(req.query); // ?key=valor&key2=valor

    if(req.query.nombre){
        const usuario= usuarios.find((user)=>user.nombre ===req.query.nombre)
        if(usuario){
            res.send("Bienvenido")
        }
    }
    res.send("Saludo desde el servidor")
})


app.get("/usuarios",(req,res)=>{
    res.json(usuarios)
})
// params
app.get("/usuarios/:id",(req,res)=>{
    console.log(req.params);
    const {id} = req.params
})


app.listen(PORT, ()=>{console.log(`Server listenin in port ${PORT}`)})

