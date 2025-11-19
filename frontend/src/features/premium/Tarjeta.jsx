import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../shared/components/Navbar';
import './Tarjeta.css';

export default function Tarjeta() {
  const [formData, setFormData] = useState({
    nombre: '',
    tarjeta: '',
    fecha: '',
    cvv: ''
  });

  const [errors, setErrors] = useState({});
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);
  const pagarBtnRef = React.useRef(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Formateo especial
    let newValue = value;
    
    if (name === 'tarjeta') {
      newValue = value.replace(/\D/g, '').substring(0, 16);
      newValue = newValue.match(/.{1,4}/g)?.join(' ') || newValue;
    } else if (name === 'fecha') {
      newValue = value.replace(/\D/g, '').substring(0, 4);
      if (newValue.length > 2) newValue = newValue.slice(0, 2) + '/' + newValue.slice(2);
    } else if (name === 'cvv') {
      newValue = value.replace(/\D/g, '').substring(0, 4);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    // Limpiar error al escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  function luhnCheck(cardNumber) {
    const digits = cardNumber.replace(/\s+/g, '').split('').reverse().map(d => parseInt(d, 10));
    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
      let d = digits[i];
      if (i % 2 === 1) {
        d *= 2;
        if (d > 9) d -= 9;
      }
      sum += d;
    }
    return sum % 10 === 0;
  }

  function validateDate(mmAa) {
    if (!mmAa || mmAa.length !== 5) return false;
    const parts = mmAa.split('/');
    if (parts.length !== 2) return false;
    const mm = parseInt(parts[0], 10);
    let yy = parseInt(parts[1], 10);
    if (isNaN(mm) || isNaN(yy)) return false;
    if (mm < 1 || mm > 12) return false;
    yy += 2000;
    const now = new Date();
    const exp = new Date(yy, mm - 1, 1);
    exp.setMonth(exp.getMonth() + 1);
    if (exp <= now) return false;
    return true;
  }

  function validateAll() {
    const newErrors = {};
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'Ingresa el nombre que aparece en la tarjeta';
    }
    
    const num = formData.tarjeta.replace(/\s+/g, '');
    if (num.length < 13 || num.length > 16 || !/^[0-9]+$/.test(num)) {
      newErrors.tarjeta = 'Número de tarjeta inválido';
    } else if (!luhnCheck(num)) {
      newErrors.tarjeta = 'Número de tarjeta no pasó validación';
    }
    
    if (!validateDate(formData.fecha)) {
      newErrors.fecha = 'Fecha inválida o expirada (MM/AA)';
    }
    
    if (!/^[0-9]{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'CVV inválido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async () => {
    setErrors({});
    setMensaje('');

    if (!validateAll()) return;

    setLoading(true);
    if (pagarBtnRef.current) {
      pagarBtnRef.current.disabled = true;
      pagarBtnRef.current.textContent = 'Procesando...';
    }

    try {
      // Simular procesamiento de pago
      await new Promise(resolve => setTimeout(resolve, 1400));
      
      // Activar premium en el backend
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/v1/auth/activate-premium', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al activar premium');
      }

      const data = await response.json();
      
      if (pagarBtnRef.current) {
        pagarBtnRef.current.textContent = '✅ Pago Exitoso';
      }
      setMensaje('¡Felicidades! Ahora eres usuario Premium 🌟');
      
      setTimeout(() => {
        navigate('/formulario');
      }, 2000);
    } catch (error) {
      console.error('Error al procesar pago:', error);
      setMensaje('Error al procesar el pago. Intenta nuevamente.');
      setLoading(false);
      if (pagarBtnRef.current) {
        pagarBtnRef.current.disabled = false;
        pagarBtnRef.current.textContent = '💳 Pagar $20 MXN';
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="tarjeta-container">
      <div className="container">
        <div className="alerta">⚠️ AVISO IMPORTANTE: Pagar Ahora</div>
        <h1>Finaliza tu compra 💎</h1>
        <p>Completa tus datos de tarjeta y disfruta de tu producto exclusivo.</p>

        <div className="form-group">
          <label htmlFor="nombre">Nombre en la tarjeta</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            autoComplete="cc-name"
            placeholder="Ejemplo: Nuvia D."
            value={formData.nombre}
            onChange={handleInputChange}
            aria-describedby="err-nombre"
            required
          />
          {errors.nombre && <div id="err-nombre" className="input-error">{errors.nombre}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="tarjeta">Número de tarjeta</label>
          <input
            type="text"
            id="tarjeta"
            name="tarjeta"
            inputMode="numeric"
            autoComplete="cc-number"
            maxLength="19"
            placeholder="4242 4242 4242 4242"
            value={formData.tarjeta}
            onChange={handleInputChange}
            aria-describedby="err-tarjeta"
            required
          />
          {errors.tarjeta && <div id="err-tarjeta" className="input-error">{errors.tarjeta}</div>}
        </div>

        <div className="form-row">
          <div className="form-group" style={{flex: 1}}>
            <label htmlFor="fecha">Fecha de expiración</label>
            <input
              type="text"
              id="fecha"
              name="fecha"
              inputMode="numeric"
              autoComplete="cc-exp"
              maxLength="5"
              placeholder="MM/AA"
              value={formData.fecha}
              onChange={handleInputChange}
              aria-describedby="err-fecha"
              required
            />
            {errors.fecha && <div id="err-fecha" className="input-error">{errors.fecha}</div>}
          </div>

          <div className="form-group" style={{flex: '0 0 100px'}}>
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              inputMode="numeric"
              autoComplete="cc-csc"
              maxLength="4"
              placeholder="123"
              value={formData.cvv}
              onChange={handleInputChange}
              aria-describedby="err-cvv"
              required
            />
            {errors.cvv && <div id="err-cvv" className="input-error">{errors.cvv}</div>}
          </div>
        </div>

        <button
          type="button"
          ref={pagarBtnRef}
          onClick={handleSubmit}
          className="btn-pagar"
          disabled={loading}
        >
          💳 Pagar $20 MXN
        </button>
        
        {mensaje && <div className="mensaje" role="status" aria-live="polite">{mensaje}</div>}
      </div>
      </div>
    </div>
  );
}
