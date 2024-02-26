import { Router } from "express";
import ProductDao from "../daos/dbManager/product.dao.js";


const viewsRouter = Router();

viewsRouter.get("/products", async(req,res)=>{
    // const { limit = 4, page = 1, category = null, sort = 1 } = req.query;
     const { limit, page, sort, filter } = req.query;
    console.log(page , limit,sort,filter );
    // const filter = {category}
    try {
        const prods = await ProductDao.getPaginateProducts(page, limit,sort,filter)
        console.log(prods);
        //res.json(products);
        res.render("products",{
            title: "products",
            prods,
            user: req.session.user,
            fileCss:"products.css"
        })
    } catch (error) {
        res.json({
            message: error.message,
           }); 
    }  
})

 //auth:
 function auth(req,res,next){
    if(req.session.admin){
        return next()
    }
    return res.status(403).send("no autorizado")
  }

  viewsRouter.get("/private",auth, async(req,res)=>{
    res.send("autorizado")
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

