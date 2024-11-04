import { useLocation } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/SideBar/Sidebar";
import "./Machine_details.css";

const About = () => {
  const location = useLocation();
  const { machine } = location.state || {};

  if (!machine) {
    return <p>No machine selected.</p>;
  }
  return (
    <>
      <Header />
      <Sidebar />
      <div className="machine-container">
        <div className="machine-details">
          <h2 className="machine-header">
            Details for Machine {machine.machineId}
          </h2>
          <div className="machine-card-container">
            <div className="machine-oee">
              <div className="machine-card">
                <i className="fa-solid fa-arrow-up"></i>
                <h3>Performance</h3>
                <p>{machine.performance}%</p>
              </div>
              <div className="machine-card">
                <i className="fa-solid fa-arrow-down"></i>
                <h3>Quality</h3>
                <p>{machine.quality}%</p>
              </div>
              <div className="machine-card">
                <i className="fa-solid fa-arrow-right"></i>
                <h3>Availability</h3>
                <p>{machine.availability}%</p>
              </div>
              <div className="machine-card">
                <i className="fa-solid fa-arrow-left"></i>
                <h3>OEE</h3>
                <p>{machine.oee}%</p>
              </div>
            </div>

            <h2>Performance Details</h2>
            <div className="machine-performance">
              <div className="machine-card">
                <i className="fa-solid fa-arrow-up"></i>
                <h3>Total Pieces</h3>
                <p>{machine.productionDetails?.totalPieces}</p>
              </div>
              <div className="machine-card">
                <i className="fa-solid fa-arrow-down"></i>
                <h3>Good Pieces</h3>
                <p>{machine.productionDetails?.goodPieces}</p>
              </div>
              <div className="machine-card">
                <i className="fa-solid fa-arrow-right"></i>
                <h3>Target</h3>
                <p>{machine.target}</p>
              </div>
            </div>

            <h2>Quality Details</h2>
            <div className="machine-quality">
              <div className="machine-card">
                <i className="fa-solid fa-arrow-up"></i>
                <h3>Waste Scrap</h3>
                <p>{machine.productionDetails?.wasteScrap}</p>
              </div>
              <div className="machine-card">
                <i className="fa-solid fa-arrow-down"></i>
                <h3>Waste Defect</h3>
                <p>{machine.productionDetails?.wasteDefect}</p>
              </div>
            </div>

            <h2>Availability Details</h2>
            <div className="machine-availability">
              <div className="machine-card">
                <i className="fa-solid fa-arrow-up"></i>
                <h3>Uptime</h3>
                <p>{machine.uptime}</p>
              </div>
              <div className="machine-card">
                <i className="fa-solid fa-arrow-down"></i>
                <h3>Downtime</h3>
                <p>{machine.downtime}</p>
              </div>
              <div className="machine-card">
                <i className="fa-solid fa-arrow-right"></i>
                <h3>Status</h3>
                <p>{machine.machineStatus}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
