import React, { useState } from 'react';
import "../styles/DateRangeModal.css";

interface DateRangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (startDate: string, endDate: string) => void;
}

const DateRangeModal: React.FC<DateRangeModalProps> = ({ isOpen, onClose, onGenerate }) => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const handleGenerate = () => {
    onGenerate(startDate, endDate);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Seleccione el rango de fechas</h2>
        <label>
          Fecha Desde:
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>
        <label>
          Fecha Hasta:
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
        <button onClick={handleGenerate}>Generar Reporte</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default DateRangeModal;
