import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/InstrumentCard.css";

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
  const { cart, addToCart } = useCart();

  const handleAddToCart = () => {
    // Verificar si el instrumento ya está en el carrito
    const isInCart = cart.some((item) => item.id === id);
    
    // Si el instrumento ya está en el carrito, no hacemos nada
    if (isInCart) {
      alert("El instrumento ya está en el carrito.");
      return;
    }

    // Si el instrumento no está en el carrito, lo agregamos
    addToCart({
      id,
      instrumento,
      marca,
      modelo,
      imagen,
      precio: parseFloat(precio), // Asegúrate de convertir a número si precio es string
      costoEnvio,
      cantidadVendida: parseInt(cantidadVendida, 10),
      descripcion,
      categoria,
      eliminado: false,
      quantity: 1, // Establecemos la cantidad inicial en 1
    });
  };

  const costoEnvioStyle = {
    color: costoEnvio === "G" ? "green" : "orange",
  };

  const costoEnvioTexto =
    costoEnvio === "G" ? "Envío gratis a todo el país" : `$${costoEnvio}`;

  return (
    <div className="instrument-card">
      <img src={`/assets/img/${imagen}`} alt={instrumento} />
      <div className="instrument-info">
        <h3>{instrumento}</h3>
        <p><b>Marca: </b>{marca}</p>
        <p><b>Modelo: </b>{modelo}</p>
        <p><b>Precio: </b>${precio}</p>
        <p><b>Categoría:</b> {categoria}</p>
        <p style={costoEnvioStyle}><b>Costo de Envío:</b> {costoEnvioTexto}</p>
        <p><b>Cantidad Vendida:</b> {cantidadVendida}</p>
        <p>{descripcion}</p>
        <Link to={`/instrumentos/${id}`}>
          <button>Ver detalle</button>
        </Link>
        <button onClick={handleAddToCart}>Agregar al Carrito</button>
      </div>
    </div>
  );
};

export default InstrumentCard;
