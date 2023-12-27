import { Router } from "express";
import ProductDao from "../daos/dbManager/product.dao.js";
import productDao from "../daos/dbManager/product.dao.js";



const productRouter = Router();

// Get all products
productRouter.get("/", async (req, res) => {
  const {limit,page,sort,category} = req.query
  if(!limit && !page && !sort && !category){
    const products= await ProductDao.getAllProducts();
    console.log(products);
      return res
        .json(
          products,
        );
    }
    const filter = {
        category,
    }
    const prods = await ProductDao.getPaginateProducts(page, limit,sort,filter)
    return res
        .json({
          prods,
        });
  });


// Get one product
productRouter.get("/:id", async (req, res) => {
  try {
    const {id}= req.params
    const product = await ProductDao.getOneProduct(id)
  if (!product){
    return res
      .status(404)
      .json({message: "Product not found"})
    }
  return res
    .json({
      product,
    });
  } catch (error) {
    console.log(error);
      res
        .json({ info: "Error getting product", error });
    }
});


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