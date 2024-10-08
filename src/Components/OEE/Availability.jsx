import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Availability = () => {
  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const startDate = "2024-08-25";
  const endDate = "2024-09-05";
  const totalDuration = calculateDuration(startDate, endDate);
  const totalResources = 10;

  const completionData = [
    { date: "2024-08-25", rate: 0 },
    { date: "2024-08-26", rate: 20 },
    { date: "2024-08-27", rate: 20 },
    { date: "2024-08-28", rate: 20 },
    { date: "2024-08-29", rate: 20 },
    { date: "2024-08-30", rate: 20 },
    { date: "2024-08-31", rate: 40 },
    { date: "2024-09-01", rate: 40 },
    { date: "2024-09-02", rate: 40 },
    { date: "2024-09-03", rate: 70 },
    { date: "2024-09-04", rate: 70 },
    { date: "2024-09-05", rate: 90 },
  ];

  const resourceData = [
    { date: "2024-08-25", allocated: 3, total: 10 },
    { date: "2024-08-26", allocated: 4, total: 10 },
    { date: "2024-08-27", allocated: 5, total: 10 },
    { date: "2024-08-28", allocated: 6, total: 10 },
    { date: "2024-08-29", allocated: 6, total: 10 },
    { date: "2024-08-30", allocated: 7, total: 10 },
    { date: "2024-08-31", allocated: 8, total: 10 },
    { date: "2024-09-01", allocated: 10, total: 10 },
    { date: "2024-09-03", allocated: 10, total: 10 },
    { date: "2024-09-04", allocated: 8, total: 10 },
    { date: "2024-09-05", allocated: 9, total: 10 },
  ];

  return (
    <div className="availability">
      <div className="availabilty-cards">
        <div className="available-card">
          <h3>Total Duration</h3>
          <p>{totalDuration} days</p>
          <p>From: {startDate}</p>
          <p>To: {endDate}</p>
        </div>
        <div className="available-card">
          <h3>Total Resources</h3>
          <p>{totalResources} workers</p>
        </div>
      </div>
      <div className="availabilty-graphs">
        <div className="available-graph full-width">
          <h3>Project Completion Rate</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={completionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis
                label={{
                  value: "Completion Rate (%)",
                  angle: 90,
                  position: "center",
                }}
              />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="rate" stroke="#357abd" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="available-graph full-width">
          <h3>Resources Allocated</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={resourceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis
                label={{
                  value: "Resources",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Legend />
              <Bar dataKey="allocated" fill="#a3c9f1" />
              <Bar dataKey="total" fill="#1d4f91" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Availability;
