import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import './Report.css';

const Dashboard = () => {
  const [zone, setZone] = useState(''); // Holds the selected zone
  const [oeeData, setOeeData] = useState({});
  const [productionData, setProductionData] = useState({});
  const [inventoryData, setInventoryData] = useState([]);
  const [powerData, setPowerData] = useState([]);
  const [filteredInventoryData, setFilteredInventoryData] = useState([]);
  const [filteredPowerData, setFilteredPowerData] = useState([]);

  // Fetch all data from the backend on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const oeeResponse = await axios.get('http://localhost:5000/api/oee-summary');
        const productionResponse = await axios.get('http://localhost:5000/api/production-target-achievement');
        const inventoryResponse = await axios.get('http://localhost:5000/api/material-inventory');
        const powerResponse = await axios.get('http://localhost:5000/api/power-consumption');
        
        setOeeData(oeeResponse.data);
        setProductionData(productionResponse.data);
        setInventoryData(inventoryResponse.data);
        setPowerData(powerResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, []);

  // Filter data by zone whenever `zone` changes
  useEffect(() => {
    if (zone) {
      setFilteredInventoryData(inventoryData.filter(item => item.zone === zone));
      setFilteredPowerData(powerData.filter(item => item.zone === zone));
    } else {
      setFilteredInventoryData(inventoryData);
      setFilteredPowerData(powerData);
    }
  }, [zone, inventoryData, powerData]);

  // Bar chart data for Production Target vs Achievement
  const productionBarData = {
    labels: ['Target', 'Actual'],
    datasets: [
      {
        label: 'Production (Units)',
        data: [productionData.target, productionData.actual],
        backgroundColor: ['#4caf50', '#ff9800'],
      },
    ],
  };

  // Line chart data for Material Inventory
  const inventoryLineData = {
    labels: filteredInventoryData.map(item => item.date),
    datasets: [
      {
        label: 'Current Stock',
        data: filteredInventoryData.map(item => item.currentStock),
        borderColor: '#42a5f5',
        fill: false,
      },
      {
        label: 'Minimum Required',
        data: filteredInventoryData.map(item => item.minimumRequired),
        borderColor: '#ef5350',
        fill: false,
      },
    ],
  };

  // Line chart data for Power Consumption
  const powerLineData = {
    labels: filteredPowerData.map(item => item.date),
    datasets: [
      {
        label: 'Power Consumed',
        data: filteredPowerData.map(item => item.powerConsumed),
        borderColor: '#66bb6a',
        fill: false,
      },
      {
        label: 'Downtime Duration',
        data: filteredPowerData.map(item => item.downtimeDuration),
        borderColor: '#ffa726',
        fill: false,
      },
    ],
  };

  return (
    <div className="report-dashboard-container">
      <h1>Production Dashboard</h1>
      
      {/* Zone Selection */}
      <label htmlFor="zone-select">Select Zone: </label>
      <select id="zone-select" value={zone} onChange={(e) => setZone(e.target.value)}>
        <option value="">All Zones</option>
        <option value="Zone A">Zone A</option>
        <option value="Zone B">Zone B</option>
        <option value="Zone C">Zone C</option>
      </select>

      {/* Display OEE Summary */}
      <div className="oee-summary">
        <h2>OEE Summary</h2>
        <p>OEE: {oeeData.oee}%</p>
        <p>Availability: {oeeData.availability}%</p>
        <p>Performance: {oeeData.performance}%</p>
        <p>Quality: {oeeData.quality}%</p>
      </div>

      {/* Production Target vs Achievement Bar Chart */}
      <div className="data-section">
        <h2>Production Target vs. Achievement</h2>
        <Bar data={productionBarData} />
      </div>

      {/* Material Inventory Line Chart */}
      <div className="data-section">
        <h2>Material Inventory</h2>
        <Line data={inventoryLineData} />
      </div>

      {/* Power Consumption Line Chart */}
      <div className="data-section">
        <h2>Power Consumption</h2>
        <Line data={powerLineData} />
      </div>
    </div>
  );
};

export default Dashboard;
