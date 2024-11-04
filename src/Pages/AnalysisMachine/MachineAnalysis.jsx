import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/SideBar/Sidebar";
import "./MachineAnalysis.css";
import { Bar, Doughnut } from "react-chartjs-2";
import GaugeChart from "react-gauge-chart";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const MachineAnalysis = () => {
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/detailed-machine"
        );
        setMachines(response.data);
      } catch (error) {
        console.error("Error fetching machines:", error);
      }
    };

    fetchMachines();
  }, []);

  const powerData = {
    labels: machines.map((machine) => machine.machineId),
    datasets: [
      {
        label: "Power Consumption",
        data: machines.map((machine) => machine.powerConsumed || 0),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const averageEfficiency =
    machines.reduce((sum, machine) => sum + machine.efficiency, 0) /
    machines.length;

  return (
    <>
      <Header />
      <Sidebar />
      <div className="machines-container">
        <div className="machines-content">
        <h2>Machine Analysis</h2>
          <div className="analysis-cards-container">
            {machines.map((machine) => (
              <div className="analysis-card" key={machine.machineId}>
                <h2>{machine.machineId}</h2>
                {/* <p>Age: {machine.age} years</p>
                        <p>Lifespan: {machine.lifespan} years</p> */}
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
            <Bar data={powerData} width={500} height={250} />
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
          </div>
          <h2>Machines Overview</h2>
          <div className="analysis-table">
            <table>
              <thead>
                <tr>
                  <th>Machine</th>
                  {/* <th>Name</th>
                            <th>Age</th>
                            <th>Lifespan</th> */}
                  <th>Power Consumed</th>
                  <th>Total Downtime</th>
                  <th>Good Pieces</th>
                </tr>
              </thead>
              <tbody>
                {machines.map((machine) => (
                  <tr key={machine.machineId}>
                    <td>{machine.machineId}</td>
                    {/* <td>{machine.machineName}</td>
                                <td>{machine.age}</td>
                                <td>{machine.lifespan}</td> */}
                    <td>{machine.powerConsumed}</td>
                    <td>{machine.totalDowntimeDuration}</td>
                    <td>{machine.goodPieces}</td>
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
