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




export default viewsRouter

