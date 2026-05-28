import { db } from '../config/db.js'

// récup tout les avis actifs et affiche en public
export const getAvisActifs = async () => {
  const [rows] = await db.query(
    'SELECT * FROM avis WHERE actif = 1 ORDER BY created_at DESC'
  )
  return rows
}

// récup tout les avis (actif + masqués) -dash admin
export const getAllAvis = async () => {
  const [rows] = await db.query(
    'SELECT * FROM avis ORDER BY created_at DESC'
  )
  return rows
}

// Ajoute un nouvel avis depuis le dashboard
export const createAvis = async (data) => {
  const { nom, contenu } = data
  const [result] = await db.query(
    'INSERT INTO avis (nom, contenu) VALUES (?, ?)',
    [nom, contenu]
  )
  return result
}

// Active ou masque un avis (0/1)
export const toggleAvisActif = async (id, actif) => {
  await db.query(
    'UPDATE avis SET actif = ? WHERE id = ?',
    [actif, id]
  )
}

// Supprime un avis définitivement
export const deleteAvis = async (id) => {
  await db.query('DELETE FROM avis WHERE id = ?', [id])
}