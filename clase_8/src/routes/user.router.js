import { Router } from "express";

const usersRouter = Router();

const users = []

usersRouter.get("/",(req,res)=>{
    res.json({
        usuarios:users
    })
})

usersRouter.post("/",(req,res)=>{
    const {id,username,name} = req.body 
    users.push({
        id: parseInt(id),
        username,
        name
    })
    res.json({
        status:"Usuario Creado",
        usuarios:users
    })
})



export default usersRouter