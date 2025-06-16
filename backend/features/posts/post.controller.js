import Post from './post.model.js';
import mongoose from 'mongoose';

// Modelo para reportes
const reportSchema = new mongoose.Schema({
  type: { type: String, enum: ['usuario', 'publicacion'], required: true },
  reportedId: { type: mongoose.Schema.Types.ObjectId, required: true },
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reason: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Report = mongoose.models.Report || mongoose.model('Report', reportSchema);

// Crear una publicación
export const createPost = async (req, res) => {
  try {
    const { mensaje, imagen } = req.body;
    const userId = req.user.userId;
    const post = await Post.create({ user: userId, mensaje, imagen });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear publicación', error: error.message });
  }
};

// Obtener publicaciones de un usuario
export const getUserPosts = async (req, res) => {
  try {
    const userId = req.params.userId;
    const posts = await Post.find({ user: userId }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener publicaciones', error: error.message });
  }
};

// Obtener todas las publicaciones (opcional)
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).populate('user', 'username');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener publicaciones', error: error.message });
  }
};

// Guardar reporte de usuario o publicación
export const reportItem = async (req, res) => {
  try {
    const { type, reportedId, reason } = req.body;
    const reporter = req.user.userId;
    if (!['usuario', 'publicacion'].includes(type)) {
      return res.status(400).json({ message: 'Tipo de reporte inválido' });
    }
    const report = await Report.create({ type, reportedId, reporter, reason });
    res.status(201).json({ message: 'Reporte guardado', report });
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar reporte', error: error.message });
  }
};

// Eliminar publicación solo si es del usuario autenticado
export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.userId;
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Publicación no encontrada' });
    if (post.user.toString() !== userId) {
      return res.status(403).json({ message: 'No tienes permiso para eliminar esta publicación' });
    }
    await post.deleteOne();
    res.json({ message: 'Publicación eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar publicación', error: error.message });
  }
};

// Editar publicación solo si es del usuario autenticado
export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.userId;
    const { mensaje } = req.body;
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Publicación no encontrada' });
    if (post.user.toString() !== userId) {
      return res.status(403).json({ message: 'No tienes permiso para editar esta publicación' });
    }
    post.mensaje = mensaje;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error al editar publicación', error: error.message });
  }
};