import express from "express";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import photoRoutes from "./routes/photo.routes.js";
import siteContentRoutes from "./routes/siteContent.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
import { authMiddleware, authorize } from "./middleware/auth.middleware.js";
import avisRoutes from './routes/avis.routes.js'
import rateLimit from 'express-rate-limit';

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: process.env.CORS,
    credentials: true,
  }),
);

const limiter = rateLimit({ // 15min 100req max par ip
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Trop de requêtes, réessayer plus tard.'}
});
app.use(limiter);

//Routes
app.use('/api/avis', avisRoutes)
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/photos", photoRoutes);
app.use("/api/site-content", siteContentRoutes);

app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

//Privée
app.get("/", authMiddleware, authorize(["ADMIN", "USER"]), (req, res) =>
  res.send("Mon API fonctionne bien"),
);

export default app;
