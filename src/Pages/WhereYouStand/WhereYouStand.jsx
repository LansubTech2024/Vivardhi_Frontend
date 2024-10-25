import React from 'react';
import './WhereYouStand.css';

const MetricsDashboard = () => {
  const metrics = [
    {
      value: "86%",
      title: "Customer satisfaction",
      subtitle: "Percentage of good customer satisfaction ratings"
    },
    {
      value: "10 hrs",
      title: "First reply time",
      subtitle: "Time it takes a first response to reach a customer"
    },
    {
      value: "1.5 min",
      title: "Average handling time",
      subtitle: "Average length of a call per customer"
    },
    {
      value: "4,884",
      title: "Request volume",
      subtitle: "Number of customer support enquiries per"
    },
    {
      value: "17",
      title: "Help centre articles",
      subtitle: "Number of articles"
    },
    {
      value: "3",
      title: "Number of apps",
      subtitle: "Number of third-party"
    }
  ];

  return (
    <div className="company-dashboard">
      <div className="company-dashboard-container">
        <h1 className="company-dashboard-title">See where you stand</h1>
        <p className="company-dashboard-subtitle">
          It's simple—select your industry and see how you're performing against your peers.
        </p>

        <div className="industry-selector">
          <label className="industry-label">Industry</label>
          <div className="select-wrapper">
            <select className="industry-select">
              <option value="retail">Retail</option>
              <option value="tech">Technology</option>
              <option value="healthcare">Healthcare</option>
            </select>
          </div>
        </div>

        <div className="company-metrics-grid">
          {metrics.map((metric, index) => (
            <div key={index} className="company-metric-card">
              <div className="company-metric-value">{metric.value}</div>
              <div className="company-metric-title">{metric.title}</div>
              <div className="company-metric-subtitle">{metric.subtitle}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MetricsDashboard;