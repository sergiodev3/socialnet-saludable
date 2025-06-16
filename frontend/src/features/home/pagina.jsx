import React, { useState } from 'react';
import '../../styles/pagina.css';

const SECTIONS = [
  { id: 'inicio', label: 'Inicio', icon: '🏠' },
  { id: 'fisica', label: 'Salud Física', icon: '💪' },
  { id: 'mental', label: 'Salud Mental', icon: '🧠' },
  { id: 'nutricion', label: 'Nutrición', icon: '🥗' },
  { id: 'calculadoras', label: 'Calculadoras', icon: '📊' },
  { id: 'emergencias', label: 'Emergencias', icon: '🚨' },
  { id: 'prevencion', label: 'Prevención', icon: '🛡️' },
];

const Pagina = () => {
  const [activeSection, setActiveSection] = useState('inicio');
  // Calculadoras states
  const [bmi, setBmi] = useState('');
  const [bmiResult, setBmiResult] = useState('');
  const [caloriesResult, setCaloriesResult] = useState('');
  const [hydrationResult, setHydrationResult] = useState('');
  const [wellbeing, setWellbeing] = useState({ mood: 5, stress: 5, sleep: 5, result: '' });

  // --- Calculadoras ---
  const calculateBMI = (e) => {
    e.preventDefault();
    const weight = parseFloat(e.target.weight.value);
    const height = parseFloat(e.target.height.value) / 100;
    if (!weight || !height) {
      setBmiResult('Por favor, ingresa peso y altura válidos.');
      return;
    }
    const bmi = weight / (height * height);
    let category = '';
    let color = '';
    if (bmi < 18.5) { category = 'Bajo peso'; color = '#3498db'; }
    else if (bmi < 25) { category = 'Peso normal'; color = '#27ae60'; }
    else if (bmi < 30) { category = 'Sobrepeso'; color = '#f39c12'; }
    else { category = 'Obesidad'; color = '#e74c3c'; }
    setBmiResult(<div style={{color}}><strong>Tu IMC es: {bmi.toFixed(1)}</strong><br/>Categoría: {category}</div>);
  };

  const calculateCalories = (e) => {
    e.preventDefault();
    const age = parseInt(e.target.age.value);
    const gender = e.target.gender.value;
    const weight = parseFloat(e.target.weightCalories.value);
    const height = parseFloat(e.target.heightCalories.value);
    const activity = parseFloat(e.target.activityCalories.value);
    if (!age || !weight || !height) {
      setCaloriesResult('Por favor, completa todos los campos.');
      return;
    }
    let bmr;
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
    const totalCalories = bmr * activity;
    setCaloriesResult(<span><strong>Calorías diarias recomendadas: {Math.round(totalCalories)}</strong><br/><small>Metabolismo basal: {Math.round(bmr)} calorías</small></span>);
  };

  const calculateHydration = (e) => {
    e.preventDefault();
    const weight = parseFloat(e.target.weightHydration.value);
    const activity = e.target.activityLevel.value;
    if (!weight) {
      setHydrationResult('Por favor, ingresa tu peso.');
      return;
    }
    let baseWater = weight * 35;
    let multiplier = 1;
    if (activity === 'light') multiplier = 1.2;
    else if (activity === 'moderate') multiplier = 1.4;
    else if (activity === 'intense') multiplier = 1.6;
    const totalWater = baseWater * multiplier;
    const glasses = Math.round(totalWater / 250);
    setHydrationResult(<span><strong>Necesitas aproximadamente:</strong><br/>{Math.round(totalWater)} ml de agua al día<br/><small>Equivale a {glasses} vasos de agua (250ml c/u)</small></span>);
  };

  const updateWellbeing = (field, value) => {
    const newState = { ...wellbeing, [field]: Number(value) };
    // Calcular puntuación
    const score = Math.round((newState.mood + (11 - newState.stress) + newState.sleep) / 3);
    let status = '';
    let color = '';
    if (score >= 8) { status = 'Excelente bienestar mental'; color = '#27ae60'; }
    else if (score >= 6) { status = 'Buen bienestar mental'; color = '#f39c12'; }
    else if (score >= 4) { status = 'Bienestar mental regular - considera técnicas de relajación'; color = '#e67e22'; }
    else { status = 'Considera buscar apoyo profesional'; color = '#e74c3c'; }
    newState.result = <div style={{color}}><strong>Puntuación: {score}/10</strong><br/>{status}</div>;
    setWellbeing(newState);
  };

  // --- Renderizado de secciones ---
  return (
    <div className="container">
      <button className="boton-regresar" onClick={() => window.history.back()}>
        ← Regresar
      </button>
      <br /><br />
      <br />
      <header>
        <h1>🏥 Portal de Salud Integral</h1>
        <p className="subtitle">Tu guía completa para una vida saludable</p>
      </header>
      <nav>
        <div className="nav-buttons">
          {SECTIONS.map(sec => (
            <button
              key={sec.id}
              className={`nav-btn${activeSection === sec.id ? ' active' : ''}`}
              onClick={() => setActiveSection(sec.id)}
            >
              {sec.icon} {sec.label}
            </button>
          ))}
        </div>
      </nav>
      {/* INICIO */}
      <div className={`content-section${activeSection === 'inicio' ? ' active' : ''}`}>
        <h2>Bienestar hacia uno mismo</h2>
        <p>La salud es nuestro bien más preciado. Este portal te ofrece información completa, herramientas útiles y consejos prácticos para mantener y mejorar tu bienestar en todas sus dimensiones.</p>
        <div className="card-grid">
          <div className="health-card">
            <h3>🏃‍♂️ Salud Física</h3>
            <p>Ejercicio, fitness, cuidado corporal y actividad física para mantener tu cuerpo en óptimas condiciones.</p>
          </div>
          <div className="health-card">
            <h3>🧘‍♀️ Salud Mental</h3>
            <p>Bienestar emocional, manejo del estrés, técnicas de relajación y salud psicológica.</p>
          </div>
          <div className="health-card">
            <h3>🍎 Nutrición</h3>
            <p>Alimentación balanceada, dietas saludables y consejos nutricionales para tu bienestar.</p>
          </div>
          <div className="health-card">
            <h3>📈 Calculadoras</h3>
            <p>Herramientas para calcular IMC, calorías, hidratación y otros indicadores de salud.</p>
          </div>
        </div>
      </div>
      {/* SALUD FISICA */}
      <div className={`content-section${activeSection === 'fisica' ? ' active' : ''}`}>
        <h2>💪 Salud Física</h2>
        <h3>Ejercicio y Actividad Física</h3>
        <p>La actividad física regular es fundamental para mantener un cuerpo sano y fuerte. Se recomienda al menos 150 minutos de ejercicio moderado por semana.</p>
        <div className="card-grid">
          <div className="health-card">
            <h3>🏃‍♂️ Ejercicio Cardiovascular</h3>
            <ul className="tips-list">
              <li>Caminar 30 minutos diarios</li>
              <li>Correr 3 veces por semana</li>
              <li>Nadar o hacer ciclismo</li>
              <li>Bailar o hacer aeróbicos</li>
            </ul>
          </div>
          <div className="health-card">
            <h3>🏋️‍♀️ Fortalecimiento</h3>
            <ul className="tips-list">
              <li>Ejercicios con pesas</li>
              <li>Flexiones y abdominales</li>
              <li>Yoga y pilates</li>
              <li>Ejercicios de resistencia</li>
            </ul>
          </div>
        </div>
        <h3>Cuidado Corporal</h3>
        <div className="health-card">
          <h3>Rutina Diaria de Cuidado</h3>
          <ul className="tips-list">
            <li>Dormir 7-9 horas diarias</li>
            <li>Mantener buena postura</li>
            <li>Hacer estiramientos regulares</li>
            <li>Cuidar la higiene personal</li>
            <li>Protegerse del sol</li>
          </ul>
        </div>
      </div>
      {/* SALUD MENTAL */}
      <div className={`content-section${activeSection === 'mental' ? ' active' : ''}`}>
        <h2>🧠 Salud Mental</h2>
        <p>La salud mental es tan importante como la física. Incluye nuestro bienestar emocional, psicológico y social.</p>
        <div className="card-grid">
          <div className="health-card">
            <h3>😌 Manejo del Estrés</h3>
            <ul className="tips-list">
              <li>Técnicas de respiración profunda</li>
              <li>Meditación diaria</li>
              <li>Ejercicio regular</li>
              <li>Organizar el tiempo</li>
              <li>Hablar con amigos y familia</li>
            </ul>
          </div>
          <div className="health-card">
            <h3>🧘‍♂️ Bienestar Emocional</h3>
            <ul className="tips-list">
              <li>Practicar gratitud</li>
              <li>Desarrollar hobbies</li>
              <li>Mantener relaciones positivas</li>
              <li>Buscar ayuda profesional si es necesario</li>
              <li>Practicar la autocompasión</li>
            </ul>
          </div>
        </div>
        <div className="calculator">
          <h3>🎯 Evaluador de Bienestar Mental</h3>
          <p>Califica del 1 al 10 los siguientes aspectos de tu bienestar:</p>
          <div className="input-group">
            <label>Estado de ánimo general:</label>
            <input type="range" min="1" max="10" value={wellbeing.mood} onChange={e => updateWellbeing('mood', e.target.value)} />
            <span>{wellbeing.mood}</span>
          </div>
          <div className="input-group">
            <label>Nivel de estrés (1=bajo, 10=alto):</label>
            <input type="range" min="1" max="10" value={wellbeing.stress} onChange={e => updateWellbeing('stress', e.target.value)} />
            <span>{wellbeing.stress}</span>
          </div>
          <div className="input-group">
            <label>Calidad del sueño:</label>
            <input type="range" min="1" max="10" value={wellbeing.sleep} onChange={e => updateWellbeing('sleep', e.target.value)} />
            <span>{wellbeing.sleep}</span>
          </div>
          <div className="result">{wellbeing.result || 'Tu puntuación de bienestar aparecerá aquí'}</div>
        </div>
      </div>
      {/* NUTRICION */}
      <div className={`content-section${activeSection === 'nutricion' ? ' active' : ''}`}>
        <h2>🥗 Nutrición y Alimentación</h2>
        <p>Una alimentación equilibrada es clave para mantener una buena salud y prevenir enfermedades.</p>
        <div className="card-grid">
          <div className="health-card">
            <h3>🍎 Grupos de Alimentos</h3>
            <ul className="tips-list">
              <li>Frutas y verduras (5 porciones/día)</li>
              <li>Cereales integrales</li>
              <li>Proteínas magras</li>
              <li>Lácteos bajos en grasa</li>
              <li>Grasas saludables (nueces, aceite de oliva)</li>
            </ul>
          </div>
          <div className="health-card">
            <h3>💧 Hidratación</h3>
            <ul className="tips-list">
              <li>Beber 8 vasos de agua al día</li>
              <li>Aumentar ingesta con ejercicio</li>
              <li>Incluir infusiones y tés</li>
              <li>Reducir bebidas azucaradas</li>
              <li>Comer frutas con alto contenido de agua</li>
            </ul>
          </div>
        </div>
        <div className="calculator">
          <h3>💧 Calculadora de Hidratación</h3>
          <form onSubmit={calculateHydration}>
            <div className="input-group">
              <label>Tu peso (kg):</label>
              <input type="number" name="weightHydration" placeholder="Ej: 70" />
            </div>
            <div className="input-group">
              <label>Nivel de actividad:</label>
              <select name="activityLevel">
                <option value="sedentary">Sedentario</option>
                <option value="light">Actividad ligera</option>
                <option value="moderate">Actividad moderada</option>
                <option value="intense">Actividad intensa</option>
              </select>
            </div>
            <button className="calc-btn" type="submit">Calcular Hidratación</button>
          </form>
          <div className="result">{hydrationResult}</div>
        </div>
      </div>
      {/* CALCULADORAS */}
      <div className={`content-section${activeSection === 'calculadoras' ? ' active' : ''}`}>
        <h2>📊 Calculadoras de Salud</h2>
        <div className="calculator">
          <h3>⚖️ Calculadora de IMC</h3>
          <form onSubmit={calculateBMI}>
            <div className="input-group">
              <label>Peso (kg):</label>
              <input type="number" name="weight" placeholder="Ej: 70" step="0.1" />
            </div>
            <div className="input-group">
              <label>Altura (cm):</label>
              <input type="number" name="height" placeholder="Ej: 175" />
            </div>
            <button className="calc-btn" type="submit">Calcular IMC</button>
          </form>
          <div className="result">{bmiResult}</div>
        </div>
        <div className="calculator">
          <h3>🔥 Calculadora de Calorías Diarias</h3>
          <form onSubmit={calculateCalories}>
            <div className="input-group">
              <label>Edad:</label>
              <input type="number" name="age" placeholder="Ej: 30" />
            </div>
            <div className="input-group">
              <label>Sexo:</label>
              <select name="gender">
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
              </select>
            </div>
            <div className="input-group">
              <label>Peso (kg):</label>
              <input type="number" name="weightCalories" placeholder="Ej: 70" />
            </div>
            <div className="input-group">
              <label>Altura (cm):</label>
              <input type="number" name="heightCalories" placeholder="Ej: 175" />
            </div>
            <div className="input-group">
              <label>Nivel de actividad:</label>
              <select name="activityCalories">
                <option value="1.2">Sedentario</option>
                <option value="1.375">Ligeramente activo</option>
                <option value="1.55">Moderadamente activo</option>
                <option value="1.725">Muy activo</option>
                <option value="1.9">Extremadamente activo</option>
              </select>
            </div>
            <button className="calc-btn" type="submit">Calcular Calorías</button>
          </form>
          <div className="result">{caloriesResult}</div>
        </div>
      </div>
      {/* EMERGENCIAS */}
      <div className={`content-section${activeSection === 'emergencias' ? ' active' : ''}`}>
        <h2>🚨 Información de Emergencias</h2>
        <div className="emergency-section">
          <h3>📞 Números de Emergencia (México)</h3>
          <div className="emergency-number">911</div>
          <p>Número único de emergencias para:</p>
          <ul style={{listStyle:'none',padding:0}}>
            <li>🚑 Ambulancia</li>
            <li>🚒 Bomberos</li>
            <li>👮‍♂️ Policía</li>
            <li>🆘 Protección Civil</li>
          </ul>
        </div>
        <div className="card-grid">
          <div className="health-card">
            <h3>🩹 Primeros Auxilios Básicos</h3>
            <ul className="tips-list">
              <li>Mantener la calma</li>
              <li>Evaluar la situación</li>
              <li>Llamar a emergencias</li>
              <li>No mover al herido innecesariamente</li>
              <li>Aplicar presión en heridas sangrantes</li>
            </ul>
          </div>
          <div className="health-card">
            <h3>💊 Kit de Primeros Auxilios</h3>
            <ul className="tips-list">
              <li>Vendas y gasas</li>
              <li>Antiséptico</li>
              <li>Analgésicos básicos</li>
              <li>Termómetro</li>
              <li>Guantes desechables</li>
            </ul>
          </div>
        </div>
      </div>
      {/* PREVENCION */}
      <div className={`content-section${activeSection === 'prevencion' ? ' active' : ''}`}>
        <h2>🛡️ Prevención y Cuidados</h2>
        <h3>🩺 Chequeos Médicos Regulares</h3>
        <div className="card-grid">
          <div className="health-card">
            <h3>📅 Exámenes Anuales</h3>
            <ul className="tips-list">
              <li>Examen físico general</li>
              <li>Análisis de sangre</li>
              <li>Presión arterial</li>
              <li>Colesterol</li>
              <li>Glucosa</li>
            </ul>
          </div>
          <div className="health-card">
            <h3>💉 Vacunación</h3>
            <ul className="tips-list">
              <li>Mantener esquema actualizado</li>
              <li>Vacuna anual contra influenza</li>
              <li>COVID-19 según recomendaciones</li>
              <li>Tétanos cada 10 años</li>
              <li>Consultar con médico</li>
            </ul>
          </div>
        </div>
        <h3>🧼 Hábitos Preventivos</h3>
        <div className="health-card">
          <ul className="tips-list">
            <li>Lavarse las manos frecuentemente</li>
            <li>Usar protector solar</li>
            <li>No fumar ni usar drogas</li>
            <li>Limitar el consumo de alcohol</li>
            <li>Mantener un peso saludable</li>
            <li>Hacer ejercicio regularmente</li>
            <li>Dormir lo suficiente</li>
            <li>Manejar el estrés</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Pagina;
