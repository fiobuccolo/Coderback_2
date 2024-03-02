import { Router } from "express";
import productControllers from "../controllers/product.controllers.js";

const productRouter = Router();
import { authorization, passportCall } from "../utils.js";

productRouter.get("/",productControllers.getProducts)
productRouter.get("/:id",productControllers.getOneProduct)
productRouter.post("/", passportCall("jwt"),authorization("admin"),productControllers.saveProduct)
productRouter.patch("/:id",productControllers.updateProduct)
productRouter.delete("/:id",productControllers.deleteProduct)


export default productRouter

