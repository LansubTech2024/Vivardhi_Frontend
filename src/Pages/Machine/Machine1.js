
import React, { useState } from 'react';
import './Machine1.css';
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/SideBar/Sidebar';

const Detailedmachine = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Sample data
  const machineData = {
    overview: {
      machineName: 'CNC Machine 1',
      status: 'Running',
      uptime: '85%',
      productivity: '92%',
      currentJob: 'Part XYZ-123',
      completedJobs: '45',
    },
    insights: {
      weeklyProduction: [
        { day: 'Monday', parts: 120 },
        { day: 'Tuesday', parts: 145 },
        { day: 'Wednesday', parts: 135 },
        { day: 'Thursday', parts: 150 },
        { day: 'Friday', parts: 130 }
      ],
      efficiency: '88%',
      qualityRate: '96%',
      averageCycleTime: '45 mins'
    },
    downtimeIncidents: [
      { id: 1, type: 'Operator Error', date: '6/23/22, 8:00 AM' },
      { id: 2, type: 'Tool Change', date: '6/21/22, 3:00 PM' },
      { id: 3, type: 'Machine Jam', date: '6/20/22, 12:00 PM' },
      { id: 4, type: 'Material Runout', date: '6/19/22, 10:00 AM' },
      { id: 5, type: 'Software Bug', date: '6/18/22, 5:00 PM' },
      { id: 6, type: 'Power Outage', date: '6/17/22, 2:00 PM' },
      { id: 7, type: 'Maintenance', date: '6/16/22, 8:00 AM' },
      { id: 8, type: 'Quality Issue', date: '6/15/22, 4:00 PM' },
      { id: 9, type: 'Training', date: '6/14/22, 1:00 PM' },
      { id: 10, type: 'Shipping Delay', date: '6/13/22, 11:00 AM' }
    ]
  };

  return (
    <>
    <Header/>
    <Sidebar/>
    <div className="dashboard">
      <div className="machine-dashboard-section">
      <h1>CNC Machine 1</h1>
      
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab ${activeTab === 'insights' ? 'active' : ''}`}
          onClick={() => setActiveTab('insights')}
        >
          Insights
        </button>
        <button 
          className={`tab ${activeTab === 'downtime' ? 'active' : ''}`}
          onClick={() => setActiveTab('downtime')}
        >
          Downtime
        </button>
      </div>

      <div className="content">
        {activeTab === 'overview' && (
          <div className="overview">
            <div className="status-card">
              <h3>Machine Status</h3>
              <p className="status">{machineData.overview.status}</p>
              <p>Uptime: {machineData.overview.uptime}</p>
              <p>Productivity: {machineData.overview.productivity}</p>
            </div>
            <div className="job-card">
              <h3>Current Job</h3>
              <p>Job: {machineData.overview.currentJob}</p>
              <p>Completed Jobs: {machineData.overview.completedJobs}</p>
            </div>
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="insights">
            <div className="metrics">
              <h3>Performance Metrics</h3>
              <div className="metrics-grid">
                <div className="metric">
                  <p>Efficiency</p>
                  <p className="value">{machineData.insights.efficiency}</p>
                </div>
                <div className="metric">
                  <p>Quality Rate</p>
                  <p className="value">{machineData.insights.qualityRate}</p>
                </div>
                <div className="metric">
                  <p>Avg. Cycle Time</p>
                  <p className="value">{machineData.insights.averageCycleTime}</p>
                </div>
              </div>
            </div>
            <div className="production">
              <h3>Weekly Production</h3>
              {machineData.insights.weeklyProduction.map((day) => (
                <div key={day.day} className="production-day">
                  <span>{day.day}</span>
                  <span>{day.parts} parts</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'downtime' && (
          <div className="downtime">
            {machineData.downtimeIncidents.map((incident) => (
              <div key={incident.id} className="incident">
                <div className="incident-info">
                  <p className="incident-type">{incident.type}</p>
                  <p className="incident-date">{incident.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
    </div>
    </>
  );
};

export default Detailedmachine;