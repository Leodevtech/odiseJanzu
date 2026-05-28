import express from 'express'
import {
  getPublicAvis,
  getAdminAvis,
  addAvis,
  patchAvisActif,
  removeAvis
} from '../controllers/avis.controller.js'
import { authMiddleware, authorize } from '../middleware/auth.middleware.js'

const router = express.Router()

// Route publique
router.get('/public', getPublicAvis)

// Routes protégées 
router.get('/', authMiddleware, authorize(['ADMIN']), getAdminAvis)
router.post('/', authMiddleware, authorize(['ADMIN']), addAvis)
router.patch('/:id/actif', authMiddleware, authorize(['ADMIN']), patchAvisActif)
router.delete('/:id', authMiddleware, authorize(['ADMIN']), removeAvis)

export default router