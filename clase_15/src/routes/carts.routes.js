import { Router } from "express";
import CartDao from "../daos/dbManager/cart.dao.js";

const cartRouter = Router();

// Get all carts
cartRouter.get("/", async (req, res) => {
    const carts = await CartDao.getAllCarts();
    res.json({
        carts,
    });
  });
// Get one cart

// Post one cart

// update one cart

// delete one cart

export default cartRouter