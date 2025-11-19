import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './login.css'; // Ruta corregida
import Logo from '../../assets/img/Logo.png';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al iniciar sesión');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      window.dispatchEvent(new Event('storage'));
      navigate('/main'); // Redirige a la página de chat después de login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      {/* Encabezado */}
      <header>
        <div style={{ textAlign: 'center', padding: '10px' }}>
          <img src={Logo} alt="Logo Bienestar" style={{ maxHeight: '80px' }} />
        </div>
      </header>
      <br />
      <br />
      <br />
      {/* Formulario */}
      <div className="contenedor">
        <h1>Iniciar sesión</h1>
        {/* Mensaje de éxito tras registro */}
        {location.state?.registered && (
          <p style={{ color: 'green' }}>¡Registro exitoso! Ahora puedes iniciar sesión.</p>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Correo institucional"
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
          <button type="submit">Iniciar sesión</button>
        </form>
        {/* Botón para ir a registro */}
        <p style={{ marginTop: '20px' }}>
          ¿Aún no tienes cuenta?{' '}
          <button type="button" style={{ background: 'none', color: '#2c7a3d', border: 'none', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => navigate('/register')}>
            Regístrate
          </button>
        </p>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: '#333', color: 'white', padding: '20px 0', textAlign: 'center', marginTop: '40px' }}>
        <div>
          <p>Contacto<br />
            Teléfono: 8132619143 Email: delzocorromerry@gmail.com</p>
          <p>Síguenos<br />
            <a href="#" style={{ color: '#4caf50' }}>Facebook</a>{' '}
            <a href="#" style={{ color: '#4caf50' }}>Twitter</a>{' '}
            <a href="#" style={{ color: '#4caf50' }}>Instagram</a>
          </p>
          <p>&copy; 2024 Bienestar. Todos los derechos reservados. <br />
            <a href="#">Política de privacidad</a> | <a href="#">Términos de servicio</a></p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
