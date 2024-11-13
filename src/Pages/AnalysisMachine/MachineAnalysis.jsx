import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/SideBar/Sidebar";
import "./MachineAnalysis.css";
// import { Bar } from "react-chartjs-2";
// import GaugeChart from "react-gauge-chart";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const MachineAnalysis = () => {
  const [machines, setMachines] = useState([]);
  const navigate = useNavigate();
 

  // Fetch average machine data
  useEffect(() => {
    axios.get("https://opfactbackend-aeh5g0a3fkbtcbae.canadacentral-01.azurewebsites.net/api/machines/averages")
      .then(response => setMachines(response.data))
      .catch(error => console.error("Error fetching machine data:", error));
  }, []);

  // const powerData = {
  //   labels: machines.map((machine) => machine.machineId),
  //   datasets: [
  //     {
  //       label: "Power Consumption",
  //       data: machines.map((machine) => machine.powerConsumed || 0),
  //       backgroundColor: "rgb(59 130 246)",
  //     },
  //   ],
  // };

  // const averageEfficiency =
  //   machines.reduce((sum, machine) => sum + machine.efficiency, 0) /
  //   machines.length;

  //   const options = {
  //     scales: {
  //       x: {
  //         grid: {
  //           display: false, 
  //         },
  //       },
  //       y: {
  //         grid: {
  //           display: false, 
  //         },
  //       },
  //     },
  //   };

    // Handle row click to display machine details
    const handleRowClick = (machineId) => {
      navigate(`/machine-details/${machineId}`);
  };

  return (
    <>
      <Header />
      <Sidebar />
      <div className="machines-container">
        <div className="machines-content">
        {/* <h2>Machine Analysis</h2>
          <div className="analysis-cards-container">
            {machines.map((machine) => (
              <div className="analysis-card" key={machine.machineId}>
                <h2>{machine.machineId}</h2>
                <p>Age: {machine.age} years</p>
                        <p>Lifespan: {machine.lifespan} years</p>
                <p>Power Consumed: {machine.powerConsumed} kWh</p>
                <p>Total Downtime: {machine.totalDowntimeDuration} hours</p>
                <p>Good Pieces: {machine.goodPieces}</p>
              </div>
            ))}
          </div>
          <h2>Machine Power and Efficiency</h2>
          <div className="analysis-graph-grid">
          <div className="analysis-graph-card">
            <h2>Power Consumption</h2>
            <Bar data={powerData} options={options} width={500} height={250} />
          </div>
          <div className="analysis-graph-card">
            <h2>Machine Efficiency</h2>
            <GaugeChart
              id="gauge-chart"
              nrOfLevels={20}
              percent={averageEfficiency / 100} 
              arcWidth={0.3}
              textColor="#000"
              width={500}
              height={200}
            />
          </div>
          </div> */}
          <h2>Machines Overview</h2>
          <div className="analysis-table">
            <table>
              <thead>
                <tr>
                  <th>Machine</th>
                  <th>Production Rate</th>
                  <th>Scrap Rate</th>
                  <th>Downtime</th>
                </tr>
              </thead>
              <tbody>
                {machines.map((machine) => (
                  <tr key={machine.machineId} onClick={() => handleRowClick(machine.machineId)}>
                    <td>{machine.machineId}</td>
                    <td>{machine.averageProductionRate}</td>
                    <td>{machine.averageScrapRate}</td>
                    <td>{machine.averageDowntime}</td>
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
