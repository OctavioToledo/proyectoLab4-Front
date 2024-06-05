import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/InstrumentDetail.css";

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
  
}

const InstrumentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [instrumento, setInstrumento] = useState<Instrument | null>(null);

  useEffect(() => {
    const fetchInstrumento = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/instrumentos/${id}`);
        if (!response.ok) {
          throw new Error("Error al obtener el detalle del instrumento");
        }
        const data = await response.json();
        setInstrumento(data);
      } catch (error) {
        console.error("Error al obtener el detalle del instrumento:", error);
      }
    };

    fetchInstrumento();
  }, [id]);

  if (!instrumento) {
    return <div>Instrumento no encontrado</div>;
  }

  const costoEnvioStyle = {
    color: instrumento.costoEnvio === "G" ? "green" : "orange",
  };

  const costoEnvioTexto =
    instrumento.costoEnvio === "G"
      ? "Envío gratis a todo el país"
      : `$${instrumento.costoEnvio}`;

  return (
    <div className="instrument-detail">
      <div className="instrument-detail-left">
        <img
          src={`/assets/img/${instrumento.imagen}`}
          alt={instrumento.instrumento}
        />
        <p className="instrument-description">{instrumento.descripcion}</p>
      </div>
      <div className="instrument-detail-right">
        <h2>{instrumento.instrumento}</h2>
        <p><b>Marca:</b> {instrumento.marca}</p>
        <p><b>Modelo:</b> {instrumento.modelo}</p>
        <p><b>Categoria:</b> {instrumento.categoria}</p>
        <p><b>Precio:</b> ${instrumento.precio}</p>
        <p style={costoEnvioStyle}><b>Costo de Envío:</b> {costoEnvioTexto}</p>
        <p><b>Cantidad Vendida: </b>{instrumento.cantidadVendida}</p>
        <button className="add-to-cart-button">Agregar al carrito</button>
      </div>
    </div>
  );
};

export default InstrumentDetail;
