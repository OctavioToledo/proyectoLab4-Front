import BarChart from './BarChart';
import PieChart from './PieChart';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Pedidos por Mes y Año</h2>
      <BarChart />
      <h2>Pedidos por Instrumento</h2>
      <PieChart />
    </div>
  );
};

export default Dashboard;
