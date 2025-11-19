import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('perfilUsuario');
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar-main">
      <div className="navbar-container">
        <Link to="/main" className="navbar-brand">
          <span className="brand-icon">🌿</span>
          <span className="brand-text">Alther</span>
        </Link>

        <div className="navbar-links">
          <Link 
            to="/main" 
            className={`nav-link ${isActive('/main') ? 'active' : ''}`}
            title="Inicio"
          >
            <span className="nav-icon">🏠</span>
            <span className="nav-text">Inicio</span>
          </Link>

          <Link 
            to="/posts" 
            className={`nav-link ${isActive('/posts') ? 'active' : ''}`}
            title="Publicaciones"
          >
            <span className="nav-icon">📝</span>
            <span className="nav-text">Posts</span>
          </Link>

          <Link 
            to="/chat" 
            className={`nav-link ${isActive('/chat') ? 'active' : ''}`}
            title="Chat"
          >
            <span className="nav-icon">💬</span>
            <span className="nav-text">Chat</span>
          </Link>

          <Link 
            to="/Premium" 
            className={`nav-link ${isActive('/Premium') ? 'active' : ''}`}
            title="Premium"
          >
            <span className="nav-icon">✨</span>
            <span className="nav-text">Premium</span>
          </Link>

          <Link 
            to="/profile" 
            className={`nav-link ${isActive('/profile') ? 'active' : ''}`}
            title="Mi Perfil"
          >
            <span className="nav-icon">👤</span>
            <span className="nav-text">Perfil</span>
          </Link>

          {token && (
            <button 
              onClick={handleLogout} 
              className="nav-link logout-btn"
              title="Cerrar Sesión"
            >
              <span className="nav-icon">🚪</span>
              <span className="nav-text">Salir</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
