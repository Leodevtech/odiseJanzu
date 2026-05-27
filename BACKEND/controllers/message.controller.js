import {
  getAllMessages,
  getMessageById,
  createMessage,
  markAsRead,
  deleteMessage
} from '../models/message.model.js'

//GET /api/messages - récup tous les messages(protégé admin)
export const getMessages = async (req, res) => {
  try {
    const messages = await getAllMessages()
    res.status(200).json(messages)
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message })
  }
}

export const getMessage = async (req, res) => {
  try {
    const message = await getMesssageById(req.params.id)
    if (!message) return res.status(404).json({
      message: 'Message introuvable' })
      res.status(200).json(message)
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message })
  }
}

//(public) POST /api/messages
export const sendMessage = async (req, res) => {
  try {
    const { nom, email, message } = req.body;
    await createMessage(nom, email, message);
    res.status(201).json({ message: "Message envoyé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

//(admin) PATCH /api/messages/:id/lu - marque comme lu
export const readMessage = async (req, res) => {
  try {
    await markAsRead(req.params.id);
    res.status(200).json({ message: "Message marqué comme lu " });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

//(admin) DELETE /api/messages/:id
export const removeMessage = async (req, res) => {
  try {
    await deleteMessage(req.params.id);
    res.status(200).json({ message: "Message supprimé " });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
