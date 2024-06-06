import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/InstrumentForm.css';

interface InstrumentFormProps {}

const InstrumentForm: React.FC<InstrumentFormProps> = () => {
  const [instrument, setInstrument] = useState({
    id: '',
    instrumento: '',
    modelo: '',
    precio: '',
    categoria: '',
    costoEnvio: '',
    descripcion: '',
  });

  const [errors, setErrors] = useState({
    instrumento: false,
    modelo: false,
    precio: false,
    categoria: false,
    costoEnvio: false,
    descripcion: false,
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInstrument((prevInstrument) => ({
      ...prevInstrument,
      [name]: value,
    }));

    // Actualizar errores
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() === '',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar campos
    const newErrors = {
      instrumento: instrument.instrumento.trim() === '',
      modelo: instrument.modelo.trim() === '',
      precio: instrument.precio.trim() === '',
      categoria: instrument.categoria.trim() === '',
      costoEnvio: instrument.costoEnvio.trim() === '',
      descripcion: instrument.descripcion.trim() === '',
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);

    if (hasErrors) {
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/instrumentos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(instrument),
      });
      if (!response.ok) {
        throw new Error('Error al crear el instrumento');
      }
      navigate('/instrumentos');
    } catch (error) {
      console.error('Error al crear el instrumento:', error);
    }
  };

  const handleCancel = () => {
    navigate('/instrumentos/grid');
  };

  return (
    <div className="instrument-form-container">
      <h2>Agregar Nuevo Instrumento</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="instrumento">Nombre</label>
          <input
            type="text"
            id="instrumento"
            name="instrumento"
            value={instrument.instrumento}
            onChange={handleChange}
            required
          />
          {errors.instrumento && <span className="error-text">Este campo es requerido.</span>}
        </div>
        <div className="form-group">
          <label htmlFor="modelo">Modelo</label>
          <input
            type="text"
            id="modelo"
            name="modelo"
            value={instrument.modelo}
            onChange={handleChange}
            required
          />
          {errors.modelo && <span className="error-text">Este campo es requerido.</span>}
        </div>
        <div className="form-group">
          <label htmlFor="precio">Precio</label>
          <input
            type="text"
            id="precio"
            name="precio"
            value={instrument.precio}
            onChange={handleChange}
            required
          />
          {errors.precio && <span className="error-text">Este campo es requerido.</span>}
        </div>
        <div className="form-group">
          <label htmlFor="categoria">Categoría</label>
          <select
            id="categoria"
            name="categoria"
            value={instrument.categoria}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una categoría</option>
            <option value="Cuerda">Cuerda</option>
            <option value="Viento">Viento</option>
            <option value="Percusión">Percusión</option>
            <option value="Teclado">Teclado</option>
          </select>
          {errors.categoria && <span className="error-text">Este campo es requerido.</span>}
        </div>
        <div className="form-group">
          <label htmlFor="costoEnvio">Costo Envío</label>
          <input
            type="text"
            id="costoEnvio"
            name="costoEnvio"
            value={instrument.costoEnvio}
            onChange={handleChange}
            required
          />
          {errors.costoEnvio && <span className="error-text">Este campo es requerido.</span>}
        </div>
        <div className="form-group">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={instrument.descripcion}
            onChange={handleChange}
            required
          />
          {errors.descripcion && <span className="error-text">Este campo es requerido.</span>}
        </div>
        <button type="submit" className="btn btn-agregar">Enviar Informacion</button>
        <button type="button" className="btn btn-cancelar" onClick={handleCancel}>Cancelar</button>
      </form>
    </div>
  );
};

export default InstrumentForm;
