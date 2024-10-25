import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import './OEE analysis.css';

const productionData = [
  { date: 'Jun 1', value: 4200 },
  { date: 'Jun 8', value: 3800 },
  { date: 'Jun 15', value: 4500 },
  { date: 'Jun 22', value: 5000 },
  { date: 'Jun 29', value: 4000 }
];

const defectData = [
  { week: 'Last Week', defects: 150 },
  { week: 'This Week', defects: 120 }
];

const scrapData = [
  { month: 'Last Month', scrap: 280 },
  { month: 'This Month', scrap: 220 }
];

// Target tracking data
const targetData = {
  target: 5000,
  achieved: 4200,
  missed: 800,
  reasons: [
    { id: 1, reason: "Machine Breakdown", hours: 4 },
    { id: 2, reason: "Manpower Shortage", hours: 2 },
    { id: 3, reason: "Material Quality Issues", hours: 1 }
    
  ]
};

const Dashboard = () => {
  const [showReasons, setShowReasons] = useState(false);
  
  // Create tooltip text from reasons
  const tooltipText = targetData.reasons
    .map(item => `${item.reason}: ${item.hours} hrs`)
    .join('\n');

  return (
    <div className="metrics-dashboard">
      <h1>Dashboard</h1>
      
      {/* Original Metrics Cards */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-label">OEE</div>
          <div className="metric-value">85%</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Availability</div>
          <div className="metric-value">91%</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Performance</div>
          <div className="metric-value">97%</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Quality</div>
          <div className="metric-value">99%</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Yield</div>
          <div className="metric-value">98%</div>
        </div>
      </div>

      {/* Target Tracking Cards */}
      <h2>Target</h2>
      <div className="metrics-grid">
       
        <div className="metric-card target-card">
          <div className="metric-label">Today's Target</div>
          <div className="metric-value">{targetData.target}</div>
          <div className="metric-subtitle">Units</div>
        </div>
        <div className="metric-card achievement-card">
          <div className="metric-label">Achievement</div>
          <div className="metric-value">{targetData.achieved}</div>
          <div className="metric-subtitle">Units</div>
          <div className="achievement-percentage">
            {((targetData.achieved / targetData.target) * 100).toFixed(1)}%
          </div>
        </div>
        <div 
          className="metric-card missed-card"
          title={tooltipText}
          style={{ cursor: 'help' }}
        >
          <div className="metric-label">Missed Target</div>
          <div className="metric-value">{targetData.missed}</div>
          <div className="metric-subtitle">Units</div>
        </div>
      </div>

      {/* Production Section */}
      <section className="section">
        <h2>Production</h2>
        <div className="chart-grid">
          <div className="chart-card">
            <div className="chart-header">
              <div className="chart-label">Production Output</div>
              <div className="chart-value">5000 units</div>
              <div className="chart-growth">+5%</div>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={productionData}>
                  <Line type="monotone" dataKey="value" stroke="#2563eb" dot={false} />
                  <XAxis dataKey="date" />
                  <YAxis />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="chart-card">
            <div className="chart-header">
              <div className="chart-label">Production Output</div>
              <div className="chart-value">4000 units</div>
              <div className="chart-growth">+3%</div>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={productionData}>
                  <Bar dataKey="value" fill="#e5e7eb" />
                  <XAxis dataKey="date" />
                  <YAxis />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Section with Scrap Products */}
      <section className="section">
        <h2>Quality</h2>
        <div className="chart-grid">
          {/* Scrap Products Comparison */}
          <div className="chart-card">
            <div className="chart-header">
              <div className="chart-label">Scrap Products Comparison</div>
              <div className="chart-value">
                {scrapData[1].scrap} units
                <span className="chart-comparison">
                  ({((scrapData[1].scrap - scrapData[0].scrap) / scrapData[0].scrap * 100).toFixed(1)}% vs last month)
                </span>
              </div>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={scrapData}>
                  <Bar dataKey="scrap" fill="#e5e7eb" />
                  <XAxis dataKey="month" />
                  <YAxis />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* Defects Tracking */}
          <div className="chart-card">
            <div className="chart-header">
              <div className="chart-label">Defects Tracking</div>
              <div className="chart-value">
                {defectData[1].defects} units
                <span className="chart-comparison">
                  ({((defectData[1].defects - defectData[0].defects) / defectData[0].defects * 100).toFixed(1)}% vs last week)
                </span>
              </div>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={defectData}>
                  <Bar dataKey="defects" fill="#e5e7eb" />
                  <XAxis dataKey="week" />
                  <YAxis />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Manpower Section */}
      <section className="section">
        <h2>Manpower</h2>
        <div className="chart-card">
          <div className="chart-header">
            <div className="chart-label">Manpower Allocation</div>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={productionData}>
                <Bar dataKey="value" fill="#e5e7eb" />
                <XAxis dataKey="date" />
                <YAxis />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Inventory Section */}
      <section className="section">
        <h2>Inventory</h2>
        <div className="chart-grid">
          <div className="chart-card">
            <div className="chart-header">
              <div className="chart-label">Raw Materials</div>
              <div className="chart-value">10000 units</div>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={productionData}>
                  <Line type="monotone" dataKey="value" stroke="#2563eb" dot={false} />
                  <XAxis dataKey="date" />
                  <YAxis />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="chart-card">
            <div className="chart-header">
              <div className="chart-label">Finished Goods</div>
              <div className="chart-value">20000 units</div>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={productionData}>
                  <Bar dataKey="value" fill="#e5e7eb" />
                  <XAxis dataKey="date" />
                  <YAxis />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;