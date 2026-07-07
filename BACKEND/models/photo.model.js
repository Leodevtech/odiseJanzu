import { db } from "../config/db.js";

export const getAllPhotos = async () => {
  const [rows] = await db.query(
    "SELECT * FROM photos ORDER BY uploaded_at DESC",
  );
  return rows;
};

// Ajout de cloudflare_id et type (image/vidéo) pour gérer Cloudflare Images + Stream
export const createPhoto = async (
  filepath,
  originalName,
  alt,
  description,
  userId,
  cloudflareId,
  type,
) => {
  const [result] = await db.query(
    "INSERT INTO photos (filepath, original_name, alt, description, user_id, cloudflare_id, type) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [filepath, originalName, alt, description, userId, cloudflareId, type],
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
