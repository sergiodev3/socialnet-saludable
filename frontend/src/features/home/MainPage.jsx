import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../shared/components/Navbar';
import chatImg from '../../assets/img/chat.jpeg';
import paginaImg from '../../assets/img/pagina.jpeg';
import '../../styles/diario.css';
import profileImg from '../../assets/img/perfil.jpeg';

// Función para obtener la URL completa de imágenes
const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http') || imagePath.startsWith('blob:')) return imagePath;
  return `http://localhost:3000${imagePath}`;
};

const DiarioSaludable = () => {
    const [publicaciones, setPublicaciones] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [imagen, setImagen] = useState(null);
    const [error, setError] = useState('');
    const [isPremium, setIsPremium] = useState(false);
    const { getUserFromToken } = { getUserFromToken: () => null }; // placeholder para obtener usuario
    const user = (() => {
      const token = localStorage.getItem('token');
      if (!token) return null;
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload;
      } catch {
        return null;
      }
    })();

    // Cargar todas las publicaciones al montar
    useEffect(() => {
        fetch('http://localhost:3000/api/v1/posts')
            .then(res => res.json())
            .then(data => setPublicaciones(data))
            .catch(() => setError('Error al cargar publicaciones.'));
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
            // Revocar preview anterior si existe para evitar fugas de memoria
            if (imagen && imagen.preview) {
                try { URL.revokeObjectURL(imagen.preview); } catch {}
            }
            const url = URL.createObjectURL(file);
            // Guardar el archivo real en state para enviarlo en FormData y preview en imagen
            setImagen({ file, preview: url });
        }
    };

    // Limpiar objectURL cuando el componente se desmonta o cambia la imagen
    useEffect(() => {
        return () => {
            if (imagen && imagen.preview) {
                try { URL.revokeObjectURL(imagen.preview); } catch {}
            }
        };
    }, [imagen]);

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

    return (
        <div>
            {/* NAVBAR */}
            <Navbar />

            {/* ICONOS DE NAVEGACIÓN */}
            <div className="iconos">

                <Link to="/chat" title="comunicate">
                  <img src={chatImg} alt="chat" loading="lazy" />
                </Link>
                {!isPremium && (
                  <Link to="/Premium" title="Más información">
                      <img src={paginaImg} alt="premium" loading="lazy" />
                  </Link>
                )}
                {isPremium && (
                  <Link to="/formulario" title="Mi Perfil Premium">
                      <img src={paginaImg} alt="premium activo" loading="lazy" style={{border: '3px solid gold', borderRadius: '10px'}} />
                  </Link>
                )}
                <Link to="/profile" title="tu perfil">
                    <img src={profileImg} alt="profile" loading="lazy" />
                </Link>
            </div>

            {/* FORMULARIO DE PUBLICACIÓN */}
            <div className="contenedor">
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
                        <p><b>{pub.user?.username || 'Usuario'}</b></p>
                        <p>{pub.mensaje}</p>
                        {pub.imagen && <img src={getImageUrl(pub.imagen)} alt="Publicación" className="img-publicacion" loading="lazy" />}
                        <p style={{ fontSize: '0.8em', color: '#888' }}>Fecha: {new Date(pub.createdAt).toLocaleString()}</p>
                        {user && user.userId !== pub.user?._id && (
                            <button className="btn-regresar" style={{ marginTop: 10, background: '#ffb3b3', color: '#a00' }} onClick={() => reportar(pub._id)}>
                                Reportar publicación
                            </button>
                        )}
                    </div>
                ))}
            </main>
        </div>
    );
};

export default DiarioSaludable;
