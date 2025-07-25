import React from "react";
import { Line } from "react-chartjs-2";
import "./chartjs-setup";

export interface ReferralsOverTimeChartProps {
  data: { name: string; value: number }[];
}

const ReferralsOverTimeChart: React.FC<ReferralsOverTimeChartProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="text-center text-gray-400 py-8">No referral data available</div>;
  }

  const chartData = {
    labels: data.map((d) => d.name),
    datasets: [
      {
        label: "Referrals",
        data: data.map((d) => d.value),
        fill: false,
        borderColor: "#6366F1",
        backgroundColor: "#6366F1",
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

export default ReferralsOverTimeChart;
