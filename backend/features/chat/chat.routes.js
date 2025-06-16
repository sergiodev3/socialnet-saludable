import express from 'express';
import { getUsers, getMessages, sendMessage } from './chat.controller.js';
import authMiddleware from '../../shared/middlewares/auth.middleware.js';

const router = express.Router();

// Obtener todos los usuarios excepto el autenticado
router.get('/users', authMiddleware, getUsers);

// Obtener mensajes entre el usuario autenticado y otro usuario
router.get('/messages/:to', authMiddleware, getMessages);

// Enviar mensaje
router.post('/messages', authMiddleware, sendMessage);

export default router;
