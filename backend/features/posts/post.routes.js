import express from 'express';
import { createPost, getUserPosts, getAllPosts, reportItem, deletePost, updatePost } from './post.controller.js';
import authMiddleware from '../../shared/middlewares/auth.middleware.js';

const router = express.Router();

// Crear publicación (protegido)
router.post('/', authMiddleware, createPost);
// Obtener publicaciones de un usuario
router.get('/user/:userId', getUserPosts);
// Obtener todas las publicaciones
router.get('/', getAllPosts);
// Reportar usuario o publicación
router.post('/report', authMiddleware, reportItem);
// Eliminar publicación (protegido)
router.delete('/:id', authMiddleware, deletePost);
// Editar publicación (protegido)
router.put('/:id', authMiddleware, updatePost);

export default router;