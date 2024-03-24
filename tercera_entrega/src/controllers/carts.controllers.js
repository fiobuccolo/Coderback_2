
import { cartsService } from '../services/repository/services.js';
import { productService } from '../services/repository/services.js';
//import CartsService from "../services/cart.services.js"
//const cartsService = new CartsService()
//import ProductsService from "../services/product.services.js"
//const productService = new ProductsService()

 // ------- PENDING PROBAR -----------
    const getCarts = async (req,res) =>{ 
        try{
        const carts = await cartsService.getAllCarts()
        console.log(carts);
        res.json(carts)}
        catch (error) {
            res.json({
                message: error.message,
               })}; 
    }

    const getOneCart = async (req,res) =>{ 
        try {
            console.log("get one product")
            const { id } = req.params;
            console.log("controler", id)
            const cart = await cartsService.getById(id)
            //console.log(product.message)
            console.log(cart)
            if(!cart){
                return res
                    .status(404)
                    .json({ message: "cart not found"})
                   }
            res
              .status(200)
              .json({status:"success", message: cart})  
        } catch (error) {
            res
              .status(500)
              .json({status:"error", error: error.message})  
        }
    
    }

 
    const createCart =  async (req,res) =>{
        try {
          const cartData = req.body;
           const newCart = await cartsService.save(cartData)
              return res
               .status(201)
               .json({message:"ok",newCart})
           }  catch (error) {
             console.log(error);
              return res
                  .json({ message: "Error creating product", error });
          }
         };


    const updateCart =  async (req,res) =>{
            try {
                console.log("update carts")
                const { cid, pid } = req.params;
                const {quantity = 1} = req.body
                console.log(quantity);
                const cartExist = await cartsService.getById(cid)
                //const cartExist = await cartsService.getOneCart(cid)
                if(!cartExist){
                   return res
                    .status(404)
                    .json({message:"cart not found"})
                  }
                   // Validar que el producto existe
                   const prodExist = await productService.getById(pid)
                   if(!prodExist){
                     return res
                       .status(404)
                       .json({message:"product not found"})
                     }
                // Existe el producto en el carrito?:
                console.log(cartExist);
                const productInCart = cartExist.products.find(p => p.id === pid);
                const index = cartExist.products.findIndex(p => p.id === pid);
                    // SI: Sumarle una cantidad
                    if(productInCart){
                          const cartUpdated = await cartsService.update(cid,pid,quantity)
                          return res
                               .status(200)
                               .json({status:"success", message:cartUpdated})
                         }
                   // NO: AGregarleo
                      else{
                        console.log("No entro por indice producto")                       
                        const create = {
                            $push: { products: { _id: pid, quantity: 1 } },
                        }
                      const cartUpdated = await cartsService.addProductToCart(cid,create)  
                      return res
                      .status(200)
                      .json({status:"success", message:cartUpdated})
                      
                    }     
            } catch (error) {
                console.log(error);
                return res
                  .status(500)
                  .json({message:"error updating cart", error: error.message, errorcode:error.code})  
              }
          }     
  
  const deleteCart =  async (req,res) =>{
    try{ 
        console.log("delete carts")
        const { id } = req.params;
        const cart = await cartsService.delete(id)
        return res
                .status(200)
                .json({message:"ok",cart})
    }catch(error){
      console.log(error);
      res
        .status(500)
        .json({ info: "Error deleting cart", error });
      }
  }

  const createPurchase =async (req,res) =>{

  }

export default {    
  getCarts,
  getOneCart,
  createCart,
  updateCart,
    deleteCart,
    createPurchase
}