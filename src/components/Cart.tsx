import React from "react";
import { useCart } from "../context/CartContext";
import "../styles/Cart.css";
import { Instrument } from "../Interface/types";
import { useNavigate } from "react-router-dom";

const Cart: React.FC = () => {
  const { cart, addToCart, removeFromCart, clearCart, setCart } = useCart();
  const navigate = useNavigate();

  const increaseQuantity = (id: string) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const decreaseQuantity = (id: string) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        if (item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
      }
      return item;
    }).filter(Boolean) as Instrument[]; // Filtrar los elementos nulos
    setCart(updatedCart);
  };

  const total = cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);

  const handleSaveCart = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
      });
      if (!response.ok) {
        throw new Error("Error al guardar el pedido");
      }
      const data = await response.json();
      alert(`El pedido con id ${data.id} se guardó correctamente`);
      clearCart();
      navigate("/instrumentos");
    } catch (error) {
      console.error("Error al guardar el pedido:", error);
    }
  };

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <div className="cart-container">
      <h2>Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>No hay productos en el carrito</p>
      ) : (
        <div>
          <ul className="cart-items">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={`/assets/img/${item.imagen}`} alt={item.instrumento} />
                <div>
                  <h3>{item.instrumento}</h3>
                  <p>Precio: ${item.precio * item.quantity}</p>
                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="remove-btn">
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <p className="total-label">Total: ${total.toFixed(2)}</p>
          <button onClick={handleSaveCart} className="buy-btn">Comprar</button>
          <button onClick={handleClearCart} className="clear-btn">
            Vaciar Carrito
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
    