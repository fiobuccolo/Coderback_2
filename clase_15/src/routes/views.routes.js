import { Router } from "express";
import ProductDao from "../daos/dbManager/product.dao.js";
import CartDao from "../daos/dbManager/cart.dao.js";
import MessagesDao from "../daos/dbManager/messages.dao.js";


const viewsRouter = Router();

viewsRouter.get("/products", async(req,res)=>{
    const prods = await ProductDao.getAllProducts()
    console.log(prods);
    res.render("home",{
        title: "Home",
        prods,
        fileCss:"products.css"
    })
})

export default viewsRouter

