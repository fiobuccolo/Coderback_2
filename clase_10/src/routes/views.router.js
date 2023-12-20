import { Router } from "express";
const router = Router()

// food
const food =[
    {name:"Pizza", price:100},
    {name:"Hamburguesa", price:80},
    {name:"Empanada", price:40}
]
const user= {
    name: "Ivana",
    role:"admin"
}
router.get("/food", (req,res)=>{
    res.render("food",{
        title: "Food",
        isAdmin: user.role === "admin",
        food,
        fileCss:"style.css"
    })
})

// form
router.get("/form",(req,res)=>{
    res.render("form",{
        title:"form example"
    })
})
const users= []
router.post("/user",(req,res)=>{
    const {name,age} = req.body
    users.push({
        name,
        age
    }) 
    console.log(users);
    res.redirect("/")
})

// chat
router.get("/chat",(req,res)=>{
    res.render("chat",{
        title:"form example"
    })
})

export default router
