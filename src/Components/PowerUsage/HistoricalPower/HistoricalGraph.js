import React,{useState,useRef,useEffect} from 'react';
import { Line } from 'react-chartjs-2';
import { historicalPowerData } from '../PowerUsageData';
import Chart from 'chart.js/auto';

const HistoricalPowerUsageGraph = () => {
  const [gradient, setGradient] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    // Create gradient only after chart is rendered and ref is available
    const chart = chartRef.current;
    if (chart) {
      const ctx = chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgba(75, 192, 192, 0.4)');
      gradient.addColorStop(1, 'rgba(75, 192, 192, 0.05)');
      setGradient(gradient); // Store the gradient in state
    }
  }, [chartRef]);


  const data = {
    labels: historicalPowerData.map((entry) => entry.date), // Use dates as labels
    datasets: [
      {
        label: 'Power Usage (Last 30 Days)',
        data: historicalPowerData.map((entry) => entry.usage), // Power usage for each day
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: gradient,
        fill: true,
        tension: 0.4,
      },
    ],
  };
  const options = {
    scales: {
      x: {
        grid: {
          display: false, // Hide x-axis grid lines
        },
      },
      y: {
          display: false, 
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return <Line ref={chartRef} data={data} options={options} width={400} height={100} />;
};

export default HistoricalPowerUsageGraph;
