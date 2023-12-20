import express  from "express";
const app = express();

const usuarios = []

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.json({
        mensaje:"Bienvenido a mi api"
    })
})

app.get("/usuarios",(res,req)=>{
   
    res.json({
        "usuarios":usuarios
    })
})

app.get("/usuarios/:id",(res,req)=>{
   const {id} = req.params 
   const usuario = usuarios.find((u)=>u.id=== parseInt(id) )
   if(!usuario){ 
        return res.json({
            mensaje:"Usuario no encontrado"
          })}
   res.json({
        "usuarios":usuarios
    })
})

app.post("/usuarios",(res,req)=>{
    const {id,username,name} = req.body 
    usuarios.push({
        id: parseInt(id),
        username,
        name
    })
    res.json({
        status:"Usuario Creado",
    })
})

app.put("/usuarios/:id",(res,req)=>{
    const {id} = req.params
    const { username,name} = req.body

    const index = usuarios.findIndex((user)=>user.id=== parseInt(id) )
   if(index<0){ 
        return res.json({
            mensaje:"Usuario no encontrado"
          })}
    usuarios[index].push = ({
            id: parseInt(id),
            username,
            name
        })
    res.json({
            status:"Usuario actualizado",
            "usuarios":usuarios,
            usuario:{
                id: parseInt(id),
                username,
                name
            }
        
        })

})


app.delete("/usuarios/:id",(res,req)=>{
    const {id} = req.params
    const index = usuarios.findIndex((user)=>user.id=== parseInt(id) )
   if(index<0){ 
        return res.json({
            mensaje:"Usuario no encontrado"
          })}

    usuarios.splice(index,1)
   
    res.json({
            status:"Usuario eliminado"
        })

})


app.listen(5000,()=> console.log("Server listening on port 5000"));

