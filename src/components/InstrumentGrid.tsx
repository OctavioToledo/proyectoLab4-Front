import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/InstrumentGrid.css';

interface Instrument {
  id: string;
  instrumento: string;
  modelo: string;
  precio: string;
  categoria: string;
  costoEnvio: string;
  descripcion: string;
}

const InstrumentGrid: React.FC = () => {
  const [instrumentos, setInstrumentos] = useState<Instrument[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInstrumentos = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/instrumentos');
        if (!response.ok) {
          throw new Error('Error al obtener los instrumentos');
        }
        const data = await response.json();
        setInstrumentos(data);
      } catch (error) {
        console.error('Error al obtener los instrumentos:', error);
      }
    };

    fetchInstrumentos();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/instrumentos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar el instrumento');
      }
      setInstrumentos(instrumentos.filter((instrumento) => instrumento.id !== id));
    } catch (error) {
      console.error('Error al eliminar el instrumento:', error);
    }
  };

  return (
    <div className="instrument-grid-container">
      <button
        className="btn btn-agregar"
        onClick={() => navigate('/instrumentos/nuevo')}
      >
        Agregar Nuevo Instrumento
      </button>
      <table className="instrument-grid">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Modelo</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Costo Envío</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {instrumentos.map((instrumento) => (
            <tr key={instrumento.id}>
              <td>{instrumento.id}</td>
              <td>{instrumento.instrumento}</td>
              <td>{instrumento.modelo}</td>
              <td>{instrumento.precio}</td>
              <td>{instrumento.categoria}</td>
              <td>{instrumento.costoEnvio}</td>
              <td>{instrumento.descripcion}</td>
              <td>
                <button
                  className="btn btn-modificar"
                  onClick={() => navigate(`/instrumentos/editar/${instrumento.id}`)}
                >
                  Modificar
                </button>
                <button
                  className="btn btn-eliminar"
                  onClick={() => handleDelete(instrumento.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InstrumentGrid;
