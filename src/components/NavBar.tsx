import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";
import { useCart } from "../context/CartContext";

interface NavBarProps {
  userRole: string | null;
  onLogout: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ userRole, onLogout }) => {
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
        {userRole === "Admin" && (
          <li className="navbar-item">
            <Link to="/instrumentos/grid">Grilla</Link>
          </li>
        )}
        <li className="navbar-item">
          <Link to="/login">Login</Link>
        </li>
        <li className="navbar-item">
          <Link to="/cart" className="cart-link">
            Carrito
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>
        </li>
        {userRole && (
          <li className="navbar-item" onClick={onLogout}>
            Logout
          </li>
        )}
        <li className="navbar-item">
          <Link to="/dashboard">Graficos</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
