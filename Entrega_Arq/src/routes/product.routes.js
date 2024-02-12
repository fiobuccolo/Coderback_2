import { Router } from "express";
import ProductDao from "../daos/dbManager/product.dao.js";
import productDao from "../daos/dbManager/product.dao.js";
import productControllers from "../controllers/product.controllers.js";

const productRouter = Router();

productRouter.get("/",productControllers.getProducts)
productRouter.get("/:id",productControllers.getOneProduct)

// Get one product


// Post one product
productRouter.post("/", async (req, res) => {
    try {
        const {title,description,price,thumbnail,code,stock,status,category} = req.body
         // Validación de campos obligatorios
        if(!title || !description || !price || !category || !stock || !code) {
            return res
              .status(400)
              .json({message: "missing data"})
         }
        const product = {title,description,price,thumbnail,code,stock,status,category}
        console.log(product);
        const response = await ProductDao.CreateOneProduct(product)
        return res
            .status(201)
            .json({message:"ok",response})
           
    } catch (error) {
      console.log(error);
      return res
        .json({ message: "Error creating product", error });
    }
  });



// update one product
productRouter.patch('/:pid',async (req,res) => {
  try {
      console.log("update products")
      const { pid } = req.params;
      const props = req.body;
          console.log(pid)
          const product = await ProductDao.UpdateOneProduct(pid, props)
          return res
            .status(200)
            .json({status:"success", message:product})
  } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({message:"error updating product", error: error.message, errorcode:error.code})  
    }
  }
)

// delete one product
productRouter.delete('/:pid',async (req,res) => {
      try{ 
        const { pid } = req.params;
        const product = await productDao.DeleteOneProduct(pid)
        return res
                .status(200)
                .json({message:"ok",product})
    }catch(error){
      console.log(error);
      res
        .json({ info: "Error deleting product", error });
      }
      })

export default productRouter