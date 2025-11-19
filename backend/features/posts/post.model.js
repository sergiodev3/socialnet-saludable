import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mensaje: { type: String, required: true },
  // Ruta pública a la imagen guardada en disco (por ejemplo: /uploads/images-post/abc.jpg)
  imagen: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);
export default Post;