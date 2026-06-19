import express from "express";
const router = express.Router();
import { register, login, getUser, updateUser, getAllUsers, deleteUser, refreshToken, logout } from "../controllers/authController.js";
import { validate } from "../middleware/validationMiddleware.js";
import { registerSchema, loginSchema } from "../validations/userValidation.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);
router.get("/", protect, admin, getAllUsers);
router.get("/:id", protect, getUser);
router.patch("/:id", protect, updateUser);
router.delete("/:id", protect, admin, deleteUser);


export default router;

