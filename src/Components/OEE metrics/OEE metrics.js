import React from 'react';
import './OEE metrics.css';

const MetricCard = ({ icon, title, value }) => (
  <div className="metric-card">
    <div className="metric-icon">{icon}</div>
    <div className="metric-content">
      <h2 className="metric-title">{title}</h2>
      <p className="metric-value">{value}</p>
    </div>
  </div>
);

const ArrowIcon = ({ direction }) => {
  const getPath = () => {
    switch (direction) {
      case 'up':
        return "M205.66,117.66a8,8,0,0,1-11.32,0L136,59.31V216a8,8,0,0,1-16,0V59.31L61.66,117.66a8,8,0,0,1-11.32-11.32l72-72a8,8,0,0,1,11.32,0l72,72A8,8,0,0,1,205.66,117.66Z";
      case 'down':
        return "M205.66,149.66l-72,72a8,8,0,0,1-11.32,0l-72-72a8,8,0,0,1,11.32-11.32L120,196.69V40a8,8,0,0,1,16,0V196.69l58.34-58.35a8,8,0,0,1,11.32,11.32Z";
      case 'right':
        return "M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z";
      case 'left':
        return "M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z";
      default:
        return "";
    }
  };

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
      <path d={getPath()} />
    </svg>
  );
};

const MetricSection = ({ title, metrics }) => (
  <div className="metric-section">
    <h2 className="section-title">{title}</h2>
    <div className="metrics-grid">
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          icon={<ArrowIcon direction={metric.direction} />}
          title={metric.title}
          value={metric.value}
        />
      ))}
    </div>
  </div>
);



const Dashboard = () => {
  const mainMetrics = [
    { direction: 'up', title: 'Performance', value: '87%' },
    { direction: 'down', title: 'Quality', value: '97%' },
    { direction: 'right', title: 'Availability', value: '98%' },
    { direction: 'left', title: 'OEE', value: '82%' }
  ];

  const performanceMetrics = [
    { direction: 'up', title: 'Speed', value: '12%' },
    { direction: 'down', title: 'Feed Rate', value: '6%' },
    { direction: 'right', title: 'Cycle Time', value: '16%' },
    { direction: 'left', title: 'Downtime', value: '3%' }
  ];

  const qualityMetrics = [
    { direction: 'up', title: 'Scrap Rate', value: '3%' },
    { direction: 'down', title: 'Rework Rate', value: '1%' },
    { direction: 'right', title: 'First Pass Yield', value: '97%' },
    { direction: 'left', title: 'Defect Count', value: '2' }
  ];

  const availabilityMetrics = [
    { direction: 'up', title: 'Uptime', value: '96%' },
    { direction: 'down', title: 'Downtime', value: '4%' },
    { direction: 'right', title: 'Setup Time', value: '15%' },
    { direction: 'left', title: 'Changeover Time', value: '5' }
  ];

  return (
    <div className="dashboard-container">
        <h2>CNC</h2>
        <div className="metrics-grid">
          {mainMetrics.map((metric, index) => (
            <MetricCard
              key={index}
              icon={<ArrowIcon direction={metric.direction} />}
              title={metric.title}
              value={metric.value}
            />
          ))}
        </div>
        
        <MetricSection title="Performance" metrics={performanceMetrics} />
        <MetricSection title="Quality" metrics={qualityMetrics} />
        <MetricSection title="Availability" metrics={availabilityMetrics} />
      </div>
    
  );
};

export default Dashboard;