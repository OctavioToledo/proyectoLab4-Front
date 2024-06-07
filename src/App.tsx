import React from "react";
import InstrumentList from "./components/InstrumentList";
import { Navigate, Route, Routes } from "react-router-dom";
import InstrumentDetail from "./components/InstrumentDetail";
import Home from "./components/Home";
import DondeEstamos from "./components/DondeEstamos";
import NavBar from "./components/NavBar";
import InstrumentGrid from "./components/InstrumentGrid";
import InstrumentForm from "./components/InstrumentForm";
import { CartProvider } from "./context/CartContext";
import Cart from "./components/Cart";


const App: React.FC = () => {
  return (
    <>
      <CartProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/donde-estamos" element={<DondeEstamos />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/instrumentos" element={<InstrumentList />} />
          <Route path="/instrumentos/:id" element={<InstrumentDetail />} />

          <Route path="/instrumentos/grid" element={<InstrumentGrid />} />
          <Route path="/instrumentos/nuevo" element={<InstrumentForm />} />
          <Route path="/instrumentos/nuevo/:id" element={<InstrumentForm />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </CartProvider>
    </>
  );
};

export default App;
