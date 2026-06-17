import express from "express";
import {
  validateRegister,
  validateLogin,
} from "../middleware/validation.middleware.js";
import {
  register,
  verifyEmail,
  login,
  refresh,
  logout,
  removeUser,
} from "../controllers/auth.controller.js";
import { authMiddleware, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();


router.post("/login", validateLogin, login);
router.get("/verify", verifyEmail);
router.post("/refresh", refresh);

// ADMIN
router.post("/logout", logout);
router.delete("/me", authMiddleware, removeUser);
router.post("/register", authMiddleware, authorize(["ADMIN"]), validateRegister, register); //admin

export default router;
