import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../shared/components/Navbar';
import './Personalizada.css';

export default function Personalizada() {
  const [datos, setDatos] = useState(null);
  const [consejos, setConsejos] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const datosFromStorage = JSON.parse(localStorage.getItem('perfilUsuario'));
    setDatos(datosFromStorage);

    if (datosFromStorage && datosFromStorage.nombre) {
      const newConsejos = generarConsejos(datosFromStorage);
      setConsejos(newConsejos);
    }
  }, []);

  function calcularIMC(peso, altura) {
    const h = altura / 100;
    return (peso / (h * h)).toFixed(1);
  }

  function generarConsejos(datos) {
    const consejos = {
      salud: [],
      nutricion: [],
      belleza: [],
      estilo: [],
      energia: [],
      modales: []
    };

    const imc = calcularIMC(parseFloat(datos.peso), parseFloat(datos.altura));

    if (datos.altura && datos.peso) {
      if (imc < 18.5) {
        consejos.salud.push({ texto: "Tu IMC es bajo (Bajo peso). Considera aumentar calorías de forma saludable.", importante: true });
      } else if (imc >= 18.5 && imc < 25) {
        consejos.salud.push({ texto: "Tu IMC es saludable. ¡Sigue así manteniendo hábitos positivos!", exito: true });
      } else if (imc >= 25 && imc < 30) {
        consejos.salud.push({ texto: "Tu IMC es algo elevado. Actividad física moderada + alimentación balanceada te ayudarán.", importante: true });
      } else {
        consejos.salud.push({ texto: "Tu IMC indica sobrepeso. Consulta a un profesional para un plan personalizado.", importante: true });
      }
    }

    if (datos.objetivos) {
      const objs = datos.objetivos.split(",").map(o => o.trim());
      
      if (objs.includes("Mejorar piel")) {
        consejos.belleza.push({ texto: "Limpia 2x diarias, hidrata según tipo de piel, usa SPF 30+ diario" });
        if (datos.tipo_piel === "Seca") {
          consejos.belleza.push({ texto: "Usa cremas ricas en ácido hialurónico y ceramidas" });
        } else if (datos.tipo_piel === "Grasa") {
          consejos.belleza.push({ texto: "Elige productos oil-free, exfolia 2x/semana, usa niacinamida" });
        }
      }
      
      if (objs.includes("Mejorar cabello")) {
        if (datos.tipo_cabello === "Liso") {
          consejos.belleza.push({ texto: "Usa champú sin siliconas, mascarilla 1x/semana, evita aceites pesados" });
        } else if (datos.tipo_cabello === "Ondulado") {
          consejos.belleza.push({ texto: "Define ondas con crema sin sulfatos, seca con difusor" });
        } else if (datos.tipo_cabello === "Rizado") {
          consejos.belleza.push({ texto: "Hidrata profundamente 2x/semana, técnica plopping, evita el calor" });
        } else if (datos.tipo_cabello === "Afro") {
          consejos.belleza.push({ texto: "Hidratación intensiva, aceites naturales, cuidado con el calor" });
        }
      }
      
      if (objs.includes("Ganar peso")) {
        consejos.nutricion.push({ texto: "Come 300-500 calorías extra al día en alimentos nutritivos" });
        consejos.nutricion.push({ texto: "Aumenta proteína, frutos secos, aguacate, aceite de oliva" });
      }
      
      if (objs.includes("Perder grasa")) {
        consejos.nutricion.push({ texto: "Déficit calórico de 300-500 calorías" });
        consejos.nutricion.push({ texto: "Aumenta proteína, prioriza vegetales, reduce ultraprocesados" });
      }
      
      if (objs.includes("Tonificar")) {
        consejos.energia.push({ texto: "Entrena fuerza 3-4 veces/semana con cargas progresivas" });
        consejos.energia.push({ texto: "Consume proteína en cada comida (1.6-2g por kg de peso)" });
      }
      
      if (objs.includes("Mejorar energía")) {
        consejos.energia.push({ texto: "Duerme 7-9 horas, mantén horarios regulares" });
        consejos.energia.push({ texto: "Come cada 3-4 horas, evita azúcares simples solos" });
        consejos.nutricion.push({ texto: "Aumenta hierro, vitamina B12, magnesio" });
      }
      
      if (objs.includes("Mejorar postura")) {
        consejos.energia.push({ texto: "Yoga o pilates 2-3 veces/semana" });
        consejos.energia.push({ texto: "Fortalece core: planchas, bird-dog, dead-bugs" });
      }
      
      if (objs.includes("Vida más activa")) {
        if (datos.actividad === "Sedentario") {
          consejos.energia.push({ texto: "Comienza con 20 min de caminata diaria, aumenta gradualmente" });
        } else {
          consejos.energia.push({ texto: "Mantén actividad regular: 150 min cardio suave o 75 min intenso" });
        }
      }
      
      if (objs.includes("Alimentación equilibrada")) {
        consejos.nutricion.push({ texto: "Plato ideal: 50% vegetales, 25% proteína, 25% carbohidratos complejos" });
        consejos.nutricion.push({ texto: "Come colores variados en cada comida" });
      }
    }

    if (datos.sueno) {
      const sueno = parseInt(datos.sueno);
      if (sueno < 6) {
        consejos.salud.push({ texto: `Duermes ${sueno}h. Objetivo: 7-9 horas. El sueño es crítico para tu recuperación y piel.`, importante: true });
      } else if (sueno >= 7 && sueno <= 9) {
        consejos.salud.push({ texto: `Excelente: duermes ${sueno}h. Mantén esta consistencia.`, exito: true });
      }
    }

    if (datos.actividad === "Sedentario") {
      consejos.energia.push({ texto: "Actividad baja: comienza con movimiento diario, aunque sea caminar 20 min" });
    } else if (datos.actividad === "Moderado") {
      consejos.energia.push({ texto: "Actividad moderada: buen punto de partida, puedes incrementar intensidad" });
    } else if (datos.actividad === "Activo") {
      consejos.energia.push({ texto: "Eres activa/o: mantén consistencia, varía los ejercicios" });
    } else if (datos.actividad === "Deportista") {
      consejos.energia.push({ texto: "Nivel deportista: prioritiza recuperación, nutrición post-entrenamiento" });
    }

    if (datos.agua === "Menos de 1L") {
      consejos.nutricion.push({ texto: "Bebes muy poca agua. Objetivo: 2-3L diarios para piel y metabolismo", importante: true });
    } else if (datos.agua === "1-2L") {
      consejos.nutricion.push({ texto: "Hidratación básica. Sube a 2-3L para mejorar piel y energía" });
    } else if (datos.agua === "2-3L") {
      consejos.nutricion.push({ texto: "Hidratación ideal. Mantén este hábito.", exito: true });
    } else if (datos.agua === "Más de 3L") {
      consejos.nutricion.push({ texto: "Muy bien hidratado/a. Asegúrate de que sea distribuido a lo largo del día." });
    }

    if (datos.frutas_verduras === "Casi nunca") {
      consejos.nutricion.push({ texto: "Pocas frutas/verduras. Incluye al menos 2 porciones en cada comida", importante: true });
    } else if (datos.frutas_verduras === "Pocas veces") {
      consejos.nutricion.push({ texto: "Aumenta a diario: frutas/verduras son base de salud" });
    } else if (datos.frutas_verduras === "A diario") {
      consejos.nutricion.push({ texto: "Excelente hábito. Continúa así.", exito: true });
    } else if (datos.frutas_verduras === "Múltiples porciones") {
      consejos.nutricion.push({ texto: "Perfecto: nutrición óptima. Mantén esta disciplina.", exito: true });
    }

    if (datos.fuma === "Sí") {
      consejos.salud.push({ texto: "Fumas. Impacta directamente en piel, cabello y energía. Considera reducir o dejar.", importante: true });
    }

    if (datos.bebe === "Sí") {
      consejos.salud.push({ texto: "Consumes alcohol. Modera a 1-2 veces/semana para no afectar hidratación y piel" });
    }

    if (datos.tipo_piel) {
      if (datos.tipo_piel === "Seca") {
        consejos.belleza.push({ texto: "Piel seca: prioriza limpiador suave, crema hidratante densa, serum ácido hialurónico" });
      } else if (datos.tipo_piel === "Grasa") {
        consejos.belleza.push({ texto: "Piel grasa: usa productos oil-free, niacinamida, exfolia 2x/semana" });
      } else if (datos.tipo_piel === "Mixta") {
        consejos.belleza.push({ texto: "Piel mixta: zona T con productos ligeros, mejillas con crema más rica" });
      } else if (datos.tipo_piel === "Sensible") {
        consejos.belleza.push({ texto: "Piel sensible: minimalismo es clave, evita perfumes y químicos fuertes" });
      }
    }

    if (datos.rutina_actual) {
      consejos.belleza.push({ texto: `Tu rutina actual: ${datos.rutina_actual}. Mejora: añade SPF diario y un serum específico` });
    }

    if (datos.tiempo_rutinas === "Sí") {
      consejos.estilo.push({ texto: "Tienes tiempo para rutinas largas. Aprovecha para skincare, yoga o meditación extendida" });
    } else {
      consejos.estilo.push({ texto: "Prefieres rutinas rápidas. Opción: rutina de 5 min con productos multitarea" });
    }

    if (datos.rutinas_rapidas === "Sí") {
      consejos.estilo.push({ texto: "Ideal para ti: BB cream, bálsamo multitarea, secante rápido" });
    }

    if (datos.restricciones) {
      consejos.nutricion.push({ texto: `Tus restricciones: ${datos.restricciones}. Planifica menús alternativos con tu nutriólogo` });
    }

    // MODALES & COMUNICACIÓN
    consejos.modales.push({ texto: "Saluda con una sonrisa y contacto visual: transmite confianza y amabilidad." });
    consejos.modales.push({ texto: "Escucha activamente: haz preguntas breves y no interrumpas; demuestra interés en la otra persona." });
    consejos.modales.push({ texto: "Usa un tono de voz calmado y claro; evita hablar muy alto en ambientes cerrados." });
    consejos.modales.push({ texto: "Postura: mantén espalda recta y hombros relajados; ayuda a transmitir seguridad y mejora respiración." });

    const edadNum = datos.edad ? parseInt(datos.edad) : null;
    if (edadNum && edadNum < 25) {
      consejos.modales.push({ texto: "Practica presentaciones cortas (30s) sobre ti: mejora tu confianza en eventos sociales." });
    } else if (edadNum && edadNum >= 25) {
      consejos.modales.push({ texto: "Mejora tus interacciones profesionales con frases cortas y asertivas: 'Gracias, con gusto lo revisaré'." });
    }

    if (datos.tiempo_rutinas === "Sí") {
      consejos.modales.push({ texto: "Dedica 5-10 minutos diarios a ejercicios de comunicación: practicar tono y dicción." });
    } else {
      consejos.modales.push({ texto: "Si tienes poco tiempo, usa micro-prácticas: 1 diálogo breve al día para mejorar la confianza." });
    }

    const objsAll = (datos.objetivos || "").toLowerCase();
    if (objsAll.includes("mejorar postura") || objsAll.includes("vida más activa")) {
      consejos.modales.push({ texto: "La postura influye en tus modales: añadir estiramientos y conciencia corporal mejora presencia social." });
    }

    consejos.modales.push({ texto: "Frases formales (presentaciones): 'Buenos días, mucho gusto. Soy [tu nombre] y trabajo en [actividad]'." });
    consejos.modales.push({ texto: "Peticiones corteses: 'Disculpe, ¿podría ayudarme con...?' / '¿Le parece bien si...?'" });
    consejos.modales.push({ texto: "Agradecimientos y cierre: 'Muchas gracias por su tiempo' / 'Quedo atento(a) a sus comentarios'" });
    consejos.modales.push({ texto: "Networking sencillo: '¿A qué te dedicas?' / 'Me interesa saber más sobre tu proyecto, ¿puedes contarme?'" });
    consejos.modales.push({ texto: "Postura: mantén la columna neutra, hombros relajados hacia atrás y barbilla paralela al suelo." });
    consejos.modales.push({ texto: "Lenguaje corporal: usa palmas abiertas cuando hablas y mantén contacto visual breve (3-5s)." });
    consejos.modales.push({ texto: "Respiración: inspira por la nariz y exhala por la boca antes de hablar para un tono calmado y controlado." });

    if (datos.estilos) {
      const estilosArr = datos.estilos.split(",").map(e => e.trim());
      if (estilosArr.length > 0) {
        consejos.estilo.push({ texto: `Tu estilo: ${estilosArr.join(", ")}. Busca tutoriales y referentes que alineen con tu belleza natural` });
      }
    }

    if (datos.nivel_maquillaje === "Nada") {
      consejos.belleza.push({ texto: "Prefieres sin maquillaje: prioriza skincare impecable para brillo natural" });
    } else if (datos.nivel_maquillaje === "Poco") {
      consejos.belleza.push({ texto: "Maquillaje natural: BB cream + corrector + pestañas. ¡Lo mejor de ambos mundos!" });
    } else if (datos.nivel_maquillaje === "Completo") {
      consejos.belleza.push({ texto: "Maquillaje completo: asegúrate de desmaquillante eficaz y tratamiento nocturno" });
    }

    if (datos.metas_esteticas) {
      consejos.estilo.push({ texto: `Tu meta estética: ${datos.metas_esteticas}. Plantéalo como hábitos, no como perfección.` });
    }

    return consejos;
  }

  if (!datos || !datos.nombre) {
    return (
      <div className="no-data">
        <h2>No se encontró tu perfil</h2>
        <p>Por favor completa el <a href="formulario.html">formulario</a> primero.</p>
      </div>
    );
  }

  const imc = calcularIMC(parseFloat(datos.peso), parseFloat(datos.altura));
  const resumenHTML = `
    <h3>📊 Tu Resumen</h3>
    <div class="resumen-grid">
      <div class="resumen-item">
        <div class="resumen-label">Edad</div>
        <div class="resumen-valor">${datos.edad} años</div>
      </div>
      <div class="resumen-item">
        <div class="resumen-label">IMC</div>
        <div class="resumen-valor">${imc}</div>
      </div>
      <div class="resumen-item">
        <div class="resumen-label">Género</div>
        <div class="resumen-valor">${datos.genero}</div>
      </div>
      <div class="resumen-item">
        <div class="resumen-label">Actividad</div>
        <div class="resumen-valor">${datos.actividad || 'N/A'}</div>
      </div>
      <div class="resumen-item">
        <div class="resumen-label">Sueño</div>
        <div class="resumen-valor">${datos.sueno || 'N/A'}h</div>
      </div>
      <div class="resumen-item">
        <div class="resumen-label">Objetivos</div>
        <div class="resumen-valor">${(datos.objetivos || 'N/A').split(',').length} marcados</div>
      </div>
    </div>
  `;

  const seccionesOrden = [
    { key: "salud", titulo: "Salud General", emoji: "❤️", clase: "salud" },
    { key: "energia", titulo: "Energía & Fitness", emoji: "⚡", clase: "energia" },
    { key: "nutricion", titulo: "Nutrición", emoji: "🥗", clase: "nutricion" },
    { key: "belleza", titulo: "Belleza & Cuidado", emoji: "💅", clase: "belleza" },
    { key: "estilo", titulo: "Estilo de Vida", emoji: "✨", clase: "estilo" },
    { key: "modales", titulo: "Modales & Comunicación", emoji: "🗣️", clase: "modales" }
  ];

  return (
    <div>
      <Navbar />
      <div className="personalizada-container">
      <header>
        <h1>✨ Tu Perfil Personalizado</h1>
        <p className="header-subtitle">Recomendaciones especiales basadas en tu perfil, <span className="usuario-nombre">{datos.nombre}</span></p>
      </header>

      <div className="main-container">
        <div className="resumen-card" dangerouslySetInnerHTML={{__html: resumenHTML}} />

        <div className="secciones-container">
          {consejos && seccionesOrden.map(({ key, titulo, emoji, clase }) => {
            if (!consejos[key] || consejos[key].length === 0) return null;
            return (
              <div key={key} className={`seccion-card ${clase}`}>
                <h3 className="seccion-title">{emoji} {titulo}</h3>
                <div className="consejos-list">
                  {consejos[key].map((consejo, i) => (
                    <div key={i} className={`consejo ${consejo.importante ? 'importante' : consejo.exito ? 'exito' : ''}`}>
                      {consejo.texto}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <footer>
          <button className="btn-back" onClick={() => navigate('/formulario')}>← Editar mi perfil</button>
          <p>© 2025 Alther | Tu bienestar, tu ciencia 🌱</p>
        </footer>
      </div>
    </div>
    </div>
  );
}
