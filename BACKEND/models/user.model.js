import { db } from "../config/db.js";

//create User
export const createUser = async (
  username,
  passwordHash,
  verifyToken,
  role = "USER",
) => {
  const [result] = await db.query(
    "INSERT INTO users (username, password_hash, verify_token, role) VALUES (?, ? , ? , ? )",
    [username, passwordHash, verifyToken, role],
  );

  return result.insertId;
};

// login trouver un user par son username
export const findUserByUsername = async (username) => {
  const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [
    username,
  ]);
  return rows[0];
};

//trouver par son id(utilisé au refresh token)
export const findUserById = async (id) => {
  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  return rows[0];
};

export const findUserByVerifyToken = async (token) => {
  const [rows] = await db.query("SELECT * FROM users WHERE verify_token=?", [token]);
  return rows[0];
};

export const verifyUser = async (userId) => {
  await db.query(
    "UPDATE users SET is_verified=1 , verify_token=NULL WHERE id= ?",
    [userId],
  );
};

export const findUserByResetToken = async (token) => {
  const [rows] = await db.query("SELECT * FROM users WHERE reset_token=?", [
    token,
  ]);
  return rows[0];
};

export const deleteUser = async (userId) => {
  const [result] = await db.query("DELETE FROM users WHERE id = ?", [userId]);
  return result.affectedRows; // retourne 1 si supprimé, 0 si user introuvable
};
