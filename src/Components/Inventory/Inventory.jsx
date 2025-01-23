import React, { useState, useEffect } from "react";
import "./Inventory.css";

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [lowStockAlert, setLowStockAlert] = useState([]);
  const [addCount, setAddCount] = useState({});
  const [notifications, setNotifications] = useState([]);

  const vendors = [
    {
      name: "Trellis",
      leadTime: "2 weeks",
      supplyChainRisk: "Medium",
      stock: 35000,
    },
    {
      name: "Blue Ridge Hardware",
      leadTime: "3 days",
      supplyChainRisk: "Low",
      stock: 12000,
    },
    {
      name: "Pioneer Fasteners",
      leadTime: "1 week",
      supplyChainRisk: "High",
      stock: 8000,
    },
    {
      name: "Summit Industrial Supplies",
      leadTime: "4 days",
      supplyChainRisk: "Low",
      stock: 18000,
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_jfk6uMi-_TzlOr4SUi4XAJtG63IBZWImzQ&s",
    },
  ];

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const response = await fetch("http://opfactback1-d0aec8cfeqcmbec8.canadacentral-01.azurewebsites.net/api/inventory");
        const data = await response.json();
        setInventoryData(data);

        const lowStockItems = data.filter(
          (item) => item.currentStock < item.minimumRequired
        );
        if (lowStockItems.length > 0) {
          const alerts = lowStockItems.map(
            (item) =>
              `${item.rawMaterialName} stock is below minimum required level!`
          );
          setLowStockAlert(alerts);
        } else {
          setLowStockAlert([]);
        }
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      }
    };

    fetchInventoryData();
  }, []);

  const handleAdd = (id, name) => {
    setAddCount((prevState) => ({
      ...prevState,
      [id]: (prevState[id] || 0) + 1,
    }));

    const message = `${name} added successfully. Current count: ${(addCount[id] || 0) + 1}`;
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { id: Date.now(), message },
    ]);
  };

  const handleDeleteNotification = (notificationId) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== notificationId)
    );
  };

  const getRiskClass = (risk) => {
    switch (risk.toLowerCase()) {
      case "low":
        return "risk-low";
      case "medium":
        return "risk-medium";
      case "high":
        return "risk-high";
      default:
        return "";
    }
  };

  return (
    <div className="inventory-container">
      {/* Display alerts */}
      {lowStockAlert.length > 0 && (
        <div className="alert">
          {lowStockAlert.map((alert, index) => (
            <p key={index} style={{ color: "red", fontWeight: "bold" }}>
              {alert}
            </p>
          ))}
        </div>
      )}

      {/* Display notifications */}
      {notifications.length > 0 && (
        <div className="notifications">
          {notifications.map((notification) => (
            <div key={notification.id} className="notification">
              <span>{notification.message}</span>
              <button
                className="delete-btn"
                onClick={() => handleDeleteNotification(notification.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      <section className="inventory-section">
        <h2 className="section-title">Predictive Restocking</h2>
        <div className="materials-grid">
          {inventoryData.map((item, index) => (
            <div className="item" key={index}>
              <p>
                <strong>Raw Material:</strong> {item.rawMaterialName} (
                {item.rawMaterialId})
              </p>
              <p>Current Stock: {item.currentStock}</p>
              <p>Minimum Required: {item.minimumRequired}</p>
              <p>Added Count: {addCount[item.rawMaterialId] || 0}</p>
              <button
                className="add-btn"
                onClick={() =>
                  handleAdd(item.rawMaterialId, item.rawMaterialName)
                }
              >
                Add
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="inventory-section">
        <h2 className="section-title">Vendor Availability</h2>
        <div className="vendors-grid">
          {vendors.map((vendor, index) => (
            <div className="vendor-card" key={index}>
              <img
                src={vendor.logo}
                alt={vendor.name}
                className="vendor-logo"
              />
              <div className="vendor-info">
                <h3 className="vendor-name">{vendor.name}</h3>
                <div className="info-row">
                  <span className="label">Lead Time:</span> {vendor.leadTime}
                </div>
                <div className="info-row">
                  <span className="label">Stock:</span>{" "}
                  {vendor.stock.toLocaleString()} units
                </div>
                <div className="info-row">
                  <span
                    className={`risk-badge ${getRiskClass(
                      vendor.supplyChainRisk
                    )}`}
                  >
                    {vendor.supplyChainRisk} Risk
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Inventory;
