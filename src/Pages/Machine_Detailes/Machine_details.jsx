import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/SideBar/Sidebar";
import "./Machine_details.css";

const MachineDetails = () => {
  const { id } = useParams(); 
  const [machine, setMachine] = useState(null);

  useEffect(() => {
    // Fetch data from the backend for the selected machineId
    const fetchMachineDetails = async () => {
      try {
        //const response = await fetch(`https://opfactback1-d0aec8cfeqcmbec8.canadacentral-01.azurewebsites.net/api/machines/${id}`);
        const response = await fetch(`http://localhost:5000/api/machines/${id}`);
        const data = await response.json();
        setMachine(data[0]); // Since it's a single machine
      } catch (error) {
        console.error("Error fetching machine details:", error);
      }
    };

    fetchMachineDetails();
  }, [id]);

  if (!machine) return <p>Loading...</p>;

  // Function to handle NaN or missing values
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
      <div className="machine-container">
        <div className="machine-details">
          <h2 className="machine-header">
            Details for {machine.equipmentName}
          </h2>
          <div className="details-container">
            <div className="details-card">
              <strong>Spindle Speed:</strong> {formatValue(machine.avgSpindleSpeed)}
            </div>
            <div className="details-card">
              <strong>Part Rejection Rate:</strong> {formatValue(machine.avgPartRejectionRate)}
            </div>
            <div className="details-card">
              <strong>Utilization Rate:</strong> {formatValue(machine.avgUtilizationRate)}
            </div>
            <div className="details-card">
              <strong>Feed Rate:</strong> {formatValue(machine.avgFeedRate)}
            </div>
            <div className="details-card">
              <strong>Cycle Time:</strong> {formatValue(machine.avgCycleTime)}
            </div>
            <div className="details-card">
              <strong>Machine Utilization:</strong> {formatValue(machine.avgMachineUtilization)}
            </div>
            <div className="details-card">
              <strong>Temperature:</strong> {formatValue(machine.avgTemperature)}
            </div>
            <div className="details-card">
              <strong>Chuck Pressure:</strong> {formatValue(machine.avgChuckPressure)}
            </div>
            <div className="details-card">
              <strong>Downtime:</strong> {formatValue(machine.avgDowntime)}
            </div>
            <div className="details-card">
              <strong>Cut Depth:</strong> {formatValue(machine.avgCutDepth)}
            </div>
            <div className="details-card">
              <strong>Material Removal Rate:</strong>{" "}
              {formatValue(machine.avgMaterialRemovalRate)}
            </div>
            <div className="details-card">
              <strong>Surface Finish Quality:</strong>{" "}
              {formatValue(machine.avgSurfaceFinishQuality)}
            </div>
            <div className="details-card">
              <strong>Tool Life:</strong> {formatValue(machine.avgToolLife)}
            </div>
            <div className="details-card">
              <strong>Tool Wear:</strong> {formatValue(machine.avgToolWear)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MachineDetails;
