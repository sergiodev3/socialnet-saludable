import express from 'express';
import { createPost, getUserPosts, getAllPosts, reportItem, deletePost, updatePost } from './post.controller.js';
import authMiddleware from '../../shared/middlewares/auth.middleware.js';
// Usar almacenamiento en disco para guardar archivos en backend/upload/images-post
import { uploadPost } from '../../shared/middlewares/upload.middleware.js';

const router = express.Router();

// Crear publicación (protegido) - acepta un archivo con campo "image"
router.post('/', authMiddleware, uploadPost.single('image'), createPost);
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