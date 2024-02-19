import { Router } from "express";
import {getBusiness,getBusinessById,getBusinessByCategory,saveBusiness} from '../controllers/business.controller.js'

const router = Router();

router.get("/", getBusiness)
router.get("/:id", getBusinessById)
router.get("/categories/:category", getBusinessByCategory)
router.post("/", saveBusiness)

export default router