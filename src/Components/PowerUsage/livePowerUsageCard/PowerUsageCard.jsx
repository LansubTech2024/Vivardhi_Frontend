import React, { useState, useEffect } from 'react';
import { updateLivePowerUsage, livePowerUsage } from '../livePowerUsage';
import './PowerUsageCard.css';

const PowerUsageCard = () => {
  const [currentUsage, setCurrentUsage] = useState(livePowerUsage); // Initial live usage value

  useEffect(() => {
    // Update the live power usage every 2 seconds
    const interval = setInterval(() => {
      setCurrentUsage(updateLivePowerUsage());
    }, 2000); // Updates every 2000 milliseconds (2 seconds)

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <div className="power-usage-card">
      <h2>Current Power Usage</h2>
      <p>{currentUsage} kW</p> {/* Display live usage */}
    </div>
  );
};

export default PowerUsageCard;
