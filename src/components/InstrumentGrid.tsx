import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/InstrumentGrid.css";

interface Instrument {
  id: string;
  instrumento: string;
  modelo: string;
  precio: string;
  categoria: string;
  costoEnvio: string;
  descripcion: string;
  eliminado: boolean;
}

interface InstrumentGridProps {
  userRole: string | null; // Propiedad userRole recibida desde PrivateRoute
}

const InstrumentGrid: React.FC<InstrumentGridProps> = ({ userRole }) => {
  const [instrumentos, setInstrumentos] = useState<Instrument[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInstrumentos = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/instrumentos");
        if (!response.ok) {
          throw new Error("Error al obtener los instrumentos");
        }
        const data = await response.json();
        setInstrumentos(data);
      } catch (error) {
        console.error("Error al obtener los instrumentos:", error);
      }
    };

    fetchInstrumentos();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/instrumentos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error al eliminar el instrumento");
      }
      setInstrumentos((prevInstrumentos) =>
        prevInstrumentos.map((instrumento) =>
          instrumento.id === id
            ? { ...instrumento, eliminado: true }
            : instrumento
        )
      );
    } catch (error) {
      console.error("Error al eliminar el instrumento:", error);
    }
  };

  const handleEdit = (instrumento: Instrument) => {
    navigate(`/instrumentos/nuevo/${instrumento.id}`); // Navegar a la página de edición del instrumento
  };

  const handleNew = () => {
    navigate("/instrumentos/nuevo");
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoriaSeleccionada(e.target.value);
  };

  const filteredInstrumentos = instrumentos.filter(
    (instrumento) =>
      !instrumento.eliminado && (categoriaSeleccionada === "" || instrumento.categoria === categoriaSeleccionada)
  );

  return (
    <div className="instrument-grid-container">
      {userRole === "Admin" && (
        <button className="btn btn-agregar" onClick={handleNew}>
          Agregar Nuevo Instrumento
        </button>
      )}
      <div className="filter-container">
        <label htmlFor="categoria">Filtrar por categoría:</label>
        <select id="categoria" value={categoriaSeleccionada} onChange={handleCategoryChange}>
          <option value="">Todas</option>
          <option value="Cuerdas">Cuerdas</option>
          <option value="Viento">Viento</option>
          <option value="Percusion">Percusión</option>
          <option value="Teclado">Teclado</option>
          <option value="Idiofono">Idiófono</option>
        </select>
      </div>
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
          {filteredInstrumentos.map((instrumento) => (
            <tr key={instrumento.id}>
              <td>{instrumento.id}</td>
              <td>{instrumento.instrumento}</td>
              <td>{instrumento.modelo}</td>
              <td>{instrumento.precio}</td>
              <td>{instrumento.categoria}</td>
              <td>{instrumento.costoEnvio}</td>
              <td>{instrumento.descripcion}</td>
              <td>
                {userRole === "Admin" && (
                  <>
                    <button
                      className="btn btn-modificar"
                      onClick={() => handleEdit(instrumento)}
                    >
                      Modificar
                    </button>
                    <button
                      className="btn btn-eliminar"
                      onClick={() => handleDelete(instrumento.id)}
                    >
                      Eliminar
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InstrumentGrid;
