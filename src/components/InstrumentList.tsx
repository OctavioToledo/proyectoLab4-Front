import React, { useEffect, useState } from "react";
import InstrumentCard from "./InstrumentCard";
import "../styles/InstrumentList.css";

interface Instrument {
  id: string;
  instrumento: string;
  marca: string;
  modelo: string;
  imagen: string;
  precio: string;
  costoEnvio: string;
  cantidadVendida: string;
  descripcion: string;
  categoria: string;
  eliminado: boolean;
}

const InstrumentList: React.FC = () => {
  const [instrumentos, setInstrumentos] = useState<Instrument[]>([]);

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

  const filteredInstrumentos = instrumentos.filter((instrumento) => !instrumento.eliminado);

  return (
    <div className="instrument-list">
      {filteredInstrumentos.map((instrumento) => (
        <InstrumentCard key={instrumento.id} {...instrumento} />
      ))}
    </div>
  );
};

export default InstrumentList;
