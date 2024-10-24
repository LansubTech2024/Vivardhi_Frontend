import { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { FaDownload } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { Line } from "react-chartjs-2";
import "./GraphPopup.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    backdropFilter: 'blur(5px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  content: {
    position: 'relative',
    top: 'auto',
    left: 'auto',
    right: 'auto',
    bottom: 'auto',
    border: 'none',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '10px',
    outline: 'none',
    padding: '40px',
    width: '70%',
    maxHeight: '80vh',
    maxWidth: '1200px'
  }
};


const GraphPopup = ({ isOpen, onRequestClose, graphType }) => {
  const [predictiveData, setPredictiveData] = useState(null);
  const [impactCards, setImpactCards] = useState([]);
  const [recommendation, setRecommendation] = useState("");

  useEffect(() => {
    if (isOpen) {
      axios
        .get(`http://localhost:5000/api/graphs/${graphType}-popup/`)
        .then((response) => {
          setPredictiveData(response.data.predictive_graph);
          setImpactCards(response.data.impact_cards);
          if (response.data.recommendation) {
            setRecommendation(response.data.recommendation);
          }
        })
        .catch((error) => {
          console.error("There was an error fetching the data!", error);
        });
    }
  }, [isOpen, graphType]);

  const renderImpactCards = () => {
    return impactCards.map((card, index) => (
      <div key={index} className="impact-card">
        <h3>{card.title}</h3>
        <p className="value">{card.value}</p>
        <p className="description">{card.description}</p>
      </div>
    ));
  };

  const renderPredictiveGraph = () => {
    if (!predictiveData) return null;

    switch (predictiveData.type) {
      case "time_series_forecast":
        return renderTimeSeriesForecast();
      case "line_chart":
        return renderLineChart();
      case "line":
        return renderDonutLineChart();
      case "overlay_combination":
        return renderOverlayCombination();
      default:
        return null;
    }
  };

  const renderTimeSeriesForecast = () => {
    const data = {
      labels: predictiveData.dates,
      datasets: [
        {
          label: "Predicted Values",
          data: predictiveData.values,
          borderColor: "#A3C9F1",
          backgroundColor: "#5A89C9",
          fill: true,
        },
      ],
    };

    return <Line data={data} />;
  };

  const renderLineChart = () => {
    if (!predictiveData) return null;

    const data = {
        labels: predictiveData.dates,
        datasets: [
            {
                label: 'CHW In Temperature',
                data: predictiveData.chw_in_temp,
                borderColor: '#948d71',
                backgroundColor: '#e49ae5',
            },
            {
                label: 'CHW Out Temperature',
                data: predictiveData.chw_out_temp,
                borderColor: '#f7a49e',
                backgroundColor: '#d9d7c2',
            },
            {
                label: 'Temperature Difference',
                data: predictiveData.temp_diff,
                borderColor: '#99e5db',
                backgroundColor: '#fff4aa',
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Temperature Data',
            },
        },
    };

    return <Line data={data} options={options} />;
};

const renderDonutLineChart = () => {
  const data = {
    labels: predictiveData.labels,
    datasets: [
      {
        label: 'Temperature',
        data: predictiveData.datasets[0].data,
        borderColor: '#9aba95',
        backgroundColor: '#d5f3d1',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Temperature Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Temperature (°C)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

  const renderOverlayCombination = () => {
    const data = {
      labels: predictiveData.dates,
      datasets: [
        {
          label: "Temperature",
          data: predictiveData.temp_values,
          borderColor: "#eab0a2",
          backgroundColor: "#775d46",
          yAxisID: "y-axis-1",
        },
        {
          label: "Pressure",
          data: predictiveData.pressure_values,
          borderColor: "#5b818a",
          backgroundColor: "#b4d8e8",
          yAxisID: "y-axis-2",
        },
      ],
    };

    const options = {
      scales: {
        "y-axis-1": {
          type: "linear",
          display: true,
          position: "left",
        },
        "y-axis-2": {
          type: "linear",
          display: true,
          position: "right",
          grid: {
            drawOnChartArea: false,
          },
        },
      },
    };

    return <Line data={data} options={options} />;
  };

  const handleDownload = () => {
    const graphItems = document.querySelectorAll(".chart-container");
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


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Graph Popup"
      style={customStyles}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="popup-content">
        <div className="popup-header">
          <h2>{graphType.charAt(0).toUpperCase() + graphType.slice(1)} Analysis</h2>
          <div className="header-buttons">
            <button className="detail-download-btn" onClick={handleDownload}>
              <FaDownload size={22} color="#0e68a4" />
            </button>
            <button className="close-icon-btn" onClick={onRequestClose}>
              <IoClose size={24} />
            </button>
          </div>
        </div>
        
        <div className="chart-container">
          <div className="chart-item">
            <h2>Predictive Chart</h2>
            {renderPredictiveGraph()}
          </div>
          
          <h2>Impact Analysis</h2>
          <div className="impact-cards">
            {renderImpactCards()}
          </div>
          
          {recommendation && (
            <div className="recommendation">
              <p><span>Alert: </span>{recommendation}</p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default GraphPopup;
