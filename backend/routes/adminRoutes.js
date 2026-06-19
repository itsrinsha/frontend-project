import express from "express";
import {
    getDashboardStats,
    getAllUsers,
    toggleBlockUser,
    getAllOrders,
    updateOrderStatus,
    deleteOrder
} from "../controllers/adminControllers.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();


router.use(protect);
router.use(admin);

router.get("/stats", getDashboardStats);
router.get("/users", getAllUsers);
router.patch("/users/:id/block", toggleBlockUser);
router.get("/orders", getAllOrders);
router.patch("/orders/:id/status", updateOrderStatus);
router.delete("/orders/:id", deleteOrder);

export default router;
