import ProductsService from "../services/product.services.js"
const productService = new ProductsService()
import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/errors-enum.js";
import { generateProductErrorInfo } from "../services/errors/messages/product-creation-error.message.js";

    const getProducts = async (req,res) =>{ 
        const { limit, page, sort, filter } = req.query;
        console.log(page , limit,sort,filter );
        try{
        const products = await productService.getAllProducts(page, limit,sort,filter)
       // console.log(products);
       res.json(products)
       }
        catch (error) {
            res.json({
                message: error.message,
               })}; 
    }

    
      const getProductView = async (req,res) =>{
        
        const { limit, page, sort, filter } = req.query;
       const users = req.user
        console.log(req.user);
        console.log(page , limit,sort,filter );
        try{
        const products = await productService.getAllProducts(page, limit,sort,filter)
        console.log(products);
       console.log(products);
       res.render("products", {
        products: products,
        user: users
     })
       }
        catch (error) {
            res.json({
                message: error.message,
               })}; 
   }
     
    
    const getOneProduct = async (req,res) =>{ 
        try {
            console.log("get one product")
            const { id } = req.params;
            console.log("controler", id)
            const product = await productService.getById(id)
            if(!product){
              return res
              .status(404)
              .json({message:"product not found",product})
            }else{
              res
              .status(200)
              .json({status:"success", message: product})  
           }
        } catch (error) {
        res.status(500).json({status:"error", error: error.message})  
        }
    
    }
    

  



    const saveProduct =  async (req,res) =>{
        try {
            const {title,description,price,thumbnail,code,stock,status,category} = req.body
         // Validación de campos obligatorios
      
      


         if(!title || !description || !price || !category || !stock || !code) {
          CustomError.createError({
            name: "Product Create Error",
            cause: generateProductErrorInfo({ title, description, price, category,stock, code}),
            message: "Error tratando de crear el producto",
            code: EErrors.INVALID_TYPES_ERROR
               })
              }
                //  return res
                  //  .status(400)
                  //  .json({message: "missing data"})
                  //   }
           const product = {title,description,price,thumbnail,code,stock,status,category}
          // console.log(product);
          const response = await productService.save(product)
          //console.log(response);
              return res
               .status(201)
               .json({message:"ok",response})
           }  catch (error) {
                console.log(error);
               return res
                      .json({ message: "Error creating product", error: error});
          }
         };


    const updateProduct =  async (req,res) =>{
            try {
                console.log("update products")
                const { id } = req.params;
                const props = req.body;
                    console.log(id)
                    const product = await productService.update(id, props)
                    if(!product){
                      return res
                      .status(404)
                      .json({message:"product not found",product})
                    }else
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
  
  const deleteProduct =  async (req,res) =>{
    try{ 
        console.log("delete products")
        const { id } = req.params;
        const product = await productService.delete(id)
        if(!product){
          return res
          .status(404)
          .json({message:"product not found",product})
        }else
        return res
                .status(200)
                .json({message:"ok",product})
    }catch(error){
      console.log(error);
      res
        .status(500)
        .json({ info: "Error deleting product", error });
      }
  }


export default {    
    getProducts,
    getOneProduct,
    saveProduct,
    updateProduct,
    deleteProduct,
    getProductView
}