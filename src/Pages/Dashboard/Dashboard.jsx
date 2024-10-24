import { useState, useEffect } from "react";
import axios from "axios";

import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/SideBar/Sidebar";
import { FaDownload } from "react-icons/fa6";
import Plot from "react-plotly.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./Dashboard.css";

import Performance from "../../Components/OEE/Performance";
import Quality from "../../Components/OEE/Quality";
import Availability from "../../Components/OEE/Availability";

// OEE calculation example values
const plannedTime = 8; // Planned Production Time in hours
const actualTime = 6; // Actual Production Time in hours
const actualOutput = 90; // Actual Output in units
const idealOutput = 100; // Ideal Output in units
const goodOutput = 85; // Good Output in units

const Dashboard = () => {
  const [chartData, setChartData] = useState(null);

  const [selectedMetric, setSelectedMetric] = useState(null);

  const handleBarClick = (event) => {
    // event.points[0].label - gets the label of the clicked bar (Availability, Performance, Quality)
    const clickedMetric = event.points[0].y;
    setSelectedMetric(clickedMetric);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/charts/")
      .then((response) => setChartData(response.data))
      .catch((error) => {
        console.error("Error fetching graph data:", error);
      });
  }, []);

  const handleDownload = () => {
    const graphItems = document.querySelectorAll(".cards-container");
    const pdf = new jsPDF();

    let promises = [];
    graphItems.forEach((item, index) => {
      promises.push(
        html2canvas(item).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const imgWidth = pdf.internal.pageSize.getWidth();
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          if (index > 0) {
            pdf.addPage();
          }
          pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        })
      );
    });

    Promise.all(promises).then(() => {
      pdf.save("graphs.pdf");
    });
  };

  if (!chartData) return <div className="loading">Loading...</div>;

  const { total_entries, chw_in_temp, chw_out_temp, avg_temps } = chartData;

  // OEE Calculations based on the formula
  const availability = (actualTime / plannedTime) * 100;
  const performance = (actualOutput / idealOutput) * 100;
  const quality = (goodOutput / actualOutput) * 100;
  const averageOEE = (availability + performance + quality) / 3;

  return (
    <>
      <Header />
      <Sidebar />
      <div className="cards-container">
        <button className="download-btn" onClick={handleDownload}>
          <FaDownload size={22} color="#0e68a4" className="fa-down" />
        </button>
        <div className="card-container">
          <div className="card" style={{ textAlign: "center" }}>
            <h2 style={{ marginTop: "40px" }}>Total Entries</h2>
            <p style={{ fontSize: "20px" }}>{total_entries.total_entries}</p>
          </div>

          {/* CHW In Temp Card */}
          <div className="card">
            <h2>Inlet Temperature</h2>
            <p>Min : {chw_in_temp.min_chw_in_temp}°C</p>
            <p>Max : {chw_in_temp.max_chw_in_temp}°C</p>
          </div>

          {/* CHW Out Temp Card */}
          <div className="card">
            <h2>Outlet Temperature</h2>
            <p>Min : {chw_out_temp.min_chw_out_temp}°C</p>
            <p>Max : {chw_out_temp.max_chw_out_temp}°C</p>
          </div>

          {/* Average Temperatures Card */}
          <div className="card">
            <h2>Average Temperature</h2>
            <p>In : {avg_temps.avg_chw_in_temp.toFixed(2)}°C</p>
            <p>Out : {avg_temps.avg_chw_out_temp.toFixed(2)}°C</p>
          </div>
        </div>
        <div className="OEE-section">
          <h2>OEE Metrics</h2>
          <div className="Gauge.OEE">
            <Plot
              data={[
                {
                  type: "indicator",
                  mode: "gauge+number",
                  value: averageOEE,
                  title: { text: "Average OEE" },
                  gauge: {
                    axis: { range: [0, 100] },
                    bar: { color: "70261F" },
                    steps: [
                      { range: [0, averageOEE], color: "70261F" },
                      { range: [averageOEE, 100], color: "lightgray" },
                    ],
                    threshold: {
                      line: { color: "70261F", width: 4 },
                      thickness: 0.75,
                      value: averageOEE,
                    },
                  },
                },
              ]}
              layout={{
                width: 500,
                height: 300,
              }}
              config={{
                displayModeBar: false,
              }}
            />
          </div>
          <div className="Line-OEE">
            <Plot
              data={[
                {
                  type: "bar",
                  x: [availability, performance, quality],
                  y: ["Availability", "Performance", "Quality"],
                  orientation: "h",
                  marker: { color: ["D1BDFF", "#ffafcc", "#a2d2ff"] },
                },
              ]}
              layout={{
                title: "OEE Metrics ",
                xaxis: { title: "Percentage (%)" },
                yaxis: { title: "" },
                
              }}
              onClick={handleBarClick}
              config={{
                displayModeBar: false,
              }}
            />
            {selectedMetric === "Availability" && <Availability />}
            {selectedMetric === "Performance" && <Performance />}
            {selectedMetric === "Quality" && <Quality />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
