import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../shared/components/Navbar';
import '../../styles/publicar.css';
import { getUserFromToken } from '../../shared/hooks/jwt';

// Función para obtener la URL completa de imágenes (convierte rutas relativas a URLs absolutas del backend)
const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http') || imagePath.startsWith('blob:')) return imagePath;
  // Si es una ruta relativa como /uploads/..., construir la URL completa del backend
  return `http://localhost:3000${imagePath}`;
};

const Home = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [imagen, setImagen] = useState(null);
  const [error, setError] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const user = getUserFromToken();
  const navigate = useNavigate();

  // Cargar todas las publicaciones al montar y cada 5 segundos
  useEffect(() => {
    const fetchPosts = () => {
      fetch('http://localhost:3000/api/v1/posts')
        .then(res => res.json())
        .then(data => setPublicaciones(data))
        .catch(() => setError('Error al cargar publicaciones.'));
    };
    fetchPosts();
    const interval = setInterval(fetchPosts, 5000);
    return () => clearInterval(interval);
  }, []);

  // Verificar estado premium
  useEffect(() => {
    const checkPremiumStatus = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch('http://localhost:3000/api/v1/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const userData = await response.json();
          setIsPremium(userData.isPremium || false);
        }
      } catch (error) {
        console.error('Error al verificar estado premium:', error);
      }
    };

    checkPremiumStatus();
  }, []);

  const handleImagen = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      // Guardar el archivo real en state para enviarlo en FormData y preview en imagen
      setImagen({ file, preview: url });
    }
  };

  const publicar = async (e) => {
    e.preventDefault();
    if (mensaje.trim() !== '') {
      try {
        const token = localStorage.getItem('token');
        // Si hay imagen, enviar como multipart/form-data
        let res;
        if (imagen && imagen.file) {
          const formData = new FormData();
          formData.append('mensaje', mensaje);
          formData.append('image', imagen.file);
          res = await fetch('http://localhost:3000/api/v1/posts', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          });
        } else {
          // Sin imagen, enviar JSON
          res = await fetch('http://localhost:3000/api/v1/posts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ mensaje }),
          });
        }
        if (!res.ok) throw new Error('Error al publicar');
        const nueva = await res.json();
        setPublicaciones([nueva, ...publicaciones]);
        setMensaje('');
        setImagen(null);
      } catch {
        setError('Error al publicar.');
      }
    }
  };

  const reportar = async (postId) => {
    const motivo = prompt('¿Por qué deseas reportar esta publicación? (Describe el motivo)');
    if (!motivo) return;
    const token = localStorage.getItem('token');
    try {
      await fetch('http://localhost:3000/api/v1/posts/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ type: 'publicacion', reportedId: postId, reason: motivo }),
      });
      alert('¡Gracias por reportar! El equipo revisará esta publicación.');
    } catch {
      alert('Error al reportar.');
    }
  };

  // Eliminar publicación
  const eliminar = async (postId) => {
    const token = localStorage.getItem('token');
    if (!window.confirm('¿Seguro que deseas eliminar esta publicación?')) return;
    try {
      const res = await fetch(`http://localhost:3000/api/v1/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('No autorizado o error al eliminar');
      setPublicaciones(publicaciones.filter((p) => p._id !== postId));
    } catch {
      alert('No se pudo eliminar la publicación.');
    }
  };

  // Editar publicación
  const iniciarEdicion = (pub) => {
    setEditandoId(pub._id);
    setNuevoMensaje(pub.mensaje);
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setNuevoMensaje('');
  };

  const guardarEdicion = async (postId) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:3000/api/v1/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ mensaje: nuevoMensaje }),
      });
      if (!res.ok) throw new Error('Error al editar');
      const actualizado = await res.json();
      setPublicaciones(publicaciones.map((p) => p._id === postId ? actualizado : p));
      cancelarEdicion();
    } catch {
      alert('No se pudo editar la publicación.');
    }
  };

  return (
    <div>
      <Navbar />
      <h1 style={{ textAlign: 'center', color: '#15803d', marginTop: '1rem' }}>Feed de Publicaciones</h1>
      {/* FORMULARIO DE PUBLICACIÓN */}
      <div className="publicar-form-contenedor">
        <h2>💬 ¿Cómo te sentiste hoy?</h2>
        <form onSubmit={publicar}>
          <textarea
            placeholder="Escribe algo que quieras compartir..."
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            required
          />
          <input type="file" accept="image/*" onChange={handleImagen} />
          <button type="submit">Publicar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      {/* FEED DE PUBLICACIONES */}
      <main className="feed">
        {publicaciones.length === 0 && <p>No hay publicaciones aún.</p>}
        {publicaciones.map((pub, i) => (
          <div key={pub._id || i} className="publicacion">
            <p>
              <b>{pub.user?.username || 'Usuario'}</b>
            </p>
            {editandoId === pub._id ? (
              <>
                <textarea value={nuevoMensaje} onChange={e => setNuevoMensaje(e.target.value)} />
                <button onClick={() => guardarEdicion(pub._id)} style={{background:'#b3ffb3', color:'#006600'}}>Guardar</button>
                <button onClick={cancelarEdicion} style={{background:'#ffd6d6', color:'#a00'}}>Cancelar</button>
              </>
            ) : (
              <>
                <p>{pub.mensaje}</p>
                {pub.imagen && <img src={getImageUrl(pub.imagen)} alt="Publicación" className="img-publicacion" />}
                <p style={{ fontSize: '0.8em', color: '#888' }}>Fecha: {new Date(pub.createdAt).toLocaleString()}</p>
                {user && user.userId === pub.user?._id && (
                  <>
                    <button onClick={() => iniciarEdicion(pub)} style={{ marginTop: 10, background: '#b3d1ff', color: '#003366' }}>Editar</button>
                    <button onClick={() => eliminar(pub._id)} style={{ marginTop: 10, background: '#ffd6d6', color: '#a00' }}>Eliminar</button>
                  </>
                )}
                {user && user.userId !== pub.user?._id && (
                  <button className="btn-regresar" style={{ marginTop: 10, background: '#ffb3b3', color: '#a00' }} onClick={() => reportar(pub._id)}>
                    Reportar publicación
                  </button>
                )}
              </>
            )}
          </div>
        ))}
      </main>
      {!isPremium && (
        <button onClick={() => navigate('/Premium')} className="btn-premium">
          Hazte Premium ✨
        </button>
      )}
      {isPremium && (
        <button onClick={() => navigate('/formulario')} className="btn-premium" style={{background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', color: '#1a1a1a'}}>
          Mi Perfil Premium ⭐
        </button>
      )}
    </div>
  );
};

export default Home;