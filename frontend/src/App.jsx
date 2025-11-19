import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Home from './features/posts/Home';
import PrivateRoute from './shared/components/PrivateRoute';
import MainPage from './features/home/MainPage';
// import Comentarios from './features/home/comentarios.jsx'; // Archivo no existe
import Chat from './features/chat/Chat';
import Profile from './features/profile/Profile';
import Premium from './features/home/pagina';
import Tarjeta from './features/premium/Tarjeta';
import Formulario from './features/premium/Formulario';
import Personalizada from './features/premium/Personalizada';


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
        <Route path="/Premium" element={<Premium />} />

        {/* Ruta para Tarjeta */}
        <Route path="/tarjeta" element={<Tarjeta />} />

        {/* Ruta para Formulario */}
        <Route path="/formulario" element={<Formulario />} />

        {/* Ruta para Personalizada */}
        <Route path="/personalizada" element={<Personalizada />} />

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;