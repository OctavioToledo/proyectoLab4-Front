import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";
import { useCart } from "../context/CartContext";

const NavBar: React.FC = () => {
  const { cart } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/">Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/donde-estamos">Donde Estamos</Link>
        </li>
        <li className="navbar-item">
          <Link to="/instrumentos">Productos</Link>
        </li>
        <li className="navbar-item">
          <Link to="/instrumentos/grid">Grilla</Link>
        </li>
        <li className="navbar-item">
        <Link to="/cart" className="cart-link">
            Carrito
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
