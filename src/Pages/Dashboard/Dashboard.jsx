import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GaugeChart from 'react-gauge-chart';
import { Bar, Line } from 'react-chartjs-2';
import './Dashboard.css';

const Dashboard = () => {
  const [oeeData, setOeeData] = useState({});
  const [productionData, setProductionData] = useState({});
  const [manpowerData, setManpowerData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const [finishedMaterialData, setFinishedMaterialData] = useState(0);

  // Fetch data from backend API
  const fetchData = async () => {
    try {
      const [oeeResponse, productionResponse, manpowerResponse, inventoryResponse, finishedMaterialResponse] = await Promise.all([
        axios.get('http://localhost:5000/api/oee'),
        axios.get('http://localhost:5000/api/total-production'),
        axios.get('/api/manpower'),
        axios.get('/api/inventory'),
        axios.get('http://localhost:5000/api/finished-material'),
      ]);

      setOeeData(oeeResponse.data);
      setProductionData(productionResponse.data);
      setManpowerData(manpowerResponse.data);
      setInventoryData(inventoryResponse.data);
      setFinishedMaterialData(finishedMaterialResponse.data.finishedMaterial);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to prepare inventory chart data
  const prepareInventoryChartData = () => {
    return {
      labels: inventoryData.map(item => item.date),
      datasets: [
        {
          label: 'Raw Material Inventory',
          data: inventoryData.map(item => item.inventory),
          borderColor: 'rgba(75,192,192,1)',
          fill: false,
        },
      ],
    };
  };

  // Function to prepare manpower chart data
  const prepareManpowerChartData = () => {
    return {
      labels: manpowerData.map(item => item.zoneName),
      datasets: [
        {
          label: 'Manpower Allocation',
          data: manpowerData.map(item => item.manpower),
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>Total Production</h2>
        <GaugeChart
          id="total-production-gauge"
          nrOfLevels={30}
          arcsLength={[0.3, 0.5, 0.2]} // Example arcs
          colors={['#FF0000', '#FFA500', '#00FF00']}
          arcPadding={0.02}
          percent={productionData.totalProduction / productionData.targetProduction || 0}
        />
      </div>
      <div>
        <h2>Target Production</h2>
        <GaugeChart
          id="target-production-gauge"
          nrOfLevels={30}
          arcsLength={[0.3, 0.5, 0.2]}
          colors={['#FF0000', '#FFA500', '#00FF00']}
          arcPadding={0.02}
          percent={1} // Set target percentage here
        />
      </div>
      <div>
        <h2>Achieved Target</h2>
        <GaugeChart
          id="achieved-target-gauge"
          nrOfLevels={30}
          arcsLength={[0.3, 0.5, 0.2]}
          colors={['#FF0000', '#FFA500', '#00FF00']}
          arcPadding={0.02}
          percent={oeeData.oee / 100 || 0} // Use OEE value for achieved target
        />
      </div>
      <div>
        <h2>Manpower Allocation</h2>
        <Bar data={prepareManpowerChartData()} />
      </div>
      <div>
        <h2>Raw Material Inventory</h2>
        <Line data={prepareInventoryChartData()} />
      </div>
      <div>
        <h2>Finished Material Output</h2>
        <Bar
          data={{
            labels: ['Finished Material'],
            datasets: [{
              label: 'Output',
              data: [finishedMaterialData],
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 1,
            }],
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
