import React from 'react';
import './CNC machine.css';
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/SideBar/Sidebar';
import { useNavigate } from 'react-router-dom';

const CNCmachine = () => {
  const navigate = useNavigate();
  const machineData = [
    {
      machine: "Machine 1",
      health: "Good",
      predictedFailures: 0,
      nextMaintenance: "4 days",
      lastRun: "5/25/2023 7:00 AM",
      requiredHours: 16,
      actualHours: 14.5
    },
    {
      machine: "Machine 2",
      health: "Fair",
      predictedFailures: 2,
      nextMaintenance: "2 days",
      lastRun: "5/25/2023 7:00 AM",
      requiredHours: 16,
      actualHours: 12.8
    },
    {
      machine: "Machine 3",
      health: "Poor",
      predictedFailures: 6,
      nextMaintenance: "1 day",
      lastRun: "5/25/2023 7:00 AM",
      requiredHours: 16,
      actualHours: 8.2
    }
  ];

  const maintenanceData = [
    {
      machine: "Machine 1",
      status: "Pending",
      requestedOn: "5/29/2023 7:00 PM",
      requestedBy: "Operator 1",
      priority: "Medium"
    },
    {
      machine: "Machine 2",
      status: "Approved",
      requestedOn: "5/30/2023 7:00 PM",
      requestedBy: "Operator 2",
      priority: "High"
    },
    {
      machine: "Machine 3",
      status: "Completed",
      requestedOn: "5/31/2023 7:00 PM",
      requestedBy: "Operator 3",
      priority: "Low"
    }
  ];

  const getBadgeClass = (type, value) => {
    const classes = {
      health: {
        Good: 'badge-success',
        Fair: 'badge-warning',
        Poor: 'badge-danger'
      },
      status: {
        Pending: 'badge-warning',
        Approved: 'badge-info',
        Completed: 'badge-success'
      },
      priority: {
        High: 'badge-danger',
        Medium: 'badge-warning',
        Low: 'badge-success'
      }
    };
    return `badge ${classes[type][value]}`;
  };
  
  
  const handleMachineClick = (Machine1) => {
    
    navigate("/machine/:Machine1");
    
  };


  return (
    <>
    <Header/>
    <Sidebar/>
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2>CNC Machines</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Machine</th>
                <th>Health</th>
                <th>Predicted Failures</th>
                <th>Next Maintenance</th>
                <th>Last Run</th>
                <th>Required Hours/Day</th>
                <th>Today's Runtime (Hours)</th>
              </tr>
            </thead>
            <tbody>
              
              {machineData.map((item, index) => (
                <tr key={index} onClick={() => handleMachineClick(item.Machine)}>
                  <td>{item.machine}</td>
                  <td>
                    <span className={getBadgeClass('health', item.health)}>
                      {item.health}
                    </span>
                  </td>
                  <td>{item.predictedFailures}</td>
                  <td>{item.nextMaintenance}</td>
                  <td>{item.lastRun}</td>
                  <td>{item.requiredHours}</td>
                  <td>{item.actualHours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="dashboard-card">
        <h2>Maintenance Requests</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Machine</th>
                <th>Status</th>
                <th>Requested On</th>
                <th>Requested By</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceData.map((item, index) => (
                <tr key={index}>
                  <td>{item.machine}</td>
                  <td>
                    <span className={getBadgeClass('status', item.status)}>
                      {item.status}
                    </span>
                  </td>
                  <td>{item.requestedOn}</td>
                  <td>{item.requestedBy}</td>
                  <td>
                    <span className={getBadgeClass('priority', item.priority)}>
                      {item.priority}
                    </span>
                  </td>
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


export default CNCmachine;