import React from "react";
import PowerUsageCard from "../../Components/PowerUsage/livePowerUsageCard/PowerUsageCard";
import LivePowerUsageGraph from "../../Components/PowerUsage/livePowerUsageGraph/PowerUsageGraph";
import "./PowerUsage.css";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/SideBar/Sidebar";

const PowerUsageDashboard = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="power-container-div">
      <div className="power-dashboard">
        <h1>Power Usage Dashboard</h1>
        <div className="power-container">
          <div className="power-card">
            <PowerUsageCard />
          </div>
          <h2>Current Power Usage</h2>
          <div className="power-graph">
            <LivePowerUsageGraph />
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default PowerUsageDashboard;
