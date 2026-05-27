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

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/photos", photoRoutes);
app.use("/api/site-content", siteContentRoutes);

app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

app.get("/", authMiddleware, authorize(["ADMIN", "USER"]), (req, res) =>
  res.send("Mon API fonctionne bien"),
);

export default app;
