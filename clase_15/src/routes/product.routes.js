import { Router } from "express";
import ProductDao from "../daos/dbManager/product.dao.js";



const productRouter = Router();

// Get all products
productRouter.get("/", async (req, res) => {
  const {limit,page,sort,category} = req.query
  if(!limit && !page && !sort && !category){
    const products= await ProductDao.getAllProducts();
    console.log(products);
      return res
        .json({
          products,
        });
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

// get al products con paginate
  /*
  consultas de productos con filtros, pagina y ordenamintos
get de products:
. recibir por query pararms un limit, una page, un sort, y un query
limit defualt 10
page default 1
query: elemento a buscar
sort por precio - si no se recibe ninguno
- se debera poder buscar por categoria y por disponibilidad
*/


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
      res
        .json({ info: "Error creating product", error });
    }
  });



// update one product

// delete one product


export default productRouter