import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Line, Bar } from 'react-chartjs-2';
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/SideBar/Sidebar";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './Productivity.css';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const ProductivityTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [overallProductivity, setOverallProductivity] = useState(0);
  const [scrapRate, setScrapRate] = useState(0);
  const [defectRate, setDefectRate] = useState(0);
  const [selectedZone, setSelectedZone] = useState('all');
  const [selectedMachine, setSelectedMachine] = useState('all');
  const [zones, setZones] = useState(['Zone 1', 'Zone 2', 'Zone 3']);
  const [machines, setMachines] = useState({
    'Zone 1': ['Machine 1-A', 'Machine 1-B', 'Machine 1-C'],
    'Zone 2': ['Machine 2-A', 'Machine 2-B', 'Machine 2-C'],
    'Zone 3': ['Machine 3-A', 'Machine 3-B', 'Machine 3-C']
  });

  // New state variables for animations
  const [productivityAnimation, setProductivityAnimation] = useState(0);
  const [scrapAnimation, setScrapAnimation] = useState(0);
  const [defectAnimation, setDefectAnimation] = useState(0);

  const getAvailableMachines = () => {
    if (selectedZone === 'all') {
      return Object.values(machines).flat();
    }
    return machines[selectedZone] || [];
  };

  const updateDataPoint = (item) => {
    const fluctuation = Math.random() * 10 - 5;
    return {
      ...item,
      actualProduction: Math.max(0, item.actualProduction + fluctuation),
      overallProductivity: Math.min(100, Math.max(0, item.overallProductivity + (Math.random() * 2 - 1))),
      wasteScrap: Math.max(0, item.wasteScrap + (Math.random() * 2 - 1)),
      wasteDefect: Math.max(0, item.wasteDefect + (Math.random() * 2 - 1)),
      rawMaterialInput: Math.max(0, item.rawMaterialInput + (Math.random() * 4 - 2)),
      rawMaterialOutput: Math.max(0, item.rawMaterialOutput + (Math.random() * 4 - 2))
    };
  };

  const filterData = (data) => {
    return data.filter(item => {
      const zoneMatch = selectedZone === 'all' || item.zone === selectedZone;
      const machineMatch = selectedMachine === 'all' || item.machineId === selectedMachine;
      return zoneMatch && machineMatch;
    });
  };

  const updateMetrics = (filteredData) => {
    // Calculate target values
    const targetProductivity = filteredData.reduce((sum, item) => sum + item.overallProductivity, 0) / filteredData.length || 0;
    const totalActualProduction = filteredData.reduce((sum, item) => sum + item.actualProduction, 0);
    const totalScrap = filteredData.reduce((sum, item) => sum + item.wasteScrap, 0);
    const totalDefects = filteredData.reduce((sum, item) => sum + item.wasteDefect, 0);
    
    const targetScrapRate = totalActualProduction > 0 ? (totalScrap / totalActualProduction) * 100 : 0;
    const targetDefectRate = totalActualProduction > 0 ? (totalDefects / totalActualProduction) * 100 : 0;

    // Update actual values with smooth animation
    setOverallProductivity(targetProductivity);
    setScrapRate(targetScrapRate);
    setDefectRate(targetDefectRate);

    // Update animation values
    setProductivityAnimation(prev => prev + (targetProductivity - prev) * 0.1);
    setScrapAnimation(prev => prev + (targetScrapRate - prev) * 0.1);
    setDefectAnimation(prev => prev + (targetDefectRate - prev) * 0.1);
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/productivity');
        const dataWithZonesAndMachines = response.data.map(item => {
          const zone = `Zone ${Math.floor(Math.random() * 3) + 1}`;
          const zoneMachines = machines[zone];
          const machineId = zoneMachines[Math.floor(Math.random() * zoneMachines.length)];
          return { ...item, zone, machineId };
        });
        setData(dataWithZonesAndMachines);
        const filtered = filterData(dataWithZonesAndMachines);
        setFilteredData(filtered);
        updateMetrics(filtered);
      } catch (error) {
        console.error('Error fetching productivity data:', error);
      }
    };

    fetchInitialData();

    const updateInterval = setInterval(() => {
      setData(prevData => {
        const updatedData = prevData.map(updateDataPoint);
        const filtered = filterData(updatedData);
        setFilteredData(filtered);
        updateMetrics(filtered);
        return updatedData;
      });
    }, 100); // Changed from 1000 to 100 for smoother animation

    return () => clearInterval(updateInterval);
  }, [selectedZone, selectedMachine]);

  const handleZoneChange = (e) => {
    const newZone = e.target.value;
    setSelectedZone(newZone);
    setSelectedMachine('all');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const lineChartData = {
    labels: filteredData.map((item) => formatDate(item.date)),
    datasets: [
      {
        label: 'Target Production',
        data: filteredData.map(item => item.targetProduction),
        borderColor: 'rgb(27 148 228 / 82%)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Actual Production',
        data: filteredData.map(item => item.actualProduction),
        borderColor: 'rgb(158 216 255 / 85%)',
        backgroundColor: '#B9D9EB',
        fill: true,
      }
    ]
  };

  const lineChartOptions = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false
    },
    plugins: {
      tooltip: {
        enabled: true
      },
      legend: {
        display: true
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        grid: {
          display: false
        }
      }
    }
  };

  const barChartData = {
    labels: filteredData.map((item) => formatDate(item.date)),
    datasets: [
      {
        label: 'Raw Material Input',
        data: filteredData.map(item => item.rawMaterialInput),
        backgroundColor: 'rgb(27 148 228 / 82%)',
      },
      {
        label: 'Raw Material Output',
        data: filteredData.map(item => item.rawMaterialOutput),
        backgroundColor: 'rgb(158 216 255 / 85%)',
      }
    ]
  };

  const barChartOptions = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false
    },
    plugins: {
      tooltip: {
        enabled: true
      },
      legend: {
        display: true
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <>
      <Header/>
      <Sidebar/>
      <div className='productivity-container'>
        <div className='productivity'>
          <h2>Productivity</h2>

          <div className="filter-section flex gap-4 mb-4">
            <div className="filter-group">
              <label className="mr-2">Zone:</label>
              <select 
                className="p-2 border rounded"
                value={selectedZone}
                onChange={handleZoneChange}
              >
                <option value="all">All Zones</option>
                {zones.map(zone => (
                  <option key={zone} value={zone}>{zone}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label className="mr-2">Machine:</label>
              <select 
                className="p-2 border rounded"
                value={selectedMachine}
                onChange={(e) => setSelectedMachine(e.target.value)}
              >
                <option value="all">All Machines</option>
                {getAvailableMachines().map(machine => (
                  <option key={machine} value={machine}>{machine}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="production-metrics-cards">
            <div className="production-card">
              <h3>Target Production</h3>
              <p>{filteredData.reduce((sum, item) => sum + item.targetProduction, 0).toFixed(1)}</p>
            </div>
            <div className="production-card">
              <h3>Actual Production</h3>
              <p>{filteredData.reduce((sum, item) => sum + item.actualProduction, 0).toFixed(1)}</p>
            </div>
            <div className="production-card-meter" style={{ width: '140px', height: '150px' }}>
              <CircularProgressbar
                value={productivityAnimation}
                text={`${Math.round(productivityAnimation)}%`}
                styles={buildStyles({
                  textColor: 'rgb(0 212 83)',
                  pathColor: 'rgb(52 152 219 / 87%)',
                  trailColor: '#d6d6d6',
                  pathTransition: 'stroke-dashoffset 0.1s ease 0s'
                })}
              />
              <h3>Overall Productivity</h3>
            </div>
            <div className="production-card-meter" style={{ width: '140px', height: '150px' }}>
              <CircularProgressbar
                value={scrapAnimation}
                text={`${Math.round(scrapAnimation)}%`}
                styles={buildStyles({
                  pathColor: 'rgb(103 191 250 / 86%)',
                  textColor: '#1f1f1f',
                  trailColor: '#d6d6d6',
                  pathTransition: 'stroke-dashoffset 0.1s ease 0s'
                })}
              />
              <h3>Scrap Rate</h3>
            </div>
            <div className="production-card-meter" style={{ width: '140px', height: '150px' }}>
              <CircularProgressbar
                value={defectAnimation}
                text={`${Math.round(defectAnimation)}%`}
                styles={buildStyles({
                  pathColor: 'rgb(158 216 255 / 85%)',
                  textColor: 'orange',
                  trailColor: '#f3f6fc',
                  pathTransition: 'stroke-dashoffset 0.1s ease 0s'
                })}
              />
              <h3>Defect Rate</h3>
            </div>
          </div>

          <div className='production-chart-grid'>
            <div className="production-chart-container">
              <h3>Production Trend (Target vs. Actual)</h3>
              <Line width={500} height={300} data={lineChartData} options={lineChartOptions}/>
            </div>

            <div className="production-chart-container">
              <h3>Material Flow (Input vs. Output)</h3>
              <Bar width={500} height={300} data={barChartData} options={barChartOptions}/>
            </div>
          </div>

          <div className='production-table'>
            <h3>Detailed Productivity Metrics</h3>
            <table>
              <thead>
                <tr>
                  <th>Zone</th>
                  <th>Machine</th>
                  <th>Date</th>
                  <th>Target Production</th>
                  <th>Actual Production</th>
                  <th>Raw Material Input</th>
                  <th>Raw Material Output</th>
                  <th>Scrap</th>
                  <th>Defects</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.zone}</td>
                    <td>{item.machineId}</td>
                    <td>{formatDate(item.date)}</td>
                    <td>{item.targetProduction.toFixed(1)}</td>
                    <td>{item.actualProduction.toFixed(1)}</td>
                    <td>{item.rawMaterialInput.toFixed(1)}</td>
                    <td>{item.rawMaterialOutput.toFixed(1)}</td>
                    <td>{item.wasteScrap.toFixed(1)}</td>
                    <td>{item.wasteDefect.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductivityTable;