import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { RxChevronUp,RxChevronDown } from "react-icons/rx";
import { MdOutlinePowerSettingsNew } from "react-icons/md";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { FaTachometerAlt } from "react-icons/fa";
import { AiOutlineFile } from "react-icons/ai";
import { PiNotionLogo } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";
import { IoMdHelpCircleOutline } from "react-icons/io";
import "./Sidebar.css";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  // const[settingOpen,setSettingOpen] = useState(false);
  // const[helpOpen,setHelpOpen] = useState(false)
  //const [toggle, setToggle] = useState(false);
  const[InventoryOpen, setInventoryOpen] = useState(false);
  
  // const ToggleSetting = () =>{
  //     setSettingOpen(!settingOpen);
  // }
  // const CloseSetting = () =>{
  //     setSettingOpen(false)
  // }
  // const ToggleHelp = () =>{
  //     setHelpOpen(!helpOpen)
  // }
  // const CloseHelp = () =>{
  //     setHelpOpen(false)
  // }
  const ToggleInventory = () =>{
      setInventoryOpen(!InventoryOpen)
  }
  const CloseInventory = () =>{
      setInventoryOpen(false)
  }

  return (
    
    
    <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
     <div className="close-btn" onClick={toggleSidebar}>
        &times;
      </div>
      <aside className="no-scrollbar sidebar">
      {/* <div className="company-name-header">
      <span className="highlight-header">OPFACT</span>
        </div> */}
        <nav className="sidebar-menu">
          <ul className="list-item">
            {/* <li className="active">
              <Link to="/home">
                <i className="fa-solid fa-house-chimney"></i>
                  Home
              </Link>
            </li> */}
            <li>
              <Link to="/dashboard">
                {/* <i className="fa-solid fa-gauge-high"></i> */}
                {<FaTachometerAlt />}
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/oeeanalysis">
              {/* <i className="fa-solid fa-wrench"></i> */}
              { <h4> <PiNotionLogo /></h4>}
                Overall Equipment Efficiency(OEE)
              </Link>
            </li>
            <li>
              <Link to="/productivity">
              {/* <i className="fa-solid fa-wrench"></i> */}
              {<PiNotionLogo />}
                Productivity Analysis
              </Link>
            </li>
            <li>
              <Link to="/machine-analysis">
              {/* <i className="fa-solid fa-wrench"></i> */}
              {<CiSettings />}
                Machine Analysis
              </Link>
            </li>
            <li>
              <Link to="/power-usage">
                {/* <i className="fa-solid fa-magnifying-glass-chart"></i> */}
                {<MdOutlinePowerSettingsNew />}
                Power Analysis
              </Link>
            </li>
            <li>
              <Link to="#">
                {/* {<i className="fa-solid fa-magnifying-glass-chart"></i> } */}
                {<HiOutlineHomeModern />}
                Inventory Analysis
                {InventoryOpen ?(
                  <RxChevronUp
                  onClick={CloseInventory}
                  size={24}
                  />
                ):
                (
                 <RxChevronDown 
                 onClick={ToggleInventory}
                 className="drop-icon"
                 size={24}
                 />
                )}
              </Link>
              {InventoryOpen && (
                <div className="inventory-item">
                    <ul className="inventory-list-items">
                        <li>
                            <Link href='#' className="inven-item">Warehouse</Link>
                        </li>
                        <li>
                            <Link to='/raw-material' className="inven-item">Inventory</Link>
                        </li>
                        <li>
                            <Link href='#' className="inven-item">Shipment</Link>
                        </li>
                        <li>
                            <Link href='#' className="inven-item">Order</Link>
                        </li>
                    </ul>
                </div>
              )}
            </li>
            <li>
              <Link to="#">
                {/* <i className="fa-solid fa-magnifying-glass-chart"></i> */}
                {<AiOutlineFile />}
                Report
              </Link>
            </li>
            {/* <li>
              <Link to="/qr-code">
                <i className="fa-solid fa-magnifying-glass-chart"></i>
                QR-Code Generation
              </Link>
            </li> */}
            <li>
              <Link to="/help">
                {/* <i className="fa-solid fa-question-circle"></i> */}
                {<IoMdHelpCircleOutline />}
                Help and Support
              </Link>
            </li>
            {/* <li>
              <Link to="/temperature">
                <i className="fa-solid fa-magnifying-glass-chart"></i>
                <span>Predictive Analysis</span>
              </Link>
            </li> */}
            {/* <li>
              <Link to="/pressure">
              <i className="fa-solid fa-gauge-simple-high"></i>
                <span>Pressure Status</span>
              </Link>
            </li> */}
            {/* <li>
              <Link to="/oee-data">
                <i className="fa-solid fa-wrench"></i>
                <span>Overall Equipment<br/>Efficiency(OEE)</span>
              </Link>
            </li> */}
            {/* <li>
              <Link to="/oeeanalysis">
              <i className="fa-solid fa-database"></i>
              <span>OEE analysis</span>
              </Link>
            </li> */}
            {/* <li>
              <Link to="/resources">
                <i className="fa-solid fa-database"></i>
                <span>Resource Planning</span>
              </Link>
            </li> */}
            {/* 
            <li>
              <Link to="#">
                <i className="fa-solid fa-database"></i>
                <span>Get Data</span>
              </Link>
            </li>
            <li>
              <Link href="#">
              <i className="fa-solid fa-bolt"></i><span>Energy Monoitoring</span>
              </Link>
            </li>
            <li>
              <Link href="#">
              <i className="fa-solid fa-users"></i><span>Employee Allocations</span>
              </Link>
            </li>
            <li>
              <Link href="#">
              <i className="fa-solid fa-business-time"></i><span>Job Timeline</span>
              </Link>
            </li>
            
            <li>
              <Link to="/" className="item">
                <i className="fa-solid fa-cog"></i><span>Settings</span>
                {settingOpen ?(
                  <RxChevronUp
                  onClick={CloseSetting}
                  size={24}
                  />
                ):
                (
                 <RxChevronDown 
                 onClick={ToggleSetting}
                 className="drop-icon"
                 size={24}
                 />
                )}
              </Link>
              {settingOpen && (
                <div className="setting-item">
                    <ul className="setting-list-items">
                        <li>
                            <Link href='#' className="set-item">User Management</Link>
                        </li>
                        <li>
                            <Link href='#' className="set-item">Notifications</Link>
                        </li>
                        <li>
                            <Link href='#' className="set-item">Preferences</Link>
                        </li>
                        <li>
                            <Link href='#' className="set-item">Security</Link>
                        </li>
                    </ul>
                </div>
              )}
            </li>
            <li>
              <Link to="/" className="item">
                <i className="fa-solid fa-question-circle"></i>
                <span>Help and Support</span>
                {helpOpen ?(
                    <RxChevronUp
                    onClick={CloseHelp}
                    className="drop-icon"
                    size={24}
                    />
                )
                :
                (
                    <RxChevronDown
                    onClick={ToggleHelp}
                    className="drop-icon"
                    size={24}
                    />
                )}
              </Link>
              {helpOpen && (
                <div className="help-items">
                    <ul className="help-list-items">
                        <li>
                            <Link href='#' className="help-item">User Guide</Link>
                        </li>
                        <li>
                            <Link href='#' className="help-item">FAQ</Link>
                        </li>
                        <li>
                            <Link href='#' className="help-item">Contact Support</Link>
                        </li>
                        <li>
                            <Link href='#' className="help-item">Feedback</Link>
                        </li>
                    </ul>
                </div>
              )}
            </li> */}
          </ul>
          {/* <div
            className={`nav-toggle ${toggle ? "active" : ""}`}
            onClick={() => setToggle(!toggle)}
          >
            <div className={`toggle-menu ${toggle ? "active" : " "}`}></div>
          </div> */}
        </nav>
      </aside>
    </div>
  );
};

Sidebar.propTypes = {
  isSidebarOpen: PropTypes.bool,
  toggleSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
