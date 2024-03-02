import { Router } from "express";
import cartsControllers from "../controllers/carts.controllers.js";

const cartRouter = Router();

cartRouter.get("/",cartsControllers.getCarts)
cartRouter.get("/:id",cartsControllers.getOneCart)
cartRouter.post("/",cartsControllers.createCart)
cartRouter.put("/:cid/product/:pid",cartsControllers.updateCart)
cartRouter.delete("/:cid",cartsControllers.deleteCart)
cartRouter.post("/:cid/purchase",cartsControllers.createPurchase)



export default cartRouter