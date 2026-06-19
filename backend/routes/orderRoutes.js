import express from "express";
import {
    createOrder,
    getAllOrders,
    getUserOrders,
    updateOrderStatus,
    deleteOrder
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validationMiddleware.js";
import { orderSchema } from "../validations/orderValidation.js";

const router = express.Router();

router.post("/", protect, validate(orderSchema), createOrder);
router.get("/", protect, admin, getAllOrders);
router.get("/user/:userId", protect, getUserOrders);
router.patch("/:id", protect, admin, updateOrderStatus);
router.delete("/:id", protect, admin, deleteOrder);

export default router;

