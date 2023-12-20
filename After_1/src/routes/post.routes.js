import Router from "express"
import { Post, ManagerPost } from "../manager/ejemplo1.js "
import validatePost from "../utils/validatePost.js"
const router = Router()

const manager = new ManagerPost("./posts.json")



router.get("/",(req,res)=>{
    const posts = manager.getPosts()
    res.json({
        posts
    })
})

router.post("/",validatePost,async (req,res)=>{
    const {id,userId,title,body} = req.body
    const post = new Post(id,userId,title,body)
    try {
        await manager.savePost(post)
        return res.json({
            message: "Post created",
            post
        })
    } catch (error) {
        return res.json({
            error: `Hubo un error: ${error} `
        })
    }
    
})

router.delete("/:id",async (req,res)=>{
    const {id} = req.params
    if(!id){
        return res.json({
            error: "id obligatorio"
        })
    } 
    try {
        await manager.deletePost(id)
        return res.json({
            message: "Post eliminado",
        })
    } catch (error) {
        return res.json({
            error: `Hubo un error: ${error} `
        })
    }
})

export default router