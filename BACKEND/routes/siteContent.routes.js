import express from "express";
import {
  getContent,
  updateContent,
} from "../controllers/siteContent.controller.js";
import { authMiddleware, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getContent);

router.put("/", authMiddleware, authorize(["ADMIN"]), updateContent);

export default router;
