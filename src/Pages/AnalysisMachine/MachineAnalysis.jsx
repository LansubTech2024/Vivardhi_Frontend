import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/SideBar/Sidebar";
import "./MachineAnalysis.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
// import { Chart as ChartJS, ArcElement,Tooltip, Legend } from "chart.js";
// ChartJS.register(ArcElement, Tooltip, Legend);

const MachineAnalysis = () => {
  //state
  const [machines, setMachines] = useState([]);
  const navigate = useNavigate();

  // Fetch average machine data
  useEffect(() => {
    axios
       //.get("https://opfactback1-d0aec8cfeqcmbec8.canadacentral-01.azurewebsites.net/api/machines/averages")
      .get("http://localhost:5001/api/machines/averages")

      .then((response) => setMachines(response.data))
      .catch((error) => console.error("Error fetching machine data:", error));
  }, []);

  // Handle row click to display machine details
  const handleRowClick = (machineId) => {
    navigate(`/machine-details/${machineId}`);
  };

  // Preparing chart data (adjust based on available fields)
  const productionChartData = machines.map((machine) => ({
    machineId: machine.machineId,
    productionRate: parseFloat(machine.avgProductionRate),
    scrapRate: parseFloat(machine.avgScrapRate),
  }));

  const conditionChartData = machines.map((machine) => ({
    machineId: machine.machineId,
    temperature: parseFloat(machine.avgTemperature),
    downtime: parseFloat(machine.avgDowntime),
  }));

  // Function to return "-" if value is null or undefined
  const formatValue = (value) => {
    if (value == null || value === "" || value === "NaN") {
      return "-";
    }
    return parseFloat(value).toFixed(2);
  };

  return (
    <>
      <Header />
      <Sidebar />
      <div className="machines-container">
        <div className="machines-content">
          <h2>Machines Analysis</h2>
          <div className="machine-grid">
            {/* Production Metrics Chart */}
            <div className="chart-container">
              <h3>Production Metrics</h3>
              <ResponsiveContainer width={500} height={300}>
             
                <LineChart data={productionChartData}>
                  <XAxis dataKey="machineId" />
                  <CartesianGrid strokeDasharray="3 3" />
                  <YAxis />
                  <Tooltip />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                  />
                  <Line
                    type="monotone"
                    dataKey="productionRate"
                    stroke="rgb(13 148 136)"
                    strokeWidth={2.5}
                    name="Production Rate"
                  />
                  <Line
                    type="monotone"
                    dataKey="scrapRate"
                    stroke="rgb(45 212 191)"
                    strokeWidth={2.5}
                    name="Scrap Rate"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Machine Condition Metrics Chart */}
            <div className="chart-container">
              <h3>Machine Condition Metrics</h3>
              <ResponsiveContainer width={500} height={300}>
                <LineChart data={conditionChartData}>
                  <XAxis dataKey="machineId" />
                  <CartesianGrid strokeDasharray="3 3" />
                  <YAxis />
                  <Tooltip />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                  />
                  <Line
                    type="monotone"
                    dataKey="temperature"
                    stroke="rgb(45 212 191)"
                    strokeWidth={2.5}
                    name="Temperature"
                  />
                  <Line
                    type="monotone"
                    dataKey="downtime"
                    stroke="rgb(13 148 136)"
                    strokeWidth={2.5}
                    name="Downtime"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <h2>Machines Overview</h2>
          <div className="analysis-table">
            <table>
              <thead>
                <tr>
                  <th>Machine ID</th>
                  <th>Production Rate</th>
                  <th>Scrap Rate</th>
                  <th>Downtime</th>
                  <th>Temperature</th>
                  <th>Energy Consumption</th>
                </tr>
              </thead>
              <tbody>
                {machines.map((machine) => (
                  <tr
                    key={machine.machineId}
                    onClick={() => handleRowClick(machine.machineId)}
                  >
                    <td>{machine.machineId}</td>
                    <td>{formatValue(machine.avgProductionRate)}</td>
                    <td>{formatValue(machine.avgScrapRate)}</td>
                    <td>{formatValue(machine.avgDowntime)}</td>
                    <td>{formatValue(machine.avgTemperature)}</td>
                    <td>{formatValue(machine.avgEnergyConsumption)}</td>
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

export default MachineAnalysis;
