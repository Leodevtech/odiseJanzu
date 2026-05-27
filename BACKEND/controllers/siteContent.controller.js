import { getSiteContent, updateSiteContent } from '../models/siteContent.model.js'

export const getContent = async (req, res) => {
  try {
    const content = await getSiteContent()
    res.status(200).json(content)
  } catch (error) {
    res.status(500).json ({ message: 'Erreur serveur', error: error.message })
  }
}

export const updateContent = async (req, res) => {
  try {
    await updateSiteContent(req.body)
    res.status(200).json ({ message: 'Contenu mis a jour avec succès'})
  } catch (error) {
    res.status(500).json ({ message: 'Erreur serveur', error: error.message})
  }
}