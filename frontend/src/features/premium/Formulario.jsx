import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../../shared/components/Navbar';
import "./Formulario.css";

const PerfilPremium = () => {
  const [sueno, setSueno] = useState(7);
  const navigate = useNavigate();

  const [aiOpen, setAiOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState([]);
  const [aiInput, setAiInput] = useState("");

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [aiMessages]);

  const toggleAi = () => {
    setAiOpen(prev => !prev);
    if (!aiOpen && aiMessages.length === 0) {
      addBotMessage("¡Hola! 🌿 Soy Alther, tu asistente personal. Estoy aquí para ayudarte a completar tu perfil. ¿Hay algo en lo que pueda asistirte?");
    }
  };

  const addUserMessage = (msg) => setAiMessages(prev => [...prev, { type: "user", text: msg }]);
  const addBotMessage = (msg) => setAiMessages(prev => [...prev, { type: "bot", text: msg }]);

  const handleAiSend = () => {
    const text = aiInput.trim();
    if (!text) return;
    addUserMessage(text);
    setAiInput("");
    setTimeout(() => respond(text), 300);
  };

  const respond = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes("nombre")) return addBotMessage("¡Genial! Usa el campo 'Nombre' en la primera sección para ingresarlo. Es un dato importante para personalizarte mejor.");
    if (lower.includes("edad")) return addBotMessage("La edad nos ayuda a personalizar recomendaciones. Ingresa en el campo 'Edad' de la primera sección.");
    if (lower.includes("peso") || lower.includes("altura")) return addBotMessage("Peso y altura son fundamentales para calcular tu IMC y darte recomendaciones precisas. Ingrénsalos en la primera sección.");
    if (lower.includes("objetivo") || lower.includes("meta")) return addBotMessage("Tienes muchas opciones en la sección 'Objetivo Principal'. Puedes marcar varias. Si tu meta es especial, también hay un campo 'Otro'.");
    if (lower.includes("sueño") || lower.includes("dormir")) return addBotMessage("El sueño es crucial. En 'Rutina Diaria' hay un deslizador para indicar tus horas de sueño promedio. Lo ideal es 7-8 horas.");
    if (lower.includes("actividad")) return addBotMessage("Hay 4 niveles: Sedentario, Moderado, Activo y Deportista. Elige el que mejor describe tu rutina.");
    if (lower.includes("agua") || lower.includes("hidratación")) return addBotMessage("La hidratación es clave. En 'Rutina Diaria' puedes indicar cuánta agua bebes. Lo recomendado es 2-3L diarios.");
    if (lower.includes("piel") || lower.includes("cabello")) return addBotMessage("En 'Cuidado Personal' puedes indicar el tipo de piel, cabello y productos que usas. Esto nos ayuda a recomendarte mejor.");
    if (lower.includes("estilo") || lower.includes("maquillaje")) return addBotMessage("En 'Preferencias Estéticas' selecciona tu estilo (cute, elegante, etc.) y nivel de maquillaje. ¡Esto hace tu perfil único!");
    if (lower.includes("restricción") || lower.includes("alergia") || lower.includes("vegetariano")) return addBotMessage("En 'Estilo de Vida' hay un campo para restricciones dietéticas. Es importante para personalizarte sin riesgos.");
    if (lower.includes("enviar") || lower.includes("continuar")) return addBotMessage("Cuando termines, presiona el botón '✨ Generar mi Personalización' al final. ¡Eso enviará tu perfil!");
    if (lower.includes("ayuda") || lower.includes("help")) return addBotMessage("Puedo ayudarte con cualquier pregunta sobre:\n• Datos personales\n• Objetivos\n• Rutina diaria\n• Cuidado personal\n• Preferencias estéticas\n\n¿Hay algo específico que necesites?");
    return addBotMessage("Interesante... 😊 Si tienes dudas sobre el formulario o necesitas ayuda, cuéntame qué campo te genera duda. Estoy aquí para facilitarte todo.");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const objetivos = Array.from(formData.getAll("objetivos")).join(", ");
    const estilos = Array.from(formData.getAll("estilos")).join(", ");

    const datos = Object.fromEntries(formData);
    datos.objetivos = objetivos;
    datos.estilos = estilos;

    localStorage.setItem("perfilUsuario", JSON.stringify(datos));

    navigate("/personalizada");
  };

  return (
    <div>
      <Navbar />
      <div className="form-container">
      <h1>🌿 Perfil Personalizado Alther</h1>
      <p className="subtitle">Completa tu perfil para recibir recomendaciones personalizadas</p>

      <form id="perfilForm" onSubmit={handleSubmit}>

        {/* SECCIÓN 1: DATOS BASE */}
        <div className="form-card">
          <div className="card-title">📋 Datos Base</div>
          <label>Nombre</label>
          <input type="text" name="nombre" placeholder="Tu nombre..." required />
          <label>Edad</label>
          <input type="number" name="edad" min="13" max="120" placeholder="Ej. 25" required />
          <label>Altura (cm)</label>
          <input type="number" name="altura" min="100" max="250" placeholder="Ej. 165" required />
          <label>Peso (kg)</label>
          <input type="number" name="peso" min="30" max="300" step="0.1" placeholder="Ej. 62" required />
          <label>Género</label>
          <div className="radio-group">
            <div className="radio-item">
              <input type="radio" id="fem" name="genero" value="Femenino" required />
              <label htmlFor="fem">Femenino</label>
            </div>
            <div className="radio-item">
              <input type="radio" id="masc" name="genero" value="Masculino" required />
              <label htmlFor="masc">Masculino</label>
            </div>
          </div>
        </div>

        {/* SECCIÓN 2: OBJETIVO PRINCIPAL */}
        <div className="form-card">
          <div className="card-title">🎯 Objetivo Principal (Selecciona los que apliquen)</div>
          <div className="checkbox-group">
            {["Mejorar piel","Mejorar cabello","Ganar peso","Perder grasa","Tonificar","Mejorar energía","Mejorar postura","Vida más activa","Alimentación equilibrada","Otro"].map((obj,i) => (
              <div className="checkbox-item" key={i}>
                <input type="checkbox" id={`obj${i+1}`} name="objetivos" value={obj} />
                <label htmlFor={`obj${i+1}`}>{obj}</label>
              </div>
            ))}
          </div>
          <label>Si seleccionaste "Otro", cuéntanos:</label>
          <textarea name="otro_objetivo" placeholder="Tu objetivo personalizado..."></textarea>
        </div>

        {/* SECCIÓN 3: RUTINA DIARIA */}
        <div className="form-card">
          <div className="card-title">🌙 Rutina Diaria</div>
          <label>Horas de sueño promedio</label>
          <div className="slider-container">
            <input type="range" id="sueno" name="sueno" min="3" max="12" value={sueno} onChange={(e) => setSueno(e.target.value)} />
            <div className="range-value">Durmiendo <strong>{sueno}</strong> horas</div>
          </div>

          <label>Nivel de actividad</label>
          <select name="actividad" required>
            <option value="">Selecciona...</option>
            <option value="Sedentario">Sedentario (poco movimiento)</option>
            <option value="Moderado">Moderado (actividad ocasional)</option>
            <option value="Activo">Activo (ejercicio regular)</option>
            <option value="Deportista">Deportista (ejercicio intenso)</option>
          </select>

          <label>Consumo de agua diaria</label>
          <select name="agua" required>
            <option value="">Selecciona...</option>
            <option value="Menos de 1L">Menos de 1L</option>
            <option value="1-2L">1-2L</option>
            <option value="2-3L">2-3L</option>
            <option value="Más de 3L">Más de 3L</option>
          </select>

          <label>Consumo de frutas/verduras</label>
          <select name="frutas_verduras" required>
            <option value="">Selecciona...</option>
            <option value="Casi nunca">Casi nunca</option>
            <option value="Pocas veces">Pocas veces por semana</option>
            <option value="A diario">A diario</option>
            <option value="Múltiples porciones">Múltiples porciones diarias</option>
          </select>

          <label>¿Fumas?</label>
          <div className="radio-group">
            <div className="radio-item">
              <input type="radio" id="fuma_si" name="fuma" value="Sí" required />
              <label htmlFor="fuma_si">Sí</label>
            </div>
            <div className="radio-item">
              <input type="radio" id="fuma_no" name="fuma" value="No" required />
              <label htmlFor="fuma_no">No</label>
            </div>
          </div>

          <label>¿Bebes alcohol?</label>
          <div className="radio-group">
            <div className="radio-item">
              <input type="radio" id="bebe_si" name="bebe" value="Sí" required />
              <label htmlFor="bebe_si">Sí</label>
            </div>
            <div className="radio-item">
              <input type="radio" id="bebe_no" name="bebe" value="No" required />
              <label htmlFor="bebe_no">No</label>
            </div>
          </div>
        </div>

        {/* SECCIÓN 4: CUIDADO PERSONAL */}
        <div className="form-card">
          <div className="card-title">💅 Cuidado Personal Actual</div>
          <label>Tipo de piel</label>
          <select name="tipo_piel" required>
            <option value="">Selecciona...</option>
            <option value="Seca">Seca</option>
            <option value="Grasa">Grasa</option>
            <option value="Mixta">Mixta</option>
            <option value="Normal">Normal</option>
            <option value="Sensible">Sensible</option>
          </select>

          <label>Tipo de cabello</label>
          <select name="tipo_cabello" required>
            <option value="">Selecciona...</option>
            <option value="Liso">Liso</option>
            <option value="Ondulado">Ondulado</option>
            <option value="Rizado">Rizado</option>
            <option value="Afro">Afro</option>
            <option value="Mixto">Mixto</option>
          </select>

          <label>Rutina actual (describe tu rutina diaria de cuidado)</label>
          <textarea name="rutina_actual" placeholder="Ej: Limpio con agua, hidrató con crema..."></textarea>

          <label>Productos que usas (marcas, tipos, etc.)</label>
          <textarea name="productos_usa" placeholder="Ej: Crema marca X, sérum marca Y..."></textarea>
        </div>

        {/* SECCIÓN 5: ESTILO DE VIDA */}
        <div className="form-card">
          <div className="card-title">⏰ Estilo de Vida</div>
          <label>¿Tienes tiempo para rutinas largas?</label>
          <div className="radio-group">
            <div className="radio-item">
              <input type="radio" id="tiempo_si" name="tiempo_rutinas" value="Sí" required />
              <label htmlFor="tiempo_si">Sí</label>
            </div>
            <div className="radio-item">
              <input type="radio" id="tiempo_no" name="tiempo_rutinas" value="No" required />
              <label htmlFor="tiempo_no">No</label>
            </div>
          </div>

          <label>¿Prefieres rutinas rápidas?</label>
          <div className="radio-group">
            <div className="radio-item">
              <input type="radio" id="rapidas_si" name="rutinas_rapidas" value="Sí" required />
              <label htmlFor="rapidas_si">Sí</label>
            </div>
            <div className="radio-item">
              <input type="radio" id="rapidas_no" name="rutinas_rapidas" value="No" required />
              <label htmlFor="rapidas_no">No</label>
            </div>
          </div>

          <label>¿Tienes restricciones de alimentos? (alergias, vegetariano, etc.)</label>
          <textarea name="restricciones" placeholder="Cuéntanos cualquier restricción dietética..."></textarea>
        </div>

        {/* SECCIÓN 6: PREFERENCIAS ESTÉTICAS */}
        <div className="form-card">
          <div className="card-title">✨ Preferencias Estéticas</div>
          <label>Estilo preferido</label>
          <div className="checkbox-group">
            {["Cute","Elegante","Minimalista","Natural","Glam","Otro"].map((est,i) => (
              <div className="checkbox-item" key={i}>
                <input type="checkbox" id={`est${i+1}`} name="estilos" value={est} />
                <label htmlFor={`est${i+1}`}>{est}</label>
              </div>
            ))}
          </div>

          <label>Nivel de maquillaje preferido</label>
          <select name="nivel_maquillaje" required>
            <option value="">Selecciona...</option>
            <option value="Nada">Nada / Sin maquillaje</option>
            <option value="Poco">Poco / Natural</option>
            <option value="Completo">Completo / Full makeup</option>
          </select>

          <label>Metas estéticas personales</label>
          <textarea name="metas_esteticas" placeholder="Describe tus metas de belleza y estética..."></textarea>

          <button type="submit" className="btn-submit">✨ Generar mi Personalización</button>
        </div>

      </form>

      {/* MINI IA */}
      <button className="ai-bubble-btn" onClick={toggleAi} title="Abrir asistente" aria-label="Abrir asistente">🤖</button>
      {aiOpen && (
        <div className="ai-window">
          <div className="ai-header">🌿 Alther - Mini IA</div>
          <div className="ai-messages">
            {aiMessages.map((msg, i) => (
              <div key={i} className={`msg ${msg.type}`}>{msg.text}</div>
            ))}
            <div ref={messagesEndRef}></div>
          </div>
          <div className="ai-input-area">
            <input
              value={aiInput}
              onChange={e => setAiInput(e.target.value)}
              onKeyPress={e => e.key === "Enter" && handleAiSend()}
              placeholder="Escribe aquí..."
              aria-label="Mensaje al asistente"
            />
            <button type="button" onClick={handleAiSend}>Enviar</button>
          </div>
        </div>
      )}

    </div>
    </div>
  );
};

export default PerfilPremium;