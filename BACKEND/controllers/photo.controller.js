import fs from 'fs'
import path from 'path'
import { getAllPhotos, createPhoto, deletePhoto, getPhotoById } from '../models/photo.model.js';

// GET /api/photos récup toute les photo public, sur la galerie du site
export const getPhotos = async (req, res) => {
  try {
    const photos = await getAllPhotos()
    res.status(200).json(photos)
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message})
  }
}

// POST /api/photos - upload une photo (protégé ADMIN)
// Le fichier est reçu via multer dans req.file, les infos texte dans req.body 
export const uploadPhoto = async (req, res) => {
  try {
    const { alt, description } = req.body

    if (!req.file) return res.status(400).json({ message: 'Aucun fichier reçu '})
      const filepath = `/uploads/${req.file.filename}` 
      const originalName = req.file.originalname

      await createPhoto(filepath, originalName, alt, description, req.user.id)
      res.status(201).json({ message: 'Photo uploadée avec succès', filepath })
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message })
  }
}

// DELETE /api/photos/:id - supprime les photo de la db et du serveur( protégé ADMIN)
export const removePhoto = async (req, res) => {
  try {
    const photo = await getPhotoById(req.params.id)
    if (!photo) return res.status(404).json({ message: 'Photo introuvable' })
  
    const filepath = path.join(process.cwd(), 'public', photo.filepath)
      if (fs.existsSync(filepath)) fs.unlinkSync(filepath)

        //Supprime l'entrée en db
        await deletePhoto(req.params.id)
        res.status(200).json({ message: 'Photo supprimée'})
    } catch (error) {
      res.status(500).json ({ message: 'Erreur serveur', error: error.message })
    }
}
