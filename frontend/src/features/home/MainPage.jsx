import React, { useEffect, useState } from 'react';
import chatImg from '../../assets/img/chat.jpeg';
import paginaImg from '../../assets/img/pagina.jpeg';
import '../../styles/diario.css';
import profileImg from '../../assets/img/perfil.jpeg';

const DiarioSaludable = () => {
    const [publicaciones, setPublicaciones] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [imagen, setImagen] = useState(null);
    const [error, setError] = useState('');

    // Cargar todas las publicaciones al montar
    useEffect(() => {
        fetch('http://localhost:3000/api/v1/posts')
            .then(res => res.json())
            .then(data => setPublicaciones(data))
            .catch(() => setError('Error al cargar publicaciones.'));
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

    return (
        <div>
            {/* NAVBAR */}
            <header className="navbar header">
                <h1>🌿 Diario de Bienestar</h1>
                <p className="frase">"¿Cómo te sentiste hoy? Exprésalo. Libéralo. Ámate."</p>
            </header>

            {/* ICONOS DE NAVEGACIÓN */}
            <div className="iconos">

                <a href="/chat" title="comunicate">
                <img src={chatImg} alt="chat" />
 </a>
                <a href="/pagina" title="Más información">
                    <img src={paginaImg} alt="pagina" />
                </a>
                <a href="/profile" title="tu perfil">
                    <img src={profileImg} alt="profile" />
                    </a>
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
                        {pub.imagen && <img src={pub.imagen} alt="Publicación" className="img-publicacion" />}
                        <p style={{ fontSize: '0.8em', color: '#888' }}>Fecha: {new Date(pub.createdAt).toLocaleString()}</p>
                        <button className="btn-regresar" style={{ marginTop: 10, background: '#ffb3b3', color: '#a00' }} onClick={() => reportar(pub._id)}>
                            Reportar publicación
                        </button>
                    </div>
                ))}
            </main>
        </div>
    );
};

export default DiarioSaludable;
