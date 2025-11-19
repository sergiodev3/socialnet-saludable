import express from 'express';
import { register, login } from './auth.controller.js';
import User from './auth.model.js';
import authMiddleware from '../../shared/middlewares/auth.middleware.js';
import { uploadProfile } from '../../shared/middlewares/upload.middleware.js';

const router = express.Router();

// Ruta para registrar un usuario
router.post('/register', register);

// Ruta para iniciar sesión
router.post('/login', login);

// Ruta para obtener el perfil del usuario autenticado
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el perfil', error: err.message });
  }
});

// Ruta para obtener el perfil de cualquier usuario por su ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el perfil', error: err.message });
  }
});

// Subir o actualizar foto de perfil
// Campo esperado: 'profileImage'
router.put('/profile/photo', authMiddleware, uploadProfile.single('profileImage'), async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    if (!req.file || !req.file.filename) return res.status(400).json({ message: 'No se subió ningún archivo' });

    // Si ya tenía una imagen de perfil anterior en disco, intentar eliminarla
    if (user.profileImage && typeof user.profileImage === 'string' && user.profileImage.includes('/uploads/images-profile/')) {
      try {
        const filenameOld = user.profileImage.split('/uploads/images-profile/')[1];
        const fs = await import('fs');
        const path = await import('path');
        const oldPath = path.join(process.cwd(), 'backend', 'upload', 'images-profile', filenameOld);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      } catch (err) {
        console.warn('No se pudo borrar imagen anterior:', err.message);
      }
    }

    // Guardar la ruta pública en la BD
    user.profileImage = `/uploads/images-profile/${req.file.filename}`;
    await user.save();

    res.json({ message: 'Imagen de perfil actualizada', profileImage: user.profileImage });
  } catch (err) {
    res.status(500).json({ message: 'Error al subir imagen de perfil', error: err.message });
  }
});

export default router;