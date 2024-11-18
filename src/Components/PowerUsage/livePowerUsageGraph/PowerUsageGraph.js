
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js';

// Register scales and elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);


const LivePowerUsageChart = () => {
  const [liveData, setLiveData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/live-power');
        const currentPower = response.data.livePowerUsage;

        setLiveData((prevData) => [...prevData.slice(-19), currentPower]); // Keep only the last 20 points
        setLabels((prevLabels) => [
          ...prevLabels.slice(-19),
          new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
        ]);
      } catch (error) {
        console.error('Error fetching live power usage:', error);
      }
    };

    const interval = setInterval(fetchLiveData, 2000); 
    return () => clearInterval(interval); 
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: 'Live Power Usage (kW)',
        data: liveData,
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgb(13 148 136)',
        tension: 0.4, // Smooth the line
      },
    ],
  };

  const options = {
    scales: {
      x: {
        display: true,
        grid: { display: false }, // Hide grid lines for x-axis
      },
      y: {
        display: true,
        grid: { display: false }, // Hide grid lines for y-axis
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div>
      <h3>Live Power Usage</h3>
      <Line data={data} options={options} width={500} height={100} />
      
    </div>
  );
};

export default LivePowerUsageChart;
