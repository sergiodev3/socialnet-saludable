import User from './auth.model.js';
import jwt from 'jsonwebtoken';

// Controlador para registrar un usuario
export const register = async (req, res) => {
  const { username, email, password, nombreCompleto, biografia, telefono } = req.body;

  // Validar correo institucional
  const emailRegex = /^[a-zA-Z0-9._%+-]+@cbtis258\.edu\.mx$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Solo se permiten correos institucionales que terminen en @cbtis258.edu.mx' });
  }

  try {
    // Verificar si el correo ya está en uso
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo ya está en uso' });
    }

    // Crear el nuevo usuario
    const newUser = await User.create({ username, email, password, nombreCompleto, biografia, telefono });

    res.status(201).json({ message: 'Usuario registrado con éxito', user: { id: newUser._id, username, email } });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
  }
};

// Controlador para iniciar sesión
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar el usuario por correo
    const user = await User.findOne({ email });
    if (!user || !(await user.isPasswordValid(password))) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Crear el token JWT
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
};

// Controlador para activar premium
export const activatePremium = async (req, res) => {
  try {
    const userId = req.user.userId;
    
    // Buscar el usuario
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar si ya es premium
    if (user.isPremium) {
      return res.status(400).json({ message: 'El usuario ya tiene suscripción premium activa' });
    }

    // Activar premium
    user.isPremium = true;
    user.premiumActivatedAt = new Date();
    await user.save();

    res.status(200).json({ 
      message: 'Suscripción premium activada con éxito',
      user: { 
        id: user._id, 
        username: user.username, 
        isPremium: user.isPremium,
        premiumActivatedAt: user.premiumActivatedAt 
      } 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al activar premium', error: error.message });
  }
};