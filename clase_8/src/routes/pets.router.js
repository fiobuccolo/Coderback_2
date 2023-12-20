import { Router } from "express";

const petsRouter = Router(); 
const pets = []

petsRouter.get("/",(req,res)=>{
    res.json({
        mascotas:pets
    })
})

petsRouter.post("/",(req,res)=>{
    const {raza,name, tipo} = req.body 
    pets.push({
        raza,
        name,
        tipo
    })
    res.json({
        status:"Mascota Creada",
        mascotas:pets
    })
})


export default petsRouter