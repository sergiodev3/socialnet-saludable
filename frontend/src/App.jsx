import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Home from './features/posts/Home';
import PrivateRoute from './shared/components/PrivateRoute';
import MainPage from './features/home/MainPage';
// import Comentarios from './features/home/comentarios.jsx'; // Archivo no existe
import Chat from './features/chat/Chat';
import Profile from './features/profile/Profile';
import Pagina from './features/home/pagina';

function App() {
  return (
    <Router>
      <Routes>
        {/* Página principal ahora es Login */}
        <Route path="/" element={<Login />} />

        {/* Rutas públicas */}
        <Route path="/register" element={<Register />} />

        {/* Página principal después de login */}
        <Route
          path="/main"
          element={
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          }
        />

        {/* Ruta protegida para posts */}
        <Route
          path="/posts"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        {/* Ruta para comentarios */}
        <Route path="/comentarios" element={<div>La página de comentarios no está disponible.</div>} />

        {/* Ruta protegida para chat */}
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />

        {/* Ruta protegida para perfil propio */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        {/* Ruta pública para ver perfil de cualquier usuario */}
        <Route
          path="/profile/:userId"
          element={
            <Profile />
          }
        />

        {/* Ruta pública para la página de salud integral */}
        <Route path="/pagina" element={<Pagina />} />

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;