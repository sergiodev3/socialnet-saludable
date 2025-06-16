import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/publicar.css';
import { getUserFromToken } from '../../shared/hooks/jwt';

const Home = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [imagen, setImagen] = useState(null);
  const [error, setError] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
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

  const handleImagen = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagen(url);
    }
  };

  const publicar = async (e) => {
    e.preventDefault();
    if (mensaje.trim() !== '') {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:3000/api/v1/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ mensaje, imagen }),
        });
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
      <h1>Feed de Publicaciones</h1>
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
                {pub.imagen && <img src={pub.imagen} alt="Publicación" className="img-publicacion" />}
                <p style={{ fontSize: '0.8em', color: '#888' }}>Fecha: {new Date(pub.createdAt).toLocaleString()}</p>
                {user && user.userId === pub.user?._id && (
                  <>
                    <button onClick={() => iniciarEdicion(pub)} style={{ marginTop: 10, background: '#b3d1ff', color: '#003366' }}>Editar</button>
                    <button onClick={() => eliminar(pub._id)} style={{ marginTop: 10, background: '#ffd6d6', color: '#a00' }}>Eliminar</button>
                  </>
                )}
                <button className="btn-regresar" style={{ marginTop: 10, background: '#ffb3b3', color: '#a00' }} onClick={() => reportar(pub._id)}>
                  Reportar publicación
                </button>
              </>
            )}
          </div>
        ))}
      </main>
    </div>
  );
};

export default Home;