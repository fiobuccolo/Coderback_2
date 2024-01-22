import { Router } from "express";
import CartDao from "../daos/dbManager/cart.dao.js";
import cartDao from "../daos/dbManager/cart.dao.js";
import productDao from "../daos/dbManager/product.dao.js";

const cartRouter = Router();

// Get all carts
cartRouter.get("/", async (req, res) => {
    const carts = await CartDao.getAllCarts();
    res.json({
        carts,
    });
  });
// Get one cart
    cartRouter.get("/:id", async (req, res) => {
      try {
        const {id}= req.params
        const cart = await CartDao.getOneCart(id)
      if (!cart){
        return res
          .status(404)
          .json({message: "Cart not found"})
        }
      return res
        .json({
          cart,
        });
      } catch (error) {
        console.log(error);
          res
            .json({ info: "Error getting cart", error });
        }
    });

// Post one cart  -- crea un carrito sin products 
      cartRouter.post("/", async (req,res)=> {
        try {
          const cart = cartDao.CreateOneCart()
          return res
                  .status(201)
                  .json({message:"ok",cart})
        } catch (error) {
          console.log(error);
            res
              .json({ info: "Error creating product", error });
          }
      })


// update one cart: put api/carts/cid/products/id - actualiza cantidad por cantidad enviada en body
      cartRouter.post('/:cid/product/:pid',async (req,res) => {
        try{ 
          const { cid, pid } = req.params;
          const {quantity = 1} = req.body
          // Validar que el cart existe
          const cartExist = await CartDao.getOneCart(cid)
          if(!cartExist){
             return res
              .status(404)
              .json({message:"cart not found"})
            }
          // Validar que el producto existe
          const prodExist = await productDao.getOneProduct(pid)
          if(!prodExist){
             return res
              .status(404)
              .json({message:"product not found"})
            }
          const cart = await cartDao.UpdateOneCart(cid,pid,quantity)
          return res
                  .status(200)
                  .json({message:"ok",cart})
      }catch(error){
        console.log(error);
        return res
          .json({ info: "Error updating cart", error });
         }
        })


        
         
         
          


// delete one cart --  delete api/carts/cid-- elimina todos los productos del carrito
    cartRouter.delete('/:cid',async (req,res) => {
      try{ 
        const { cid } = req.params;
        const cart = await cartDao.DeleteOneCart(cid)
        return res
                .status(200)
                .json({message:"ok",cart})
    }catch(error){
      console.log(error);
      res
        .json({ info: "Error deleting cart", error });
      }
      })


// - delete one product from a cart -- api/carts/cid/products/id

export default cartRouter


/*entrega 



- populate de products del carrito

vista products- paginación
*/