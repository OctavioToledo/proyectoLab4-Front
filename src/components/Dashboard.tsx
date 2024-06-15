import React, { useState } from 'react';
import BarChart from './BarChart';
import PieChart from './PieChart';
import DateRangeModal from '../Modal/DateRangeModal';
import "../styles/Dashboard.css";

const Dashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const generarReporte = async (startDate: string, endDate: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/pedidos/reporteExcel?startDate=${startDate}&endDate=${endDate}`);
      if (!response.ok) {
        throw new Error('Error al generar el reporte');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'reporte_pedidos.xlsx');
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      }, 100);
    } catch (error) {
      console.error('Error al descargar el reporte', error);
      alert('Error al generar el reporte. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <button className="report-button" onClick={openModal}>Generar Reporte Excel</button>
      
      <DateRangeModal isOpen={isModalOpen} onClose={closeModal} onGenerate={generarReporte} />

      <section className="chart-section">
        <h2>Pedidos por Mes y Año</h2>
        <BarChart />
      </section>

      <section className="chart-section">
        <h2>Pedidos por Instrumento</h2>
        <PieChart />
      </section>
    </div>
  );
};

export default Dashboard;
