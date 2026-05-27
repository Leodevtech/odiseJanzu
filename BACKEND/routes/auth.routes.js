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
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/verify", verifyEmail);
router.post("/refresh", refresh);

router.post("/logout", logout);
router.delete("/me", authMiddleware, removeUser);

export default router;
