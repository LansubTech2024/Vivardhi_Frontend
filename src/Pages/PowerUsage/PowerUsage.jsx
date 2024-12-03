import React from "react";
import PowerUsageCard from "../../Components/PowerUsage/livePowerUsageCard/PowerUsageCard";
import LivePowerUsageGraph from "../../Components/PowerUsage/livePowerUsageGraph/PowerUsageGraph";
import EnergyConsumptionGraph from "../../Components/PowerUsage/livePowerUsageGraph/EnergyConsume";
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
        <h2>Power Analysis</h2>
        <div className="power-container">
          <div className="power-card">
            <PowerUsageCard />
          </div>
          <h2>Current Power Usage</h2>
          <div className="power-grid">
            <div className="power-graph" style={{height:"300px"}}>
            <LivePowerUsageGraph />
            </div>
            <h2>Energy Consumption</h2>
            <div className="power-graph">
            <EnergyConsumptionGraph/>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default PowerUsageDashboard;
