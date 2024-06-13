import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const PieChart = () => {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/pedidos/pieChart")
      .then((response) => response.json())
      .then((data) => {
        if (!data || data.length === 0) {
          throw new Error("No se encontraron datos de pedidos por instrumento.");
        }

        // Objeto para contener la cuenta de cada instrumento
        const instrumentoCount: { [key: string]: number } = {};
        let totalPedidos = 0;

        // Iterar sobre cada registro de datos recibido
        data.forEach((item: any) => {
          const nombreInstrumento = item[0]; // Nombre del instrumento
          const cantidadPedidos = item[1]; // Cantidad de pedidos

          // Incrementar la cuenta del instrumento en el objeto instrumentoCount
          instrumentoCount[nombreInstrumento] = cantidadPedidos;

          // Sumar la cantidad de pedidos al totalPedidos
          totalPedidos += cantidadPedidos;
        });

        // Calcular el porcentaje de pedidos para cada instrumento
        const chartDataFormatted = Object.entries(instrumentoCount).map(([key, value]) => [key, (value / totalPedidos) * 100]);

        // Agregar el título de las columnas
        const finalChartData = [["Instrumento", "Porcentaje"], ...chartDataFormatted];

        // Establecer el estado del chartData
        setChartData(finalChartData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Aquí puedes manejar el error, por ejemplo, establecer un estado de error para mostrar un mensaje al usuario
      });
  }, []);

  return <Chart chartType="PieChart" width="100%" height="400px" data={chartData} />;
};

export default PieChart;
