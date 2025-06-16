import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { authRoutes } from './features/auth/index.js';
import { chatRoutes } from './features/chat/index.js';
import postRoutes from './features/posts/post.routes.js';
import authMiddleware from './shared/middlewares/auth.middleware.js';
import errorMiddleware from './shared/middlewares/error.middleware.js';

// Configurar dotenv
dotenv.config();

// Crear la app de Express
const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('backend/uploads'));

// Conexión a la base de datos
connectDB();

// Rutas públicas
app.use('/api/v1/users', authRoutes);

// Rutas de chat (protegidas)
app.use('/api/v1/chat', chatRoutes);

// Rutas de publicaciones
app.use('/api/v1/posts', postRoutes);

// Rutas protegidas (requieren autenticación)
app.get('/api/v1/protected-route', authMiddleware, (req, res) => {
  res.json({ message: 'Acceso permitido', user: req.user });
});

// Middleware de manejo de errores (si algo falla en cualquier ruta)
app.use(errorMiddleware);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});