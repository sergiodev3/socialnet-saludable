import React from "react";
import { Link } from 'react-router-dom';
import Navbar from '../../shared/components/Navbar';

export default function PersonalizacionInfo() {
  return (
    <div style={styles.body}>
      <Navbar />
      <header style={styles.header}>
        <h1 style={styles.h1}>Información Personalizada Alther ✨</h1>
      </header>

      <div style={styles.contenedor}>
        
        {/* --- Sección 1 --- */}
        <div style={styles.seccion}>
          <h2 style={styles.h2}>¿Qué es la información personalizada?</h2>
          <p style={styles.p}>
            Es un sistema creado para darte <b>consejos únicos</b>, adaptados
            exactamente a tu cuerpo, tu horario, tu ritmo y tus objetivos.
            Nada genérico. Nada reciclado.  
            Es tu mapa, tu manual, tu pequeña brújula hecha a medida.
          </p>

          <div style={styles.tarjeta}>
            <p style={styles.p}>
              Como una voz suave que te dice:<br />
              <i>“Esto eres tú. Esto es lo que necesitas. 
              Esto te llevará a tu mejor versión.”</i>
            </p>
          </div>
        </div>

        {/* --- Sección 2 --- */}
        <div style={styles.seccion}>
          <h2 style={styles.h2}>¿Qué considera para crear tus recomendaciones?</h2>
          <p style={styles.p}>Para darte consejos de piel, cabello, cuerpo y estilo de vida, analizamos:</p>

          <div style={styles.tarjeta}>
            <p>• Tu tipo de cuerpo (ecto, meso o endomorfo).</p>
            <p>• Tu tipo de rostro.</p>
            <p>• Tu tipo de cabello.</p>
            <p>• Tus horarios reales.</p>
            <p>• Tu objetivo (subir masa, mejorar piel, energía, etc.).</p>
            <p>• Tu comodidad y estilo personal.</p>
          </div>
        </div>

        {/* --- Sección 3 --- */}
        <div style={styles.seccion}>
          <h2 style={styles.h2}>¿Qué recibirás exactamente?</h2>

          <div style={styles.tarjeta}>
            <p>✓ Consejos para cuidar tu cabello según tu tipo.</p>
            <p>✓ Rutina de piel adaptada a tu rostro.</p>
            <p>✓ Alimentos que tu cuerpo realmente necesita.</p>
            <p>✓ Hábitos según tu horario natural.</p>
            <p>✓ Recomendaciones para lograr tu objetivo.</p>
            <p>✓ Una guía clara, simple y hecha solo para ti.</p>
          </div>
        </div>

        {/* --- Sección 4 --- */}
        <div style={styles.seccion}>
          <h2 style={styles.h2}>¿Cómo comenzar?</h2>
          <p style={styles.p}>
            Primero registras tu tarjeta para activar la función premium.  
            Luego llenas un formulario guiado por una mini IA que te ayuda a elegir
            correctamente lo que describe tu cuerpo y tus hábitos.  
            Finalmente recibes tu página personalizada.
          </p>
        </div>

        <Link to="/tarjeta" style={styles.boton}>
          Comenzar la Activación Premium 💳
        </Link>
      </div>

      <footer style={styles.footer}>
        © 2025 Alther — Tu bienestar, tu ciencia.
      </footer>
    </div>
  );
}

// 🎨 Estilos convertidos a JS
const styles = {
  body: {
    margin: 0,
    fontFamily: "'Poppins', sans-serif",
    background: "#f6f1e7",
    color: "#433f3c",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "3rem",
    textAlign: "center",
  },

  header: {
    width: "100%",
    background: "#fff",
    padding: "1rem",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },

  h1: {
    margin: 0,
    fontWeight: 600,
    color: "#3c3a37",
  },

  h2: {
    color: "#3c3a37",
    marginBottom: "0.5rem",
  },

  p: {
    lineHeight: "1.6",
    color: "#5b5855",
  },

  contenedor: {
    marginTop: "2rem",
    width: "90%",
    maxWidth: "900px",
    background: "#fff",
    padding: "2rem",
    borderRadius: "20px",
    boxShadow: "0 5px 25px rgba(0,0,0,0.1)",
  },

  seccion: {
    marginBottom: "2rem",
    textAlign: "left",
  },

  tarjeta: {
    background: "#faf7f2",
    padding: "1rem",
    borderLeft: "5px solid #c7a77b",
    borderRadius: "10px",
    marginTop: "1rem",
  },

  boton: {
    display: "inline-block",
    marginTop: "2rem",
    padding: "1rem 2rem",
    background: "#c7a77b",
    color: "#fff",
    borderRadius: "12px",
    textDecoration: "none",
    fontSize: "1.2rem",
    transition: "0.2s",
  },

  footer: {
    marginTop: "3rem",
    fontSize: "0.85rem",
    color: "#6d6a67",
  }
};