import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
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
  const { cart, addToCart } = useCart();
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

  const handleAddToCart = () => {
    if (!instrumento) return;

    // Verificar si el instrumento ya está en el carrito
    const isInCart = cart.some((item) => item.id === instrumento.id);
    
    // Si el instrumento ya está en el carrito, mostrar una alerta
    if (isInCart) {
      alert("El instrumento ya está en el carrito.");
      return;
    }

    // Si el instrumento no está en el carrito, agregarlo
    addToCart({
      id: instrumento.id,
      instrumento: instrumento.instrumento,
      marca: instrumento.marca,
      modelo: instrumento.modelo,
      imagen: instrumento.imagen,
      precio: parseFloat(instrumento.precio), // Asegúrate de convertir a número si precio es string
      costoEnvio: instrumento.costoEnvio,
      cantidadVendida: parseInt(instrumento.cantidadVendida, 10),
      descripcion: instrumento.descripcion,
      categoria: instrumento.categoria,
      eliminado: false,
      quantity: 1, // Establecemos la cantidad inicial en 1
    });
  };

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
        <button className="add-to-cart-button" onClick={handleAddToCart}>Agregar al carrito</button>
      </div>
    </div>
  );
};

export default InstrumentDetail;
