import { Router } from "express";
import ProductDao from "../daos/dbManager/product.dao.js";
import CartDao from "../daos/dbManager/cart.dao.js";
import MessagesDao from "../daos/dbManager/messages.dao.js";


const viewsRouter = Router();

viewsRouter.get("/products", async(req,res)=>{
    const { limit = 4, page = 1, category = null, sort = 1 } = req.query;
    console.log(page , limit,sort,category );
    const filter = {
        category,
    }
    const prods = await ProductDao.getPaginateProducts(page, limit,sort,filter)
    
   console.log(prods);
    res.render("home",{
        title: "Home",
        prods,
        fileCss:"products.css"
    })
})


viewsRouter.get("/realtimeproducts", async (req,res)=>{
    try {
        res.render("realTimeProducts",{
            title:"Real time products",
            fileCss:"products.css"
        })

    } catch (error) {
        
   
    }
    })


// tengo que agregar un post a productos aca?

// viewsRouter.post("/api/realtimeproducts", async (req,res)=>{
//     try{ 
//         console.log(("estoy por aca"));
//         const {title,description,price,thumbnail,code,stock,status,category} = req.body
//         console.log("validacion de inputs")
//         console.log(title,description,price,thumbnail,code,stock,status,category);
//         if(!title || !description || !price || !category || !stock || !code) {
//             return res.json({message:  "missing data" })
//          }
//         console.log("creación de product de inputs")
//         const newProduct = new Product(title,description,price,thumbnail,code,stock,status,category)
//         console.log(newProduct)
//         const response = await products.addProduct(newProduct);
//         console.log("hola")
//         return res.redirect("/realtimeproducts").json({
//             message: response
//         })
//         .redirect("/realtimeproducts")
//     }  catch(error){ throw new Error (error)}
// }) 

export default viewsRouter

