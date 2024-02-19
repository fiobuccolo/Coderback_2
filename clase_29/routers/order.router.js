import { Router } from "express";
import {getOrders,getOrderById,saveOrder} from '../controllers/orders.controller.js'

const router = Router();

router.get("/", getOrders)
router.get("/:id", getOrderById)
router.post("/", saveOrder)

export default router