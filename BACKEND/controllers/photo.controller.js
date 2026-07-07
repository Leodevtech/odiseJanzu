import FormData from 'form-data'
import fetch from 'node-fetch'
import { getAllPhotos, createPhoto, deletePhoto, getPhotoById } from '../models/photo.model.js'

// Variables d'environnement Cloudflare
const CF_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID
const CF_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN

// URLs des APIs Cloudflare
const CF_IMAGES_URL = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/images/v1`
const CF_STREAM_URL = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/stream`

// Détecte si le fichier est une vidéo selon le mimetype
const isVideo = (mimetype) => mimetype.startsWith('video/')

// GET /api/photos — récup toutes les photos/vidéos publiques, sur la galerie du site
export const getPhotos = async (req, res) => {
  try {
    const photos = await getAllPhotos()
    res.status(200).json(photos)
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message })
  }
}

// POST /api/photos — upload une photo ou vidéo (protégé ADMIN)
// Le fichier est reçu via multer en memoryStorage dans req.file.buffer
// Envoyé à Cloudflare Images (photo) ou Cloudflare Stream (vidéo) selon le mimetype
export const uploadPhoto = async (req, res) => {
  try {
    const { alt, description } = req.body

    if (!req.file) return res.status(400).json({ message: 'Aucun fichier reçu' })

    const fileIsVideo = isVideo(req.file.mimetype)
    const originalName = req.file.originalname
    let cloudflareUrl = ''
    let cloudflareId = ''

    if (fileIsVideo) {
      // Upload vers Cloudflare Stream
      const formData = new FormData()
      formData.append('file', req.file.buffer, {
        filename: originalName,
        contentType: req.file.mimetype,
      })

      const response = await fetch(CF_STREAM_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${CF_API_TOKEN}`,
          ...formData.getHeaders(),
        },
        body: formData,
      })

      const data = await response.json()

      if (!response.ok || !data.result) {
        console.error('Erreur Cloudflare Stream:', data)
        return res.status(500).json({ message: 'Erreur upload vidéo Cloudflare', error: data.errors })
      }

      // Stream retourne un uid et une URL de lecture
      cloudflareId = data.result.uid
      cloudflareUrl = `https://videodelivery.net/${cloudflareId}/manifest/video.m3u8`

    } else {
      // Upload vers Cloudflare Images
      const formData = new FormData()
      formData.append('file', req.file.buffer, {
        filename: originalName,
        contentType: req.file.mimetype,
      })

      const response = await fetch(CF_IMAGES_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${CF_API_TOKEN}`,
          ...formData.getHeaders(),
        },
        body: formData,
      })

      const data = await response.json()

      if (!response.ok || !data.result) {
        console.error('Erreur Cloudflare Images:', data)
        return res.status(500).json({ message: 'Erreur upload image Cloudflare', error: data.errors })
      }

      // Images retourne une URL directe et un id
      cloudflareId = data.result.id
      cloudflareUrl = data.result.variants[0]
    }

    // Sauvegarde en DB — filepath = URL Cloudflare, type = 'image' ou 'video'
    await createPhoto(cloudflareUrl, originalName, alt, description, req.user.id, cloudflareId, fileIsVideo ? 'video' : 'image')
    res.status(201).json({ message: 'Média uploadé avec succès', url: cloudflareUrl })

  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message })
  }
}

// DELETE /api/photos/:id — supprime le média sur Cloudflare et en DB (protégé ADMIN)
export const removePhoto = async (req, res) => {
  try {
    const photo = await getPhotoById(req.params.id)
    if (!photo) return res.status(404).json({ message: 'Photo introuvable' })

    const fileIsVideo = photo.type === 'video'

    // Supprime sur Cloudflare selon le type (Images ou Stream)
    const deleteUrl = fileIsVideo
      ? `${CF_STREAM_URL}/${photo.cloudflare_id}`
      : `${CF_IMAGES_URL}/${photo.cloudflare_id}`

    const response = await fetch(deleteUrl, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${CF_API_TOKEN}`,
      },
    })

    if (!response.ok) {
      const data = await response.json()
      console.error('Erreur suppression Cloudflare:', data)
      // On continue quand même pour supprimer l'entrée en DB
    }

    // Supprime l'entrée en DB
    await deletePhoto(req.params.id)
    res.status(200).json({ message: 'Média supprimé' })

  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message })
  }
}