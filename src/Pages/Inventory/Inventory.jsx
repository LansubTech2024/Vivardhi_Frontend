import React from 'react';
import Inventory from "../../Components/Inventory/Inventory";
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/SideBar/Sidebar';
import './Inventory.css';

function App() {
  return (
    <>
    <Header/>
    <Sidebar/>
    <div className="raw-container">
      <div className="raw-section">
        <h1>Raw Material Inventory</h1>
      <Inventory />
      </div>
    </div>
    </>
  );
}

export default App;
