import express from "express";
import {
  getMessages,
  getMessage,
  sendMessage,
  readMessage,
  removeMessage,
} from "../controllers/message.controller.js";
import { authMiddleware, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

//route publique form
router.post("/", sendMessage);

// Routes protégée admin
router.get("/", authMiddleware, authorize(["ADMIN"]), getMessages);
router.get("/:id", authMiddleware, authorize(["ADMIN"]), getMessage);
router.patch("/:id/lu", authMiddleware, authorize(["ADMIN"]), readMessage);
router.delete("/:id", authMiddleware, authorize(["ADMIN"]), removeMessage);

export default router;
