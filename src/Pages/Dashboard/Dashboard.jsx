import { useState, useEffect } from "react";
import axios from "axios";
import Assumption from "../../Components/Assumption/Assumption";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/SideBar/Sidebar";
import { FaDownload } from "react-icons/fa6";
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
import "./Dashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/charts/")
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

  return (
    <>
      <Header />
      <Sidebar />
      <div className="cards-container">
        <button className="download-btn" onClick={handleDownload}>
          <FaDownload size={22} color="#0e68a4" className="fa-down" />
        </button>
        <div className="card-container">
          {/* Total Entries */}
          <div className="card" style={{textAlign:"center" }}>
            <h2 style={{marginTop:"40px"}}>Total Entries</h2>
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
        <div className="assumption">
          <Assumption />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
