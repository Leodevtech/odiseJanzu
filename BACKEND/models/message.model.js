import { db } from "../config/db.js";

// Récupère tout les messages par date
export const getAllMessages = async () => {
  const [rows] = await db.query(
    "SELECT * FROM messages ORDER BY created_at DESC",
  );
  return rows;
};

// Récupère message par son id
export const getMessageById = async (id) => {
  const [rows] = await db.query("SELECT * FROM messages WHERE id = ?", [id]);
  return rows[0];
};

// Insère le message dans la db depuis le form
export const createMessage = async (nom, email, message) => {
  const [result] = await db.query(
    "INSERT INTO messages (nom, email, message) VALUES (?, ?, ?)",
    [nom, email, message],
  );
  return result;
};

// Marque un message comme lu
export const markAsRead = async (id) => {
  await db.query("UPDATE messages SET lu = 1 WHERE id = ?", [id]);
};

export const deleteMessage = async (id) => {
  await db.query("DELETE FROM messages WHERE id = ?", [id]);
};
