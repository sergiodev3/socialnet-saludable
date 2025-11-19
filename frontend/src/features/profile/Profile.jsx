import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../shared/components/Navbar';

// Función para obtener la URL completa de imágenes
const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http') || imagePath.startsWith('blob:')) return imagePath;
  return `http://localhost:3000${imagePath}`;
};

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [success, setSuccess] = useState('');
  const [posts, setPosts] = useState([]);
  const [fotoPreview, setFotoPreview] = useState(null);
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      let id = userId;
      let token = localStorage.getItem('token');
      if (!id) {
        // Si no hay userId en la URL, mostrar el perfil propio
        if (!token) {
          setError('No autenticado');
          return;
        }
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          id = payload.userId;
        } catch (err) {
          setError('Token inválido');
          return;
        }
      }
      try {
        // Obtener datos del usuario
        const resUser = await fetch(`http://localhost:3000/api/v1/users/${id}`);
        if (!resUser.ok) throw new Error('No se pudo cargar el usuario');
        const userData = await resUser.json();
        setUser(userData);
        setNewUsername(userData.username);
        // Cargar publicaciones del usuario
        const res = await fetch(`http://localhost:3000/api/v1/posts/user/${id}`);
        if (res.ok) {
          const data = await res.json();
          setPosts(data);
        }
      } catch (err) {
        setError('No se pudo cargar el perfil');
      }
    };
    fetchUser();
  }, [userId]);

  const handleEdit = () => {
    setEditMode(true);
    setSuccess('');
  };

  const handleCancel = () => {
    setEditMode(false);
    setNewUsername(user.username);
    setSuccess('');
  };

  const handleSave = async () => {
    setError('');
    setSuccess('');
    const token = localStorage.getItem('token');
    try {
      // Llama a tu backend para actualizar el username
      const res = await fetch(`http://localhost:3000/api/v1/users/${user.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username: newUsername }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Error al actualizar');
      }
      setUser({ ...user, username: newUsername });
      setEditMode(false);
      setSuccess('Nombre de usuario actualizado correctamente');
    } catch (err) {
      setError(err.message);
    }
  };

  // Manejar cambio de foto de perfil
  const handleFotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFotoPreview(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append('profileImage', file);
    const token = localStorage.getItem('token');
    try {
      // Enviar a la nueva ruta que espera 'profileImage' y guarda la ruta pública
      const res = await fetch(`http://localhost:3000/api/v1/users/profile/photo`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) throw new Error('Error al subir la foto');
      const data = await res.json();
      // Backend devuelve profileImage (ruta pública)
      setUser({ ...user, profileImage: data.profileImage || data.profileImage });
      setSuccess('Foto de perfil actualizada');
    } catch (err) {
      setError('No se pudo subir la foto');
    }
  };

  // Botón para reportar usuario
  const reportarUsuario = async () => {
    const motivo = prompt('¿Por qué deseas reportar este usuario? (Describe el motivo)');
    if (!motivo) return;
    const token = localStorage.getItem('token');
    try {
      await fetch('http://localhost:3000/api/v1/posts/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ type: 'usuario', reportedId: user.userId, reason: motivo }),
      });
      alert('¡Gracias por reportar! El equipo revisará este usuario.');
    } catch {
      alert('Error al reportar.');
    }
  };

  // Botón para reportar publicación
  const reportarPublicacion = async (postId) => {
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

  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>Cargando perfil...</div>;

  // Verificar si es el perfil del usuario autenticado
  let token = localStorage.getItem('token');
  let currentUserId = null;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      currentUserId = payload.userId;
    } catch (err) {
      console.error('Error decodificando token');
    }
  }
  const isOwnProfile = currentUserId === user._id;

  // Mostrar los nuevos campos del usuario
  return (
    <div>
      <Navbar />
      <div className="contenedor" style={{ marginTop: '2rem' }}>
      <h1 style={{ textAlign: 'center', color: '#15803d' }}>Perfil de usuario</h1>
      {/* Botón para reportar usuario - solo si es otro usuario */}
      {!isOwnProfile && (
        <button className="btn-regresar" style={{background:'#ffb3b3', color:'#a00', marginBottom:20}} onClick={reportarUsuario}>Reportar usuario</button>
      )}
      {/* Foto de perfil */}
      <div style={{marginBottom:20}}>
        <strong>Foto de perfil:</strong><br />
        <img
          src={getImageUrl(fotoPreview || user.profileImage || '/default-profile.png')}
          alt="Foto de perfil"
          style={{maxWidth:120, borderRadius:'50%', boxShadow:'0 2px 8px #bbf7d0'}}
        /><br />
        <input type="file" accept="image/*" onChange={handleFotoChange} />
      </div>
      {editMode ? (
        <>
          <label>
            <strong>Nombre de usuario:</strong>
            <input
              type="text"
              value={newUsername}
              onChange={e => setNewUsername(e.target.value)}
            />
          </label>
          <button onClick={handleSave}>Guardar</button>
          <button onClick={handleCancel}>Cancelar</button>
        </>
      ) : (
        <>
          <p><strong>Nombre de usuario:</strong> {user.username}</p>
          <button onClick={handleEdit}>Editar nombre</button>
        </>
      )}
      <p><strong>ID de usuario:</strong> {user.userId}</p>
      {user.nombreCompleto && <p><strong>Nombre completo:</strong> {user.nombreCompleto}</p>}
      {user.biografia && <p><strong>Biografía:</strong> {user.biografia}</p>}
      {user.telefono && <p><strong>Teléfono:</strong> {user.telefono}</p>}
      <h2>Mis publicaciones</h2>
      {posts.length === 0 && <p>No tienes publicaciones aún.</p>}
      <div className="feed">
        {posts.map((pub, i) => {
          const reportarPublicacion = async () => {
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
                body: JSON.stringify({ type: 'publicacion', reportedId: pub._id, reason: motivo }),
              });
              alert('¡Gracias por reportar! El equipo revisará esta publicación.');
            } catch {
              alert('Error al reportar.');
            }
          };
          return (
            <div key={pub._id || i} className="publicacion">
              <p>{pub.mensaje}</p>
              {pub.imagen && <img src={getImageUrl(pub.imagen)} alt="Publicación" className="img-publicacion" />}
              <p style={{fontSize:'0.8em',color:'#888'}}>Fecha: {new Date(pub.createdAt).toLocaleString()}</p>
              {!isOwnProfile && (
                <button className="btn-regresar" style={{marginTop:10, background:'#ffb3b3', color:'#a00'}} onClick={reportarPublicacion}>Reportar publicación</button>
              )}
            </div>
          );
        })}
      </div>
      {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      </div>
    </div>
  );
};

export default Profile;
