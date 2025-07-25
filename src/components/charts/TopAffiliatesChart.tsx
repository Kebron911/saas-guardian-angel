import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import "./chartjs-setup";
import AffiliateDetailsModal from "./AffiliateDetailsModal";

export interface TopAffiliatesChartProps {
  data: { id: string; name: string; referrals: number }[];
  onNameClick?: (id: string) => void;
}

const TopAffiliatesChart: React.FC<TopAffiliatesChartProps> = ({ data, onNameClick }) => {
  const [selectedAffiliateId, setSelectedAffiliateId] = useState<string | null>(null);
  const [affiliateDetails, setAffiliateDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Debug: log the data received from the API
  console.log('TopAffiliatesChart data:', data);
  // Always show top 5 in chart and links, no extra table
  const top5 = (data || []).slice(0, 5);

  const chartLabels = top5.map((d) => `${d.name} (${d.id.slice(0, 4)})`);
  const chartValues = top5.map((d) => Number(d.referrals));
  console.log('TopAffiliatesChart labels:', chartLabels);
  console.log('TopAffiliatesChart values:', chartValues);

  const handleNameClick = async (id: string) => {
    setSelectedAffiliateId(id);
    setLoading(true);
    setAffiliateDetails(undefined); // Use undefined to distinguish loading state
    try {
      const res = await fetch(`/admin/affiliate/${id}`);
      const data = await res.json();
      if (data && data.affiliate) {
        setAffiliateDetails(data);
      } else {
        setAffiliateDetails(null);
      }
    } catch (e) {
      setAffiliateDetails(null);
    } finally {
      setLoading(false);
    }
    if (onNameClick) onNameClick(id);
  };

  if (!top5 || top5.length === 0) {
    return <div className="text-center text-gray-400 py-8">No affiliate data available</div>;
  }

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Referrals",
        data: chartValues,
        backgroundColor: "#3B82F6",
        categoryPercentage: 0.5,
        barPercentage: 0.5,
        maxBarThickness: 40,
      },
    ],
  };

  return (
    <div style={{ height: Math.max(300, 50 * top5.length) }}>
      <Bar data={chartData} options={{
        plugins: { legend: { display: false } },
        indexAxis: 'y',
        scales: {
          x: { beginAtZero: true },
          y: { ticks: { autoSkip: false } },
        },
        responsive: true,
      }} />
      <ol className="mt-4 space-y-2">
        {top5.map((d, i) => (
          <li key={d.id} className="flex items-center gap-2">
            <span className="font-bold text-gray-600">{i + 1}.</span>
            <button
              className="text-blue-600 underline hover:text-blue-800 font-medium cursor-pointer"
              onClick={() => handleNameClick(d.id)}
              type="button"
            >
              {d.name}
            </button>
            <span className="ml-2 text-xs text-gray-400">({d.referrals} referrals)</span>
          </li>
        ))}
      </ol>
      {selectedAffiliateId && (
        <AffiliateDetailsModal
          open={!!selectedAffiliateId}
          onOpenChange={() => {
            setAffiliateDetails(null);
            setSelectedAffiliateId(null);
          }}
          affiliate={affiliateDetails}
          loading={loading}
        />
      )}
    </div>
  );
};

export default TopAffiliatesChart;
