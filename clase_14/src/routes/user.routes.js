import { Router } from "express";
import { userModel } from "../models/users.models.js";
const userRouter = Router();

userRouter.get("/",async(req,res)=>{
    try {
        const users = await userModel.find();
        res.json(users)
    } catch (error) {
        console.log(error);
        res.json({
            message:"Error",
            error: error,
        })
    }
})

userRouter.post("/",async(req,res)=>{
    try {
        const user = req.body
        const response = await userModel.create(user)
        res.json({
            message:"ok",
            response
        })
    } catch (error) {
        console.log(error);
        res.json({
            message:"Error",
            error: error,
        })
    }
})

userRouter.put("/:id",async(req,res)=>{
    try {
        const { id } = req.params
        const user = await userModel.find({"_id":id})
        if (!user) return res.json({
            message: "User not fund"
        })
        const newUser = req.body
        const response = await userModel.updateOne({_id:id}, newUser)
        if(response.modifiedCount== 0) {
            return res.json({
                error: "User not updated"
            })
        }
        res.json({
            message:"ok",
            response
        })
    } catch (error) {
        console.log(error);
        res.json({
            message:"Error",
            error: error,
        })
    }
})


userRouter.delete("/:id",async(req,res)=>{
    try {
        const { id } = req.params
        const response = await userModel.findByIdAndDelete({"_id":id})
        if (!response) return res.json({
            message: "User not fund"
        })
        res.json({
            message:"ok",
            response
        })
    } catch (error) {
        console.log(error);
        res.json({
            message:"Error",
            error: error,
        })
    }
})


export default userRouter