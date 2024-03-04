import { Router } from "express";
import { getProducts } from "./products.controller.js";

const mockRouter = Router();

mockRouter.get("/mockingproducts", getProducts);

export default mockRouter;