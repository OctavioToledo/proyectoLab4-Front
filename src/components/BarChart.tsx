import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const BarChart = () => {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/pedidos/barChart")
      .then((response) => response.json())
      .then((data) => {
        if (!data || data.length === 0) {
          throw new Error("No se encontraron datos de pedidos por mes y año.");
        }

        // Preparar los datos para el gráfico
        const chartDataFormatted = data.map((item: any) => [
          `${item[0]}/${item[1]}`, // Mes/Año
          item[2], // Cantidad de Pedidos
        ]);

        // Agregar el título de las columnas
        const finalChartData = [["Mes/Año", "Cantidad de Pedidos"], ...chartDataFormatted];

        // Establecer el estado del chartData
        setChartData(finalChartData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Aquí puedes manejar el error, por ejemplo, establecer un estado de error para mostrar un mensaje al usuario
      });
  }, []);

  return <Chart chartType="BarChart" width="100%" height="400px" data={chartData} />;
};

export default BarChart;
