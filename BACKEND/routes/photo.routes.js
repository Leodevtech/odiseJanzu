import express from 'express'
import multer from 'multer'
import path from 'path'
import { getPhotos, uploadPhoto, removePhoto } from '../controllers/photo.controller.js'
import { authMiddleware, authorize } from '../middleware/auth.middleware.js'

const router = express.Router()

//Config multer

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/')
  },
  // Renomme le fichier avec un timestamp pour éviter les doublons
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `${Date.now()}${ext}`)
  }
})

// Filtre pour les image (jpeg,png,webp)
const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp']
  allowed.includes(file.mimetype) ? cb(null, true) : cb(new Error('Format non supporté'))
}

const upload = multer({ storage, fileFilter })

// Route public -galerie du site affiche en public
  router.get('/', getPhotos)


//Routes protégées - admin
  router.post('/', authMiddleware, authorize(['ADMIN']), upload.single('photo'), uploadPhoto)
  router.delete('/:id', authMiddleware, authorize(['ADMIN']), removePhoto)

  export default router