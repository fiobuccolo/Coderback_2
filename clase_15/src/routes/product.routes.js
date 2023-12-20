import { Router } from "express";
import ProductDao from "../daos/dbManager/product.dao.js";


const productRouter = Router();

// Get all products
productRouter.get("/", async (req, res) => {
    const products = await ProductDao.getAllProducts();
    res.json({
      products,
    });
  });
// Get one product

// Post one product
productRouter.post("/", async (req, res) => {
    try {
        const {title,description,price,thumbnail,code,stock,status,category} = req.body
         // Validación de campos obligatorios
        if(!title || !description || !price || !category || !stock || !code) {
            return res.json({message:  "missing data" })
         }
        const product = {title,description,price,thumbnail,code,stock,status,category}
        console.log(product);
        const response = await ProductDao.CreateOneProduct(product)
        res
            .json({message:"ok",response})
           
    } catch (error) {
      console.log(error);
      res.json({ info: "Error creating product", error });
    }
  });




// update one product

// delete one product

export default productRouter