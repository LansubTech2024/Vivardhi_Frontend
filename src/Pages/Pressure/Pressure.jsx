import { useState, useEffect } from "react";
import axios from "axios";
//import { FaDownload } from "react-icons/fa6";
import Plot from "react-plotly.js";
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
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
import "./Pressure.css";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Pressure() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/charts/")
      .then((response) => setChartData(response.data))
      .catch((error) => {
        console.error("Error fetching graph data:", error);
      });
  }, []);

  // const handleDownload = () => {
  //   const graphItems = document.querySelectorAll(".graph-item");
  //   const pdf = new jsPDF();

  //   let promises = [];
  //   graphItems.forEach((item, index) => {
  //     promises.push(
  //       html2canvas(item).then((canvas) => {
  //         const imgData = canvas.toDataURL("image/png");
  //         const imgWidth = pdf.internal.pageSize.getWidth();
  //         const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //         if (index > 0) {
  //           pdf.addPage();
  //         }
  //         pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  //       })
  //     );
  //   });

  //   Promise.all(promises).then(() => {
  //     pdf.save("graphs.pdf");
  //   });
  // };

  if (!chartData) return <div className="loading">Loading...</div>;

  return (
    <>
      <div className="pressure-container">
        {/* <button className="download-btn" onClick={handleDownload}>
          <FaDownload size={22} color="#0e68a4" className="fa-down" />
        </button> */}
        <div className="pressure-grid">
          {/* Gauge Meter */}
          <div className="pressure-item">
            <h2
              className="pressure-title"
              style={{ marginLeft: "40px" }}
            >
              Average Pressure
            </h2>
            <Plot
              data={[
                {
                  type: "indicator",
                  mode: "gauge+number",
                  value: chartData.gauge_chart.value,
                  gauge: {
                    axis: { range: chartData.gauge_chart.range },
                    steps: chartData.gauge_chart.steps,
                    threshold: chartData.gauge_chart.threshold,
                  },
                  number: {
                    font: { size: 80, color: "blue" }, // Customize the font size and color
                  },
                },
              ]}
              layout={{
                margin: { t: 30, b: 50, l: 50, r: 50 },
                size: "20",
                paper_bgcolor: "rgba(0,0,0,0)", // Transparent background for the entire plot
                plot_bgcolor: "rgba(0,0,0,0)", // Transparent background for the plot area
              }}
              config={{
                displayModeBar: false, // Hides the mode bar
              }}
              useResizeHandler={true}
            />
          </div>
          <div className="pressure-card">
            <h2 className="pressure-card-header">Pressure Calculation</h2>
            <ul className="pressure-card-list">
              <li>
                Calculates average pressure from &apos;vaccum_pr&apos; field
              </li>
              <li>Rounds result to 2 decimal places</li>
              <li>Sets up gauge with range 0-100</li>
              <li>
                Defines color ranges: green (0-30), yellow (30-70), red (70-100)
              </li>
              <li>Sets threshold at 85 for critical pressure</li>
            </ul>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default Pressure;
