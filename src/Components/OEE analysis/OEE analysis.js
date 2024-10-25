import React from 'react';
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

const Dashboard = () => {
  return (
    <div className="metrics-dashboard">
      <h1>Dashboard</h1>
      
      {/* Metrics Cards */}
      <div className="metrics-grid">
        <div className="metric-card">
          <h3 className="metric-label">OEE</h3>
          <p className="metric-value">85%</p>
        </div>
        <div className="metric-card">
          <h3 className="metric-label">Availability</h3>
          <p className="metric-value">91%</p>
        </div>
        <div className="metric-card">
          <h3 className="metric-label">Performance</h3>
          <p className="metric-value">97%</p>
        </div>
        <div className="metric-card">
          <h3 className="metric-label">Quality</h3>
          <p className="metric-value">99%</p>
        </div>
        <div className="metric-card">
          <h3 className="metric-label">Yield</h3>
          <p className="metric-value">98%</p>
        </div>
      </div>

      {/* Production Section */}
      <section className="section">
        <h2>Production</h2>
        <div className="chart-grid">
          <div className="chart-card">
            <div className="chart-header">
              <div className="chart-label">Production Output</div>
              <div className="chart-head">This Week</div>
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
              <div className="chart-head">Last Week</div>
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

      {/* Defects Section */}
      <section className="section">
        <h2>Defects</h2>
        <div className="chart-card">
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