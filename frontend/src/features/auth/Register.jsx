import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', nombreCompleto: '', biografia: '', telefono: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validar correo institucional antes de enviar al backend
    const emailRegex = /^[a-zA-Z0-9._%+-]+@cbtis258\.edu\.mx$/;
    if (!emailRegex.test(formData.email)) {
      setError('Solo se permiten correos institucionales que terminen en @cbtis258.edu.mx');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/v1/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al registrar');
      }

      // Redirige automáticamente al login y muestra mensaje de éxito
      navigate('/login', { state: { registered: true } });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1 style={{ display: 'none' }}>Registro</h1> {/* Oculta el h1 para mantener la estructura, pero el diseño lo maneja el contenedor */}
      <div className="contenedor">
        <h1>Registro</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="nombreCompleto"
            placeholder="Nombre completo"
            value={formData.nombreCompleto}
            onChange={handleChange}
          />
          <input
            type="text"
            name="biografia"
            placeholder="Biografía"
            value={formData.biografia}
            onChange={handleChange}
          />
          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={handleChange}
          />
          <button type="submit">Registrarse</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default Register;