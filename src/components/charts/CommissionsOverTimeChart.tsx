import React from "react";
import { Line } from "react-chartjs-2";
import "./chartjs-setup";

export interface CommissionsOverTimeChartProps {
  data: { name: string; value: number }[];
}

const CommissionsOverTimeChart: React.FC<CommissionsOverTimeChartProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="text-center text-gray-400 py-8">No commission data available</div>;
  }

  const chartData = {
    labels: data.map((d) => d.name),
    datasets: [
      {
        label: "Commissions Paid",
        data: data.map((d) => d.value),
        fill: true,
        borderColor: "#F59E0B",
        backgroundColor: "rgba(251, 191, 36, 0.2)",
        tension: 0.3,
      },
    ],
  };
  return (
    <div style={{ height: 300 }}>
      <Line data={chartData} options={{
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
      }} />
    </div>
  );
};

export default CommissionsOverTimeChart;
