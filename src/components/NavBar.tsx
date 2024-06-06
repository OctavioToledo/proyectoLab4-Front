import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";

const NavBar: React.FC = () => {
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
      </ul>
    </nav>
  );
};

export default NavBar;
