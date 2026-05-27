import { db } from "../config/db.js";

export const getAllPhotos = async () => {
  const [rows] = await db.query(
    "SELECT * FROM photos ORDER BY uploaded_at DESC",
  );
  return rows;
};

export const createPhoto = async (
  filepath,
  originalName,
  alt,
  description,
  userId,
) => {
  const [result] = await db.query(
    "INSERT INTO photos (filepath, original_name, alt, description, user_id) VALUES (?, ?, ?, ?, ?)",
    [filepath, originalName, alt, description, userId],
  );
  return result;
};

export const deletePhoto = async (id) => {
  await db.query("DELETE FROM photos WHERE id = ?", [id]);
};

export const getPhotoById = async (id) => {
  const [rows] = await db.query("SELECT * FROM photos WHERE id = ?", [id]);
  return rows[0];
};
