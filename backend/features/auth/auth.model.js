import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Definir el esquema del usuario
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'El nombre de usuario es obligatorio'],
    minlength: [3, 'El nombre de usuario debe tener al menos 3 caracteres'],
    maxlength: [20, 'El nombre de usuario no debe exceder los 20 caracteres']
  },
  email: {
    type: String,
    required: [true, 'El correo electrónico es obligatorio'],
    unique: true,
    match: [/.+@.+\..+/, 'Por favor ingrese un correo válido']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  nombreCompleto: {
    type: String,
    required: false,
    maxlength: [50, 'El nombre completo no debe exceder los 50 caracteres']
  },
  biografia: {
    type: String,
    required: false,
    maxlength: [200, 'La biografía no debe exceder los 200 caracteres']
  },
  telefono: {
    type: String,
    required: false,
    maxlength: [20, 'El teléfono no debe exceder los 20 caracteres']
  }
});

// Middleware para hacer hash del password antes de guardar
userSchema.pre('save', async function (next) {
  // Si el password no ha sido modificado, no lo hasheamos
  if (!this.isModified('password')) return next();

  // Hashear el password
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Método para validar el password
userSchema.methods.isPasswordValid = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Exportar el modelo
const User = mongoose.model('User', userSchema);
export default User;