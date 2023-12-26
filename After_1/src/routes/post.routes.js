import Router from "express"
//import { Post, ManagerPost } from "../manager/ejemplo1.js "
import PostsDao from "../daos/dbManager/post.dao.js"
import userDao from "../daos/dbManager/user.dao.js"

import validatePost from "../utils/validatePost.js"
const postRouter = Router()

// const manager = new ManagerPost("./posts.json")


postRouter.get("/",async (req,res)=>{
    try {
        const posts = await PostsDao.findPosts()
        res.json({
            data: posts,
            message:"Posts list"
        })
    } catch (error) {
        console.log(error);
        res.json({
            error,
            message:"Error"
        })
    }
    
})

postRouter.post("/",validatePost,async (req,res)=>{
    const {id,author,title,body} = req.body
    const post = (id,author,title,body)
    const user = await userDao.findUserById(author)
    if(!user) return res.status(404).json({message:"User not found"})
    try {
        const newPost = await PostsDao.createPost(post)
        return res.json({
            message: "Post created",
            newPost
        })
    } catch (error) {
        return res.json({
            error: `Hubo un error: ${error} `
        })
    }
    
})

postRouter.put("/:id", async (req,res)=>{
    try {
        const {id} =req.params
        const {userId,title,body} = req.body
        const post = (userId,title,body) 
        const newPost = await PostsDao.updatePost(id,post)
        return res.json({
            message: "Post updated",
            newPost
        })
    } catch (error) {
        console.log(error);
        res.json({
            error,
            message:"Error"
        }) 
    }
} )

postRouter.delete("/:id",async (req,res)=>{
    try {
        const {id} = req.params
        if(!id){
            return res.json({
                error: "id obligatorio"
            })
        } 
        const response = await PostsDao.deletePost(id)
        return res.json({
            message: "Post eliminado",
            response
        })
    } catch (error) {
        return res.json({
            error: `Hubo un error: ${error} `
        })
    }
})

export default postRouter