import React from "react";
import InstrumentList from "./components/InstrumentList";
import { Navigate, Route, Routes } from "react-router-dom";
import InstrumentDetail from "./components/InstrumentDetail";
import Home from "./components/Home";
import DondeEstamos from "./components/DondeEstamos";
import NavBar from "./components/NavBar";

const App: React.FC = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donde-estamos" element={<DondeEstamos />} />
        <Route path="/instrumentos" element={<InstrumentList />} />
        <Route path="/instrumentos/:id" element={<InstrumentDetail />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
