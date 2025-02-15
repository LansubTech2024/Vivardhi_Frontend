import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Line, Bar } from 'react-chartjs-2';
import Speedometer from 'react-d3-speedometer';
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
  const [overallProductivity, setOverallProductivity] = useState(0);
  const [scrapRate, setScrapRate] = useState(0);
  const [defectRate, setDefectRate] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://opfactback1-d0aec8cfeqcmbec8.canadacentral-01.azurewebsites.net/api/productivity');
        // const response = await axios.get('http://localhost:5000/api/productivity');
        setData(response.data);
        // Calculate summary values for speedometers
        const totalProductivity = response.data.reduce((sum, item) => sum + item.overallProductivity, 0);
        setOverallProductivity(totalProductivity / response.data.length || 0);
        
        const totalScrap = response.data.reduce((sum, item) => sum + item.wasteScrap, 0);
        const totalDefects = response.data.reduce((sum, item) => sum + item.wasteDefect, 0);
        const totalActualProduction = response.data.reduce((sum, item) => sum + item.actualProduction, 0);

        // Calculate scrap and defect rates as percentages
        setScrapRate(totalActualProduction > 0 ? (totalScrap / totalActualProduction) * 100 : 0);
        setDefectRate(totalActualProduction > 0 ? (totalDefects / totalActualProduction) * 100 : 0);
      } catch (error) {
        console.error('Error fetching productivity data:', error);
      }
    };
    fetchData();
  }, []);

  // Format dates to only show month/day
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Line Chart Data for Production Trends
  const lineChartData = {
    labels: data.map((item) => formatDate(item.date)),
    datasets: [
      {
        label: 'Target Production',
        data: data.map(item => item.targetProduction),
        borderColor: 'rgb(13 148 136)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Actual Production',
        data: data.map(item => item.actualProduction),
        borderColor: 'rgb(45 212 191)',
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

  // Bar Chart Data for Material Flow
  const barChartData = {
    labels: data.map((item) => formatDate(item.date)),
    datasets: [
      {
        label: 'Raw Material Input',
        data: data.map(item => item.rawMaterialInput),
        backgroundColor: 'rgb(20 184 166)',
      },
      {
        label: 'Raw Material Output',
        data: data.map(item => item.rawMaterialOutput),
        backgroundColor: 'rgb(153 246 228)',
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
        {/* Metrics Cards */}
        <div className="production-metrics-cards">
          <div className="production-card">
            <h3>Target Production</h3>
            <p>{data.reduce((sum, item) => sum + item.targetProduction, 0)}</p>
          </div>
          <div className="production-card">
            <h3>Actual Production</h3>
            <p>{data.reduce((sum, item) => sum + item.actualProduction, 0)}</p>
          </div>
          <div className="production-card-meter" style={{ width: '140px', height: '150px' }}>
            
            <CircularProgressbar
                value={overallProductivity}
                text={`${Math.round(overallProductivity)}%`}
                styles={buildStyles({
                  textColor: 'rgb(13 148 136)',
                  pathColor: 'rgb(13 148 136)',
                  trailColor: '#d6d6d6'
                })}
              />
              <h3>Overall Productivity</h3>
          </div>
          <div className="production-card-meter"style={{ width: '140px', height: '150px' }}>
              
              <CircularProgressbar
                value={scrapRate}
                text={`${Math.round(scrapRate)}%`}
                styles={{
                  path: { stroke: `rgb(20 184 166)` },
                  text: { fill: 'red', fontSize: '16px' },
                }}
              />
              <h3>Scrap Rate</h3>
            </div>
            <div className="production-card-meter"style={{ width: '140px', height: '150px' }}>
              
              <CircularProgressbar
                value={defectRate}
                text={`${Math.round(defectRate)}%`}
                styles={{
                  path: { stroke: `rgb(45 212 191)` },
                  text: { fill: 'orange', fontSize: '16px' },
                }}
              />
              <h3>Defect Rate</h3>
            </div>
        </div>

        {/* Line Chart for Production Trend */}
        <div className='production-chart-grid'>
        <div className="production-chart-container">
          <h3>Production Trend (Target vs. Actual)</h3>
          <Line width={500} height={300} data={lineChartData} options={lineChartOptions}/>
        </div>

        {/* Bar Chart for Material Flow */}
        <div className="production-chart-container">
          <h3>Material Flow (Input vs. Output)</h3>
          <Bar width={500} height={300} data={barChartData} options={barChartOptions}/>
        </div>
        </div>
        {/* Detailed Table */}
        <div className='production-table'>
          <h3>Detailed Productivity Metrics</h3>
          <table>
            <thead>
              <tr>
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
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.machineId}</td>
                  <td>{formatDate(item.date)}</td>
                  <td>{item.targetProduction}</td>
                  <td>{item.actualProduction}</td>
                  <td>{item.rawMaterialInput}</td>
                  <td>{item.rawMaterialOutput}</td>
                  <td>{item.wasteScrap}</td>
                  <td>{item.wasteDefect}</td>
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
