import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { v4 as uuid4 } from "uuid";
import "dotenv/config";
import { db } from "../config/db.js";
import {
  createUser,
  findUserByUsername,
  findUserByVerifyToken,
  findUserById,
  verifyUser,
  deleteUser,
} from "../models/user.model.js";
import { sendVerificationMail } from "../config/mailer.js";

const isProduction = process.env.NODE_ENV === "production";

const COOKIE_OPTIONS = {
  httpOnly: true,
  //(protection XSS) inccaessible au JS du nav
  secure: process.env.NODE_ENV === "production",
  sameSite: "none",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  // 7jours en millisecondes
};

//Génère les deux tokens acessToken court(15min) + refreshToken(7j)
function generateTokens(payload) {
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
}

// créé un user
export const register = async (req, res) => {
  try {
    const { username, password, role = "USER" } = req.body;

    const existing = await findUserByUsername(username);
    if (existing) return res.status(400).json({ message: "Déja utilisé " });

    const passwordHash = await argon2.hash(password);
    const verifyToken = uuid4();

    await createUser(username, passwordHash, verifyToken, role);

    await sendVerificationMail(username, verifyToken);

    res
      .status(201)
      .json({ message: "Compte créé, veuillez vérifier votre mail", username });
  } catch (error) {
    res.status(500).json({ message: "erreur serveur ", error: error.message });
  }
};

// verifier le compte de l'user
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const user = await findUserByVerifyToken(token);
    if (!user) return res.status(400).json({ message: "Token invalide " });
    await verifyUser(user.id);
    res.status(200).json({ message: "Votre compte a bien été vérifié !" });
  } catch (error) {
    res.status(500).json({ message: "erreur serveur ", error: error.message });
  }
};

// connexion
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await findUserByUsername(username);
    if (!user)
      return res
        .status(400)
        .json({ message: "Identifiant ou mot de passe incorrect" });

    if (!user.is_verified)
      return res.status(403).json({ message: "Compte non vérifié" });

    const valid = await argon2.verify(user.password_hash, password);
    if (!valid)
      return res
        .status(400)
        .json({ message: "Identifiant ou mot de passe incorrect" });

    // Payload embarqué dans les tokens
    const payload = { id: user.id, username: user.username, role: user.role };
    const { accessToken, refreshToken } = generateTokens(payload);

    res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
    res.cookie('sessions', '1', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    // accessToken renvoyé dans le body — stocké en mémoire JS côté front
    return res.status(200).json({ accessToken });
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// POST /api/auth/refresh génère un accesToken depuis le refreshToken en cookie
export const refresh = async (req, res) => {
  console.log("Cookie reçu:", req.cookies); // a supprimer --------
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken)
      return res.status(401).json({ message: "Refresh token manquant " });
    let payload;
    try {
      payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch {
      return res
        .status(401)
        .json({ message: "Refresh token invalide ou expiré" });
    }
    const user = await findUserById(payload.id);
    if (!user)
      return res.status(401).json({ message: "Utilisateur introuvable" });
    const newPayload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };
    const { accessToken, refreshToken: newRefreshToken } =
      generateTokens(newPayload);

    res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS);
    res.cookie('session', '1', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// POST /api/auth/logout supprime le cookie refreshToken pour déco
export const logout = async (req, res) => {
  res.clearCookie("refreshToken", COOKIE_OPTIONS);
  res.clearCookie('session', {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
  })
  res.json({ message: "Déconnecté" });
};

// DELETE /api/auth/me supprime le compte connecter(suicide)
export const removeUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const deleted = await deleteUser(userId);

    if (deleted === 0) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    res.status(200).json({ message: "Compte supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
