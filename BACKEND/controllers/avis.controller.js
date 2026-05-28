import {
  getAvisActifs,
  getAllAvis,
  createAvis,
  toggleAvisActif,
  deleteAvis
} from '../models/avis.model.js'

// Route publique — avis actifs pour le carousel 
export const getPublicAvis = async (req, res) => {
  try {
    const avis = await getAvisActifs()
    res.status(200).json(avis)
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message })
  }
}

// Route admin — tous les avis pour le dashboard
export const getAdminAvis = async (req, res) => {
  try {
    const avis = await getAllAvis()
    res.status(200).json(avis)
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message })
  }
}

// Route admin — ajoute un avis
export const addAvis = async (req, res) => {
  try {
    await createAvis(req.body)
    res.status(201).json({ message: 'Avis ajouté avec succès' })
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message })
  }
}

// Route admin — active ou masque un avis
export const patchAvisActif = async (req, res) => {
  try {
    const { actif } = req.body
    await toggleAvisActif(req.params.id, actif)
    res.status(200).json({ message: 'Avis mis à jour' })
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message })
  }
}

// Route admin — supprime un avis définitivement
export const removeAvis = async (req, res) => {
  try {
    await deleteAvis(req.params.id)
    res.status(200).json({ message: 'Avis supprimé' })
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message })
  }
}