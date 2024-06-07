import React from "react";
import { useCart } from "../context/CartContext";
import "../styles/Cart.css";
import { Instrument } from "../Interface/types";
import { useNavigate } from "react-router-dom";
import CheckoutMP from "./CheckoutMP";
import Pedido from "../Interface/Pedido";

const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart, setCart } = useCart();
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

  const savePedido = async (cartData: { id: string, quantity: number, precio: number }[]): Promise<Pedido> => {
    try {
      const response = await fetch("http://localhost:8080/api/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartData),
      });
      if (!response.ok) {
        throw new Error("Error al guardar el pedido");
      }        console.log("Se guardo el pedido correctamente")


      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al guardar el pedido:", error);
      throw error;
    }
  };

  const handleSaveCart = async () => {
    try {
      const cartData = cart.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        precio: item.precio,
      }));

      const data = await savePedido(cartData);
      alert(`El pedido con id ${data.id} se guardó correctamente`);
      //clearCart();
      navigate("/cart");
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
            <p className="total-label">Total: ${total.toFixed(2)}</p>
          </ul>
          <button onClick={handleSaveCart} className="buy-btn">Comprar</button>
          <button onClick={handleClearCart} className="clear-btn">
            Vaciar Carrito
          </button>
          <CheckoutMP savePedido={savePedido} cart={cart} total={total} />
        </div>
      )}
    </div>
  );
};

export default Cart;
