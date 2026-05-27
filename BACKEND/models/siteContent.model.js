import { db } from '../config/db.js'

// Récupère le contenu du site
export const getSiteContent = async () => {
  const [rows] = await db.query('SELECT * FROM site_content LIMIT 1')
  return rows[0]
}

//Maj des textes modifiable depuis dashboard admin

export const updateSiteContent = async (data) => {
  const {
    titre_section1,
    titre_section2,
    titre_lieux1,
    titre_lieux2,
    titre_lieux3,
    titre_lieux4,
  } = data

  await db.query(
  `UPDATE site_content SET
    titre_section1 = ?,
    titre_section2 = ?,
    titre_lieux1 = ?,
    titre_lieux2 = ?,
    titre_lieux3 = ?,
    titre_lieux4 = ?
  WHERE id = 1`,
  [titre_section1, titre_section2, titre_lieux1, titre_lieux2, titre_lieux3, titre_lieux4]
  )
};