import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/SideBar/Sidebar";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const Dashboard = () => {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For navigation
  const [selectedMetric, setSelectedMetric] = useState(null);

  const COLORS = {
    good: "#90EE90", // green
    scrap: "#fd5c63", // red
    defect: "#FC8E13", // orange
    recycled: "#72A0C1", // blue
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Replace this URL with your actual API endpoint
        const response = await axios.get(
           "https://opfactback1-d0aec8cfeqcmbec8.canadacentral-01.azurewebsites.net/api/dashboard"
          // "http://localhost:5000/api/dashboard"
        );
        setMetrics(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching metrics:", error);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }
  

  const handleCardClick = (metric) => {
    setSelectedMetric(metric); // Set the selected metric
    navigate(`/oeeanalysis?metric=${metric}`); // Navigate to the OEE Analysis tab with the selected metric
  };

  const handleGraphClick = () => {
    navigate("/productivity");
  };

  // Calculate averages
  const calculateAverage = (key) => {
    return metrics.length > 0
      ? metrics.reduce((acc, m) => acc + parseFloat(m[key]), 0) / metrics.length
      : 0;
  };

  const averages = {
    oee: calculateAverage("OEE").toFixed(2),
    availability: calculateAverage("availability").toFixed(2),
    performance: calculateAverage("performance").toFixed(2),
    quality: calculateAverage("quality").toFixed(2),
    yield: (metrics.length > 0
      ? metrics.reduce(
          (acc, m) =>
            acc +
            (m.goodPieces /
              (m.goodPieces + m.wasteScrap + m.wasteDefect + m.wasteRecycled)) *
              100,
          0
        ) / metrics.length
      : 0
    ).toFixed(2),
  };

  // Chart data - mapping dates for x-axis labels
  const chartData = metrics.map((m, index) => ({
    name: new Date(m.date).toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
    }), // Use date for the x-axis
    production: m.totalProduction,
    target: m.targetProduction,
    growth: parseFloat(m.growthPercentage),
    goodPieces: m.goodPieces,
    wasteScrap: m.wasteScrap,
    wasteDefect: m.wasteDefect,
    wasteRecycled: m.wasteRecycled,
    goodRate: parseFloat(m.goodRate),
    scrapRate: parseFloat(m.scrapRate),
    defectRate: parseFloat(m.defectRate),
    recycleRate: parseFloat(m.recycleRate),
    manpowerUtilization: m.manpowerUtilization,
    rawMaterialEfficiency: m.rawMaterialEfficiency,
    finishedGoodsRatio: m.finishedGoodsRatio,
  }));

  const latestData = metrics[metrics.length - 1] || {
    totalProduction: 0,
    growthPercentage: 0,
    achievementRate: 0,
    qualityRate: 0,
  };

  // Get latest data for pie chart
  const latestQualityData =
    metrics.length > 0 ? metrics[metrics.length - 1] : null;
  const pieChartData = latestQualityData
    ? [
        {
          name: "Good Products",
          value: latestQualityData.goodPieces,
          color: COLORS.good,
        },
        {
          name: "Scrap",
          value: latestQualityData.wasteScrap,
          color: COLORS.scrap,
        },
        {
          name: "Defects",
          value: latestQualityData.wasteDefect,
          color: COLORS.defect,
        },
        {
          name: "Recycled",
          value: latestQualityData.wasteRecycled,
          color: COLORS.recycled,
        },
      ]
    : [];

  // const CustomBarShape = (props) => {
  //   const { x, y, width, height } = props;
  //   return (
  //     <g>
  //       <rect x={x} y={y} width={width} height={height} fill={props.fill} />
  //       <rect x={x} y={y} width={width} height="2" fill="#333" />{" "}
  //     </g>
  //   );
  // };

  // Calculate maximum production value for scaling
  const maxProductionValue = Math.max(
    latestData.targetProduction,
    latestData.totalProduction
  );

  // Function to calculate percentage for circular bars
  const calculatePercentage = (value) => {
    return (value / maxProductionValue) * 100;
  };

  // const getBarColor = (value) => {
  //   if (value >= 80) return "#4caf50"; 
  //   if (value >= 50) return "#FFC107"; 
  //   return "#F44336"; 
  // };

  return (
    <>
      <Header />
      <Sidebar />
      <div className="dashboard">
        <div className="dasboard-container">
          {/* Metrics Cards */}
          <div className="metrics-grid">
            {[
              { title: "OEE", key: "oee", value: averages.oee },
              {
                title: "Availability",
                key: "availability",
                value: averages.availability,
              },
              {
                title: "Performance",
                key: "performance",
                value: averages.performance,
              },
              { title: "Quality", key: "quality", value: averages.quality },
              // { title: "Yield", key: "yield", value: averages.yield },
            ].map((metric) => (
              <div
                className="metric-card"
                key={metric.key}
                onClick={() => handleCardClick(metric.key)}
              >
                {/* <div className="semi-circle-wrapper">
                  <CircularProgressbar
                    value={metric.value}
                    maxValue={100}
                    text={`${metric.value}%`}
                    styles={buildStyles({
                      rotation: 0.75, 
                      strokeLinecap: "round",
                      textSize: "14px",
                      pathTransitionDuration: 0.5,
                      pathColor: getBarColor(metric.value),
                      textColor: "#000",
                      trailColor: "#ddd",
                    })}
                  />
                </div> */}
                <h3>{metric.title}</h3>
                <p className="metric-value">{metric.value}%</p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <h2>Production</h2>
          <div className="charts-grid">
            {/* Production Growth Chart */}
            <div
              className="chart-card"
              style={{ cursor: "pointer" }}
              onClick={handleGraphClick}
            >
              <div className="card-header">
                <div className="header-content">
                  <h3>Production Output</h3>
                  <div className="metric-values">
                    <div className="production-value">
                      {latestData.totalProduction.toLocaleString()} units
                    </div>
                    <div
                      className="growth-value"
                      style={{
                        color:
                          latestData.growthPercentage > 0 ? "green" : "red",
                      }}
                    >
                      {latestData.growthPercentage > 0
                        ? `+${latestData.growthPercentage}%`
                        : `${latestData.growthPercentage}%`}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-content">
                <LineChart width={430} height={350} data={chartData}>
                  <defs>
                    <linearGradient
                      id="colorProduction"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#60a5fa"
                        stopOpacity={0.4}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="production"
                    // stroke="rgb(59 7 100)"
                    stroke="rgb(13 148 136)"
                    strokeWidth={2.5}
                    dot={false}
                  />
                </LineChart>
              </div>
            </div>

            {/* Production Bar Chart Card */}
            <div className="production-circle-card">
              <div className="card-content production-progress">
                <div className="circular-progressbars">
                  {/* Target Production Circle */}
                  <div className="progress-item">
                    <div className="progress-circle">
                      <CircularProgressbar
                        value={calculatePercentage(latestData.targetProduction)}
                        text={`${latestData.targetProduction.toLocaleString()}`}
                        styles={buildStyles({
                          // pathColor: "rgb(59 7 100)",
                          pathColor: "rgb(13 148 136)",
                          textColor: "rgb(13 148 136)",
                          trailColor: "#e5e7eb",
                          textSize: "16px",
                          pathTransitionDuration: 0.5,
                        })}
                      />
                    </div>
                    <div className="progress-label">Target Production</div>
                  </div>

                  {/* Actual Production Circle */}
                  <div className="progress-item">
                    <div className="progress-circle">
                      <CircularProgressbar
                        value={calculatePercentage(latestData.totalProduction)}
                        text={`${latestData.totalProduction.toLocaleString()}`}
                        styles={buildStyles({
                          // pathColor: "rgb(88 28 135)",
                          pathColor: "rgb(20 184 166)",
                          textColor: "rgb(20 184 166)",
                          trailColor: "#e5e7eb",
                          textSize: "16px",
                          pathTransitionDuration: 0.5,
                        })}
                      />
                    </div>
                    <div className="progress-label">Actual Production</div>
                  </div>
                </div>

                {/* Achievement Rate Circle */}
                <div className="progress-item">
                  <div className="progress-circle">
                    <CircularProgressbar
                      value={parseFloat(latestData.achievementRate)}
                      text={`${latestData.achievementRate}%`}
                      styles={buildStyles({
                        // pathColor: "rgb(107 33 168)",
                        pathColor: "rgb(45 212 191)",
                        textColor:
                          parseFloat(latestData.achievementRate) >= 0
                            ? "green"
                            : "red",
                        trailColor: "#e5e7eb",
                        textSize: "16px",
                        pathTransitionDuration: 0.5,
                      })}
                    />
                  </div>
                  <div className="progress-label">Achievement Rate</div>
                </div>

                {/* Growth Rate Display */}
                <div className="growth-rate">
                  <span className="growth-label">Growth Rate:</span>
                  <span
                    className={`growth-value ${
                      parseFloat(latestData.growthPercentage) >= 0
                        ? "positive"
                        : "negative"
                    }`}
                  >
                    {parseFloat(latestData.growthPercentage) >= 0 ? "+" : ""}
                    {latestData.growthPercentage}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quality Rates Trend */}
          <h2>Quality</h2>
          <div className="charts-grid">
            <div className="chart-card">
              <div className="card-header">
                <h3>Quality Metrics Trend</h3>
              </div>
              <div className="card-content">
                <LineChart width={430} height={350} data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend
                    formatter={(value, entry, index) => (
                      <span
                        style={{
                          color:
                            index === 0
                              ? "#333"
                              : index === 1
                              ? "#333"
                              : index === 2
                              ? "#333"
                              : index === 3
                              ? "#333"
                              : "#333",
                        }}
                      >
                        {value}
                      </span>
                    )}
                  />
                  <Line
                    type="monotone"
                    dataKey="goodRate"
                    name="Good Rate %"
                    // stroke="rgb(59 7 100)"
                    stroke="rgb(13 148 136)"
                    strokeWidth={2.5}
                  />
                  <Line
                    type="monotone"
                    dataKey="scrapRate"
                    name="Scrap Rate %"
                    // stroke="rgb(107 33 168)"
                    stroke="rgb(20 184 166)"
                    strokeWidth={2.5}
                  />
                  <Line
                    type="monotone"
                    dataKey="defectRate"
                    name="Defect Rate %"
                    // stroke="rgb(126 34 206)"
                    stroke="rgb(45 212 191)"
                    strokeWidth={2.5}
                  />
                  <Line
                    type="monotone"
                    dataKey="recycleRate"
                    name="Recycle Rate %"
                    // stroke="rgb(168 85 247)"
                    stroke="rgb(153 246 228)"
                    strokeWidth={2.5}
                  />
                </LineChart>
              </div>
            </div>

            {/* Quality Distribution Pie Chart */}
            <div className="chart-card">
              <div className="card-header">
                <h3>Current Quality Distribution</h3>
                <div className="card-subtitle">
                  Total Pieces:{" "}
                  {latestQualityData?.totalPieces.toLocaleString() || 0}
                </div>
              </div>
              <div className="card-content">
                <PieChart width={500} height={400}>
                  <Pie
                    data={pieChartData}
                    cx={250}
                    cy={150}
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                    //label={({ name, percent }) =>
                    // `${name} (${(percent * 100).toFixed(1)}%)`
                    //}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        // fill={
                        //   [
                        //     "rgb(107 33 168)",
                        //     "rgb(147 51 234)",
                        //     "rgb(168 85 247)",
                        //     "rgb(192 132 252)",
                        //     "#6495ED",
                        //   ][index]
                        // }

                        fill={
                          [
                            "rgb(13 148 136)",
                            "rgb(20 184 166)",
                            "rgb(45 212 191)",
                            "rgb(153 246 228)",
                            "#6495ED",
                          ][index]
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend
                    formatter={(value, entry, index) => (
                      <span
                        style={{
                          color:
                            index === 0
                              ? "#333"
                              : index === 1
                              ? "#333"
                              : index === 2
                              ? "#333"
                              : index === 3
                              ? "#333"
                              : "#333",
                        }}
                      >
                        {value}
                      </span>
                    )}
                  />
                </PieChart>
              </div>
            </div>
          </div>

          {/* Manpower Utilization Chart */}
          <h2>Manpower</h2>
          <div className="charts-grid">
            <div className="chart-card">
              <div className="card-header">
                <h3>Manpower Utilization</h3>
              </div>
              <div className="card-content">
                <div className="metrics-details">
                  <div className="metric-detail-card">
                    <h4>Current Utilization</h4>
                    <div className="metric-value">
                      {chartData[chartData.length - 1]?.manpowerUtilization ||
                        0}
                      %
                    </div>
                  </div>
                  <div className="metric-detail-card">
                    <h4>Total Manpower</h4>
                    <div className="metric-value">
                      {latestData.totalManpower || 0}
                    </div>
                  </div>
                  <div className="metric-detail-card">
                    <h4>Allocated Hours</h4>
                    <div className="metric-value">
                      {latestData.totalAllocatedHours || 0}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Raw Material Efficiency Chart */}
          <h2>Inventory</h2>
          <div className="charts-grid">
            <div className="raw-material-finished-goods">
              <div className="chart-card">
                <div className="card-header">
                  <h3>Raw Material Efficiency</h3>
                </div>
                <div className="card-content">
                  <LineChart width={430} height={350} data={chartData}>
                    <defs>
                      <linearGradient
                        id="colorProduction"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#2563eb"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#60a5fa"
                          stopOpacity={0.4}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="rawMaterialEfficiency"
                      stroke="rgb(13 148 136)"
                      strokeWidth={2.5}
                    />
                  </LineChart>
                </div>
              </div>

              {/* Finished Goods Chart */}
              <div className="chart-card">
                <div className="card-header">
                  <h3>Finished Goods Ratio</h3>
                </div>
                <div className="card-content">
                  <div className="metrics-details">
                    <div className="metric-detail-card">
                      <h4>Current Ratio</h4>
                      <div className="metric-value">
                        {chartData[chartData.length - 1]?.finishedGoodsRatio ||
                          0}
                        %
                      </div>
                    </div>
                    <div className="metric-detail-card">
                      <h4>Current Stock</h4>
                      <div className="metric-value">
                        {latestData.finishedGoodsStock || 0}
                      </div>
                    </div>
                    <div className="metric-detail-card">
                      <h4>Minimum Required</h4>
                      <div className="metric-value">
                        {latestData.finishedGoodMinimumRequired || 0}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
