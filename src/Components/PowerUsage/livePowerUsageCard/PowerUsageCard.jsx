
import React from 'react';
import { usePowerUsageMetrics } from '../../../hooks/powerUsageMetrics';
import './PowerUsageCard.css'

const PowerUsageMetrics = () => {
  const metrics = usePowerUsageMetrics();

  if (!metrics) return <p>Loading...</p>;

  return (
    <div className="power-usage-card">
      <div className="power-cards">
        <h3>Current Power Usage</h3>
        <p>{metrics.currentUsage} kW</p>
      </div>
      <div className="power-cards">
        <h3>Daily Average Power</h3>
        <p>{Number(metrics.dailyAveragePower || 0).toFixed(2)} kW</p>
      </div>
      <div className="power-cards">
        <h3>Peak Power</h3>
        <p>{metrics.peakPower} kW</p>
      </div>
      {/* Alert and Suggestion */}
        {metrics.alert && (
        <div className="alert">
          <h3>Alert: {metrics.alert}</h3>
          <p>Suggestion: {metrics.suggestion}</p>
        </div>
      )}
    </div>
  );
};

export default PowerUsageMetrics;
