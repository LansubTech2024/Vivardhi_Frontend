import React, { useState, useEffect } from 'react';
import './PowerUsageCard.css';

const DowntimeCard = () => {
  const [downtime, setDowntime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate downtime randomly increasing every 5 minutes (use real data in production)
      setDowntime((prev) => prev + Math.floor(Math.random() * 10));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="downtime-card">
      <h3>Machine Downtime</h3>
      <p>Total Downtime: {downtime} minutes</p>
    </div>
  );
};

export default DowntimeCard;
