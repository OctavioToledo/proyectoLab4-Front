import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import InstrumentList from "./components/InstrumentList";
import InstrumentDetail from "./components/InstrumentDetail";
import Home from "./components/Home";
import DondeEstamos from "./components/DondeEstamos";
import NavBar from "./components/NavBar";
import InstrumentGrid from "./components/InstrumentGrid";
import InstrumentForm from "./components/InstrumentForm";
import { CartProvider } from "./context/CartContext";
import Cart from "./components/Cart";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/Dashboard";

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<string | null>(null);

  const handleLogin = (role: string) => {
    setUserRole(role);
  };

  const handleLogout = () => {
    setUserRole(null);
    // Lógica para limpiar la sesión o hacer logout en tu backend si es necesario
  };

  return (
    <CartProvider>
      <NavBar userRole={userRole} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donde-estamos" element={<DondeEstamos />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        
        <Route 
          path="/instrumentos" 
          element={
            <PrivateRoute 
              element={<InstrumentList />} 
              userRole={userRole} 
              allowedRoles={["Admin", "Operador"]} 
            />
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute 
              element={<Dashboard />} 
              userRole={userRole} 
              allowedRoles={["Admin", "Operador"]} 
            />
          } 
        />
        <Route 
          path="/instrumentos/:id" 
          element={
            <PrivateRoute 
              element={<InstrumentDetail />} 
              userRole={userRole} 
              allowedRoles={["Admin", "Operador"]} 
            />
          } 
        />
        <Route 
          path="/cart" 
          element={
            <PrivateRoute 
              element={<Cart />} 
              userRole={userRole} 
              allowedRoles={["Admin", "Operador"]} 
            />
          } 
        />

        <Route 
          path="/instrumentos/grid" 
          element={
            <PrivateRoute 
              element={<InstrumentGrid userRole={userRole} />} 
              userRole={userRole} 
              allowedRoles={["Admin"]} 
            />
          } 
        />
        <Route 
          path="/instrumentos/nuevo" 
          element={
            <PrivateRoute 
              element={<InstrumentForm />} 
              userRole={userRole} 
              allowedRoles={["Admin"]} 
            />
          } 
        />
        <Route 
          path="/instrumentos/nuevo/:id" 
          element={
            <PrivateRoute 
              element={<InstrumentForm />} 
              userRole={userRole} 
              allowedRoles={["Admin"]} 
            />
          } 
        />
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </CartProvider>
  );
};

export default App;
