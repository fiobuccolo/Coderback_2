 import fs from "fs";
//const fs = require ("fs")
class ManagerPost{
constructor(path){
    this.path = path;
    try {
        let posts = fs.readFileSync(this.path,"utf-8");
        this.posts = JSON.parse(posts)
    } catch (error) {
       this.posts = [] 
    }
}
//METODOS;


async savePost(post){
    if(!post){
        return console.log("El post esta vacio");
    }
    const existPosts = this.posts.find((p)=>p.id===post.id);
    if(existPosts){
         console.log("elpost ya existe");
         throw Error("Post already exists")
    }
    this.posts.push(post)
    try {
        await fs.promises.writeFile(this.path,JSON.stringify(this.posts,null,'\t'))
    } catch (error) {
        console.log(`Hubo un error: ${error}`);
        return
    }

}

getPosts(){
    console.log(this.posts)
    return this.posts
}
}

class Post{
    constructor(userId,id, tittle,body){
        this.userId = userId,
        this.id= id,
        this.tittle = tittle,
        this.body =  body
    }
}

async function fetchDatos(){
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts")
        const data = await response.json()
        const manager = new ManagerPost("./posts.json")

        for (let i=0;i<10; i++){
            const post = new Post(
                data[i].userId,
                data[i].id,
                data[i].tittle,
                data[i].body
            );
            //console.log(post)
            manager.savePost(post)
        }
        console.log(manager.getPosts())
    } catch (error) {
        console.log(`Hubo un error: ${error}`);
        return
    }
 
}

 //fetchDatos()

 export { ManagerPost, Post}