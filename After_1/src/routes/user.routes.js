import { Router } from "express"
import userDao from "../daos/dbManager/user.dao.js"
const userRouter = Router()

// const manager = new ManagerPost("./posts.json")


userRouter.get("/",async (req,res)=>{
    try {
        const users = await userDao.findUsers()
        res.json({
            data: users,
            message:"Users list"
        })
    } catch (error) {
        console.log(error);
        res.json({
            error,
            message:"Error"
        })
    }
    
})


userRouter.get("/:id",async (req,res)=>{
    try {
        const {id} = req.params
        const user = await userDao.findUserById(id)
        res.json({
            data: user,
            message:"User info"
        })
    } catch (error) {
        console.log(error);
        res.json({
            error,
            message:"Error"
        })
    }
    
})



userRouter.post("/",async (req,res)=>{
    const {username,email,name,id} = req.body
    const user = (username,email,name,id)
    try {
        const newUser = await userDao.createUser(user)
        return res.json({
            message: "Post created",
            message: "Post created",

        })
    } catch (error) {
        return res.json({
            error: `Hubo un error: ${error} `
        })
    }
    
})

userRouter.put("/:id", async (req,res)=>{
    try {
        const {id} =req.params
        const {username,email,name} = req.body
        const user = (username,email,name) 
        const newUser = await userDao.updateUser(id,user)
        return res.json({
            message: "Post updated",
            newUser
        })
    } catch (error) {
        console.log(error);
        res.json({
            error,
            message:"Error"
        }) 
    }
} )

userRouter.delete("/:id",async (req,res)=>{
    try {
        const {id} = req.params
        if(!id){
            return res.json({
                error: "id obligatorio"
            })
        } 
        const response = await userDao.deleteUser(id)
        return res.json({
            message: "User eliminado",
            response
        })
    } catch (error) {
        return res.json({
            error: `Hubo un error: ${error} `
        })
    }
})

export default userRouter