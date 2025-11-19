import Message from './chat.model.js';
import User from '../auth/auth.model.js';

// Obtener todos los usuarios excepto el autenticado
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user.userId } }, 'username _id profileImage');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
  }
};

// Obtener mensajes entre dos usuarios
export const getMessages = async (req, res) => {
  const { userId } = req.user;
  const { to } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { from: userId, to },
        { from: to, to: userId }
      ]
    }).sort('createdAt');
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener mensajes', error: error.message });
  }
};

// Enviar mensaje
export const sendMessage = async (req, res) => {
  const { userId } = req.user;
  // Cambia aquí para aceptar los nombres del frontend
  const { destinatarioId, mensaje } = req.body;
  try {
    const message = await Message.create({ from: userId, to: destinatarioId, text: mensaje });
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Error al enviar mensaje', error: error.message });
  }
};