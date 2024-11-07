import React,{useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/SideBar/Sidebar";
import "./Machine_details.css";
import axios from "axios";

const About = () => {
 const { id } = useParams(); // Get machineId from the URL
  const [machine, setMachine] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/machines/${id}`)
      .then(response => setMachine(response.data))
      .catch(error => console.error("Error fetching machine details:", error));
  }, [id]);

  if (!machine) return <p>Loading...</p>;
  return (
    <>
      <Header />
      <Sidebar />
      <div className="machine-container">
        <div className="machine-details">
          <h2 className="machine-header">
            Details for Machine {machine.machineId}
          </h2>
          <div className="details-container">
          <div className="details-card"><strong>Spindle Speed:</strong> {machine.spindleSpeed}</div>
        <div className="details-card"><strong>Production Rate:</strong> {machine.productionRate}</div>
        <div className="details-card"><strong>Scrap Rate:</strong> {machine.scrapRate}</div>
        <div className="details-card"><strong>Part Rejection Rate:</strong> {machine.partRejectionRate}</div>
        <div className="details-card"><strong>Equipment Name:</strong> {machine.equipmentName}</div>
        <div className="details-card"><strong>Allocated Hours:</strong> {machine.equipmentAllocatedHours}</div>
        <div className="details-card"><strong>Utilization Rate:</strong> {machine.utilizationRate}</div>
        <div className="details-card"><strong>Feed Rate:</strong> {machine.feedRate}</div>
        <div className="details-card"><strong>Cycle Time:</strong> {machine.cycleTime}</div>
        <div className="details-card"><strong>Machine Utilization:</strong> {machine.machineUtilization}</div>
        <div className="details-card"><strong>Temperature:</strong> {machine.temperature}</div>
        <div className="details-card"><strong>Chuck Pressure:</strong> {machine.chuckPressure}</div>
        <div className="details-card"><strong>Downtime:</strong> {machine.downtime}</div>
        <div className="details-card"><strong>Cut Depth:</strong> {machine.cutDepth}</div>
        <div className="details-card"><strong>Material Removal Rate:</strong> {machine.materialRemovalRate}</div>
        <div className="details-card"><strong>Surface Finish Quality:</strong> {machine.surfaceFinishQuality}</div>
        <div className="details-card"><strong>Tool Life:</strong> {machine.toolLife}</div>
        <div className="details-card"><strong>Tool Wear:</strong> {machine.toolWear}</div>
      </div>
        </div>
      </div>
    </>
  );
};

export default About;
