import express from "express";
import multer from "multer";
import { getPhotos, uploadPhoto, removePhoto } from "../controllers/photo.controller.js";
import { authMiddleware, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

// Config multer — memoryStorage : fichier en RAM, jamais écrit sur disque
const storage = multer.memoryStorage();

// Filtre pour les images ET vidéos
const fileFilter = (req, file, cb) => {
  const allowed = [
    // Images
    "image/jpeg",
    "image/png",
    "image/webp",
    // Vidéos
    "video/mp4",
    "video/quicktime", // .mov
    "video/webm",
  ];
  allowed.includes(file.mimetype) ? cb(null, true) : cb(new Error("Format non supporté"));
};

// Limite de taille : 10MB pour les images, 500MB pour les vidéos
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB max
});

// Route publique — galerie du site
router.get("/", getPhotos);

// Routes protégées — admin
router.post("/", authMiddleware, authorize(["ADMIN"]), upload.single("photo"), uploadPhoto);
router.delete("/:id", authMiddleware, authorize(["ADMIN"]), removePhoto);

export default router;
