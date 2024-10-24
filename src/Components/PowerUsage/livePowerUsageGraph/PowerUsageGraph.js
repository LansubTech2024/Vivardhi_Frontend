import React, { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { updateLivePowerUsage} from '../livePowerUsage';
import Chart from 'chart.js/auto';

const LivePowerUsageGraph = () => {
  const [liveData, setLiveData] = useState([]);
  const [gradient, setGradient] = useState(null);
  const maxDataPoints = 10;
  const chartRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData((prevData) => {
        const newUsage = updateLivePowerUsage();
        const now = new Date();
        const newData = {
          time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          usage: newUsage,
        };
        return [...prevData.slice(-maxDataPoints + 1), newData]; // Keep the latest 10 data points
      });
    }, 2000); // Update every second

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

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
    labels: liveData.map((entry) => entry.time), // Time labels for the x-axis
    datasets: [
      {
        label: 'Live Power Usage (kW)',
        data: liveData.map((entry) => entry.usage), // Power usage values for the y-axis
        borderColor: 'rgba(75, 192, 192, 1)',
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
        grid: {
          display: false, // Hide y-axis grid lines
        }, 
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

export default LivePowerUsageGraph;
