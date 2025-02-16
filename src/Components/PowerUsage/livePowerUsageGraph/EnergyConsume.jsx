import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { DateRangePicker } from 'react-date-range'; // Add date range picker
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
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


ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const EnergyConsumptionGraph = () => {
  const [graphData, setGraphData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    const fetchEnergyConsumption = async () => {
      try {

        // const response = await axios.get("https://opfactback1-d0aec8cfeqcmbec8.canadacentral-01.azurewebsites.net/api/energy-consumption", {
        
        const response = await axios.get("http://localhost:5000/api/energy-consumption", {

            params: { startDate, endDate }, // Send date range to the backend
          });
        const data = response.data;

        // Extract dates and energy consumption values
        const dates = data.map((entry) => entry.date);
        const energyValues = data.map((entry) => entry.energyConsumption);

        setLabels(dates);
        setGraphData(energyValues);
      } catch (error) {
        console.error('Error fetching energy consumption data:', error);
      }
    };

    fetchEnergyConsumption();
  }, [startDate, endDate]);

  const handleSelectDateRange = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const chartData = {
    labels, 
    datasets: [
      {
        label: 'Energy Consumption (kW)',
        data: graphData, 
      //  borderColor: "red", 
      //  backgroundColor: "rgba(255, 0, 0, 0.2)", 
      //  pointBorderColor: "blue", 
      //  pointBackgroundColor: "yellow",
        backgroundColor: 'rgba(38, 174, 174, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        tension: 0.4, 
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
        grid: { display: false },
        ticks: {
          callback: function (value) {
            
            const date = new Date(labels[value]);
            return date.toLocaleDateString('en-US', {
                month: '2-digit',
                day: '2-digit',
              });
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Energy Consumption (kW)',
        },
        grid: { display: false },
      },
    },
  };

  return (
    <div>
      <h3>Energy Consumption Over Time</h3>
      <div className="date-energy">
      <div className="date-range-picker"> 
      <DateRangePicker
        ranges={[{ startDate, endDate, key: 'selection' }]}
        onChange={handleSelectDateRange}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={1}
        direction="horizontal"
      />
      </div>
      <Line data={chartData} options={options} width={500} height={150} />
      </div>
    </div>
  );
};

export default EnergyConsumptionGraph;
