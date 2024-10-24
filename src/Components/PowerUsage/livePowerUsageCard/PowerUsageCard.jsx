import React, { useState, useEffect } from "react";
import { updateLivePowerUsage, livePowerUsage } from "../livePowerUsage";
import DowntimeCard from "./DowntimeCard";
import "./PowerUsageCard.css";

const PowerUsageCard = () => {
  const [currentUsage, setCurrentUsage] = useState(livePowerUsage); // Initial live usage value
  const [dailyAverage, setDailyAverage] = useState(livePowerUsage); // Initial daily average
  const [peakPower, setPeakPower] = useState(livePowerUsage); // Initial peak power
  const [showAlert, setShowAlert] = useState(false); // Alert state

  const HIGH_POWER_THRESHOLD = 280; // Threshold for high power usage alert

  useEffect(() => {
    // Update the live power usage every 2 seconds
    const interval = setInterval(() => {
      const newUsage = updateLivePowerUsage();
      setCurrentUsage(newUsage); // Set current power usage
      setPeakPower((prevPeak) => Math.max(prevPeak, newUsage)); // Update peak power usage
      setDailyAverage((prevAverage) => (prevAverage + newUsage) / 2); // Calculate daily average

      // Check if the power exceeds the threshold to trigger the alert
      if (newUsage > HIGH_POWER_THRESHOLD) {
        setShowAlert(true);
      } else {
        setShowAlert(false);
      }
    }, 2000); // Updates every 2000 milliseconds (2 seconds)

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <div className="power-usage-card-container">
    <h2>Power Usage Metrics</h2>
    <div className="power-usage-card">
      <div className="power-cards">
        <h3>Current Power Usage</h3>
        <p> {currentUsage} kW</p>
      </div>
      <div className="power-cards">
        <h3>Daily Average Power</h3>
        <p>{dailyAverage.toFixed(2)} kW</p>
      </div>
      <div className="power-cards">
        <h3>Peak Power Usage</h3>
        <p>{peakPower} kW</p>
      </div>
      <DowntimeCard/>
      {/* Display alert if power exceeds the threshold */}
      {showAlert && (
        <div className="alert">
          <strong>⚠ High Power Usage Alert!</strong>
          <p>
            Current power usage has exceeded the threshold of{" "}
            {HIGH_POWER_THRESHOLD} kW.
          </p>
          <h4>Actionable Insights:</h4>
          <ul>
            <li>
              Check if any machinery is malfunctioning or running inefficiently.
            </li>
            <li>
              Consider rescheduling non-critical tasks to reduce the load.
            </li>
            <li>Monitor power usage closely to avoid potential overloads.</li>
          </ul>
        </div>
      )}
    </div>
    </div>
  );
};

export default PowerUsageCard;
