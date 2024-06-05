import React from "react";
import "../styles/InstrumentCard.css";
import { Link } from "react-router-dom";

interface InstrumentCardProps {
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

const InstrumentCard: React.FC<InstrumentCardProps> = ({
  id,
  instrumento,
  marca,
  modelo,
  imagen,
  precio,
  costoEnvio,
  cantidadVendida,
  descripcion,
  categoria,
}) => {
  const costoEnvioStyle = {
    color: costoEnvio === "G" ? "green" : "orange",
  };

  const costoEnvioTexto = costoEnvio === "G" ? "Envío gratis a todo el país" : `$${costoEnvio}`;


  return (
    <div className="instrument-card">
      <img src={`/assets/img/${imagen}`} alt={instrumento} />
      <div className="instrument-info">
        <h3>{instrumento}</h3>
        <p><b>Marca: </b>{marca}</p>
        <p><b>Modelo: </b>{modelo}</p>
        <p><b>Precio: </b>${precio}</p>
        <p><b>Categoria:</b> {categoria}</p>
        <p style={costoEnvioStyle}><b>Costo de Envío:</b> {costoEnvioTexto}</p>
        <p><b>Cantidad Vendida:</b> {cantidadVendida}</p>
        <p>{descripcion}</p>
        <Link to={`/instrumentos/${id}`}><button>Ver detalle</button></Link>
      </div>
    </div>
  );
};

export default InstrumentCard;
