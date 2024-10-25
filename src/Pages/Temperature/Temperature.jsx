import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/SideBar/Sidebar";
import { FaDownload } from "react-icons/fa6";
import { Line } from "react-chartjs-2";
import Plot from "react-plotly.js";
//import Pressure from "../Pressure/Pressure";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./Temperature.css";
import GraphPopup from "../../Components/GraphPopup/GraphPopup";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Temperature() {
  const [chartData, setChartData] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedGraphType, setSelectedGraphType] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/charts/")
      .then((response) => setChartData(response.data))
      .catch((error) => {
        console.error("Error fetching graph data:", error);
      });
  }, []);

  const handleGraphClick = (graphType) => {
    setSelectedGraphType(graphType);
    setIsPopupOpen(true);
  };

  const handleDownload = () => {
    const graphItems = document.querySelectorAll(".graph-item");
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


  return (
    <>
      <Header />
      <Sidebar />
      <div className="graphs-container">
        <button className="download-btn" onClick={handleDownload}>
          <FaDownload size={22} color="#0e68a4" className="fa-down" />
        </button>
        <div className="graphs-grid">
          {/* Line Chart */}
          <div
            className="graph-item"
            onClick={() => handleGraphClick("line-chart")}
          >
            <h2
              className="graph-title"
              style={{ marginBottom: "80px" }}
            >
              Temperature Trends
            </h2>
            <Line
              data={{
                labels: chartData.line_chart.labels,
                datasets: [
                  {
                    label: "CHW In",
                    data: chartData.line_chart.datasets[0].data,
                    borderColor: "blue", // Line color
                    backgroundColor: "#A3C9F1", // Background color under the line
                  },
                  {
                    label: "CHW Out",
                    data: chartData.line_chart.datasets[1].data,
                    borderColor: "gray", // Line color
                    backgroundColor: "#D1C4E9", // Background color under the line
                  },
                  {
                    label: "COW In",
                    data: chartData.line_chart.datasets[2].data,
                    borderColor: "#999", // Line color
                    backgroundColor: "#A8D5BA", // Background color under the line
                  },
                  {
                    label: "COW Out",
                    data: chartData.line_chart.datasets[3].data,
                    borderColor: "#666", // Line color
                    backgroundColor: "#FFF9C4", // Background color under the line
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    labels: {
                      color: "black",
                      size: "16", // Legend text color
                    },
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "Time",
                      color: "black",
                      font: {
                        size: 16,
                      },
                    },
                    ticks: {
                      color: "black",
                      size: "16", // X-axis ticks color
                    },
                    grid: {
                      color: "#B6B6B4", // X-axis grid lines color
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: "Temperature",
                      color: "black",
                      font: {
                        size: 16,
                      },
                    },
                    ticks: {
                      color: "black",
                      size: "16", // Y-axis ticks color
                    },
                    grid: {
                      color: "#B6B6B4", // X-axis grid lines color
                    },
                  },
                },
              }}
              width={500}
              height={400}
            />
          </div>
          {/*Temp changes Line Chart */}
          <div
            className="graph-item"
            onClick={() => handleGraphClick("waterfall-chart")}
          >
            <h2
              className="graph-title"
              style={{ marginBottom: "0px" }}
            >
              Temperature Changes
            </h2>
            <Plot
              data={[
                {
                  type: "scatter",
                  mode: "lines+markers",
                  x: chartData.tempchange_line_chart.x,
                  y: chartData.tempchange_line_chart.y,
                  line: {
                    color: "#a37ab4",
                    width: 3,
                    shape: "spline",
                    smoothing: 1.3,
                  },
                  marker: { color: "#abbcd6 ", size: 8 },
                  text: chartData.tempchange_line_chart.y.map(String),
                  textposition: "top center",
                },
              ]}
              layout={{
                autosize: true,
                yaxis: {
                  autorange: true,
                  title: "Temperature (°C)",
                  titlefont: {
                    color: "black",
                    size: 18,
                  },
                  tickfont: {
                    color: "black",
                    size: 16,
                  },
                  gridcolor: "#B6B6B4",
                },
                xaxis: {
                  title: "Process Stage",
                  titlefont: {
                    color: "black",
                    size: 18,
                  },
                  tickfont: {
                    color: "black",
                    size: 16,
                  },
                  gridcolor: "#B6B6B4",
                },
                paper_bgcolor: "rgba(0,0,0,0)",
                plot_bgcolor: "rgba(0,0,0,0)",
              }}
              config={{
                displayModeBar: false,
              }}
              useResizeHandler={true}
              style={{ width: 570, height: 500 }}
            />
          </div>
          {/* Combination Chart */}
          <div
            className="graph-item"
            onClick={() => handleGraphClick("combination-chart")}
            style={{ marginLeft: "0px" }}
          >
            <h2 className="graph-title">
              Temperature and Pressure Over Time
            </h2>
            <Plot
              data={[
                {
                  type: "bar",
                  x: chartData.combination_chart.labels,
                  y: chartData.combination_chart.datasets[0].data,
                  name: "Avg CHW In Temperature",
                  marker: {
                    color: "#D1C4E9",
                    line: {
                      color: "black",
                      width: 1,
                    },
                  },
                  yaxis: "y1",
                },
                {
                  type: "line",
                  x: chartData.combination_chart.labels,
                  y: chartData.combination_chart.datasets[1].data,
                  name: "Avg Pressure",
                  marker: {
                    color: "#5A89C9",
                    size: "16",
                  },
                  yaxis: "y2",
                },
              ]}
              layout={{
                xaxis: {
                  title: {
                    text: "Month",
                    font: {
                      size: 18, // Change X-axis title font size
                      color: "black",
                      family: "Arial", // Make it bold
                    },
                  },
                  tickfont: {
                    size: 16, // X-axis tick font size
                    color: "black",
                    family: "Arial",
                  },
                  linecolor: "black",
                  linewidth: 2,
                  gridcolor: "#B6B6B4",
                },
                yaxis: {
                  title: {
                    text: "Temperature (°C)",
                    font: {
                      size: 18, // Change Y-axis title font size
                      color: "black",
                      family: "Arial",
                    },
                  },
                  tickfont: {
                    size: 16, // Y-axis tick font size
                    color: "black",
                    family: "Arial",
                  },
                  linecolor: "black",
                  linewidth: 2,
                  gridcolor: "black",
                  side: "left",
                },
                yaxis2: {
                  title: {
                    text: "Pressure",
                    font: {
                      size: 18, // Change Y-axis 2 title font size
                      color: "black",
                      family: "Arial",
                    },
                  },
                  tickfont: {
                    size: 16, // Y-axis 2 tick font size
                    color: "black",
                    family: "Arial",
                  },
                  linecolor: "black",
                  linewidth: 2,
                  gridcolor: "#B6B6B4",
                  overlaying: "y",
                  side: "right",
                },
                legend: {
                  x: 1.05,
                  y: 1,
                  font: { color: "black" },
                },
                paper_bgcolor: "rgba(0,0,0,0)",
                plot_bgcolor: "rgba(0,0,0,0)",
                margin: { l: 50, r: 50, t: 50, b: 50 },
                autosize: true,
              }}
              config={{ displayModeBar: false }}
              style={{ width: 570, height: 500 }}
            />
          </div>
          {/* Donut Chart */}
          <div
            className="graph-item"
            onClick={() => handleGraphClick("donut-chart")}
          >
            <h2
              className="graph-title"
            >
              Temperature Distribution
            </h2>
            <Plot
              data={[
                {
                  type: "pie",
                  hole: 0.4,
                  labels: chartData.donut_chart.labels,
                  values: chartData.donut_chart.datasets[0].data,
                  marker: {
                    colors: chartData.donut_chart.datasets[0].backgroundColor,
                  },
                  textinfo: "label+percent",
                },
              ]}
              layout={{
                margin: { t: 50, b: 50, l: 50, r: 50 },
                showlegend: true,
                paper_bgcolor: "rgba(0,0,0,0)",
                plot_bgcolor: "rgba(0,0,0,0)",
                font: { color: "#333333" },
              }}
              config={{ displayModeBar: false }}
              useResizeHandler={true}
              style={{ width: 530, height: 580 }}
            />
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <GraphPopup
          isOpen={isPopupOpen}
          onRequestClose={() => setIsPopupOpen(false)}
          graphType={selectedGraphType}
        />
      )}
    </>
  );
}

export default Temperature;
