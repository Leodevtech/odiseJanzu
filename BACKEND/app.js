import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

// Routes
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import photoRoutes from "./routes/photo.routes.js";
import siteContentRoutes from "./routes/siteContent.routes.js";
import avisRoutes from "./routes/avis.routes.js";

// Middleware
import { authMiddleware, authorize } from "./middleware/auth.middleware.js";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── CONFIGURATION ──
// Fait confiance au proxy Vercel pour lire la vraie IP client via X-Forwarded-For
app.set("trust proxy", 1);

// ── MIDDLEWARE GLOBAUX ──
// Parse les cookies httpOnly (refreshToken)
app.use(cookieParser());
// Parse le body JSON des requêtes
app.use(express.json());

// CORS — autorise uniquement le frontend défini dans .env
app.use(
  cors({
    origin: process.env.CORS,
    credentials: true,
  }),
);

// Rate limiting — max 100 requêtes par IP par 15 minutes
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { error: "Trop de requêtes, réessayez plus tard." },
  }),
);

// ── FICHIERS STATIQUES ──
// Sert les images uploadées depuis public/uploads
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// ── ROUTES PUBLIQUES ──
app.use("/api/auth", authRoutes);
app.use("/api/site-content", siteContentRoutes);
app.use("/api/photos", photoRoutes);
app.use("/api/avis", avisRoutes);
app.use("/api/messages", messageRoutes);

// ── ROUTE TEST PRIVÉE ──
app.get("/", authMiddleware, authorize(["ADMIN", "USER"]), (req, res) =>
  res.send("Mon API fonctionne bien"),
);

export default app;
