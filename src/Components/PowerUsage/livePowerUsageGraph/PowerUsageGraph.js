
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

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
          new Date().toLocaleTimeString(),
        ]);
      } catch (error) {
        console.error('Error fetching live power usage:', error);
      }
    };

    const interval = setInterval(fetchLiveData, 2000); // Fetch every 2 seconds
    return () => clearInterval(interval); // Cleanup
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: 'Live Power Usage (kW)',
        data: liveData,
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.4, // Smooth the line
      },
    ],
  };

  const options = {
    scales: {
      x: { display: true },
      y: { display: true },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div>
      <h3>Live Power Usage</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default LivePowerUsageChart;
