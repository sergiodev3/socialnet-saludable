import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../shared/components/Navbar';
import '../../styles/chat.css';

// Función para obtener URL completa de imágenes de perfil
const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http') || imagePath.startsWith('blob:')) return imagePath;
  return `http://localhost:3000${imagePath}`;
};

const Chat = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioActivo, setUsuarioActivo] = useState(null);
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const mensajesEndRef = useRef(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  // Obtener el userId del usuario autenticado
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserId(payload.userId);
      } catch {}
    }
  }, []);

  // Cargar usuarios al montar
  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3000/api/v1/chat/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(() => setUsuarios([]));
  }, []);

  // Cargar mensajes cuando cambia el usuario activo
  useEffect(() => {
    if (usuarioActivo) {
      const token = localStorage.getItem('token');
      fetch(`http://localhost:3000/api/v1/chat/messages/${usuarioActivo._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => setMensajes(data))
        .catch(() => setMensajes([]));
    }
  }, [usuarioActivo]);

  // Desplazar al último mensaje
  useEffect(() => {
    mensajesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensajes]);

  // Enviar mensaje
  const enviarMensaje = async (e) => {
    e.preventDefault();
    if (!nuevoMensaje.trim() || !usuarioActivo) return;
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:3000/api/v1/chat/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        destinatarioId: usuarioActivo._id,
        mensaje: nuevoMensaje,
      }),
    });
    if (res.ok) {
      const msg = await res.json();
      setMensajes([...mensajes, msg]);
      setNuevoMensaje('');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="chat-container" style={{position:'relative'}}>
      {/* Lista de usuarios */}
      <aside className="usuarios-lista" style={{position:'relative'}}>
        <button 
          onClick={() => navigate(-1)} 
          style={{
            position: 'absolute', 
            bottom: 12, 
            left: 12, 
            zIndex: 10, 
            background:'#b3d1ff', 
            color:'#003366', 
            borderRadius: '8px',
            padding: '6px 14px',
            fontWeight: 'bold',
            border: 'none',
            boxShadow: '0 2px 8px #bbf7d0',
            cursor: 'pointer'
          }}
        >Regresar</button>
        <h3 style={{textAlign:'center',margin:'16px 0',color:'#15803d'}}>Chats</h3>
        {usuarios.map(u => (
          <div
            key={u._id}
            className={`usuario-item ${usuarioActivo?._id === u._id ? 'activo' : ''}`}
            onClick={() => setUsuarioActivo(u)}
          >
            <img 
              src={getImageUrl(u.profileImage) || '/default-profile.png'} 
              alt={u.username} 
              className="avatar"
              onClick={(e) => {
                e.stopPropagation(); // Evitar que se active el chat
                navigate(`/profile/${u._id}`);
              }}
              style={{ cursor: 'pointer' }}
            />
            <span>{u.username}</span>
          </div>
        ))}
      </aside>

      {/* Ventana de chat */}
      <section className="chat-ventana">
        {usuarioActivo ? (
          <>
            <div className="chat-header">
              <img 
                src={getImageUrl(usuarioActivo.profileImage) || '/default-profile.png'} 
                alt={usuarioActivo.username} 
                className="avatar"
                onClick={() => navigate(`/profile/${usuarioActivo._id}`)}
                style={{ cursor: 'pointer' }}
              />
              <span style={{fontWeight:'bold',fontSize:'1.1em'}}>{usuarioActivo.username}</span>
            </div>
            <div className="chat-mensajes" style={{display:'flex',flexDirection:'column'}}>
              {mensajes.map((msg, i) => (
                <div key={i} className={`mensaje${msg.from === userId ? ' mio' : ''}`}
                  style={{alignSelf: msg.from === userId ? 'flex-end' : 'flex-start',background: msg.from === userId ? '#c8e6c9' : '#e0f7fa'}}>
                  <span>{msg.text}</span>
                  <div className="hora">{new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                </div>
              ))}
              <div ref={mensajesEndRef} />
            </div>
            <form className="chat-input" onSubmit={enviarMensaje} autoComplete="off">
              <input
                type="text"
                placeholder="Escribe un mensaje..."
                value={nuevoMensaje}
                onChange={e => setNuevoMensaje(e.target.value)}
                autoFocus
                maxLength={500}
              />
              <button type="submit">Enviar</button>
            </form>
          </>
        ) : (
          <div className="chat-placeholder">Selecciona un usuario para chatear</div>
        )}
      </section>
      </div>
    </div>
  );
};

export default Chat;