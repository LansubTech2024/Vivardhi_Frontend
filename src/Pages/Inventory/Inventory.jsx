import React, { useState, useEffect } from "react";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/SideBar/Sidebar";
import "./Inventory.css";

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [lowStockAlert, setLowStockAlert] = useState([]);
  const [addedItems, setAddedItems] = useState([]);

  const vendors = [
    {
      name: "Trellis",
      leadTime: "2 weeks",
      supplyChainRisk: "Medium",
      stock: 35000,
      logo: "data:image/jpeg;base64,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",
    },
    {
      name: "Blue Ridge Hardware",
      leadTime: "3 days",
      supplyChainRisk: "Low",
      stock: 12000,
      logo: "data:image/jpeg;base64,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",
    },
    {
      name: "Pioneer Fasteners",
      leadTime: "1 week",
      supplyChainRisk: "High",
      stock: 8000,
      logo: "data:image/jpeg;base64,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",
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
        //const response = await fetch("https://opfactbackend-aeh5g0a3fkbtcbae.canadacentral-01.azurewebsites.net/api/inventory");
        const response = await fetch("http://localhost:5000/api/inventory");
        const data = await response.json();
        setInventoryData(data);

        // Check for low stock and set alert messages
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
          setLowStockAlert([]); // Reset if no low stock
        }
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      }
    };

    fetchInventoryData();
  }, []);

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

  const handleAddItem = (item) => {
    setAddedItems((prevItems) => [...prevItems, item]);
    // Update the inventoryData with incremented addedCount
    const updatedItems = inventoryData.map((inventoryItem) =>
      inventoryItem.id === item.id
        ? { ...inventoryItem, addedCount: (inventoryItem.addedCount || 0) + 1 }
        : inventoryItem
    );
    setInventoryData(updatedItems);
  };

  const handleRemoveItem = (item) => {
    setAddedItems((prevItems) =>
      prevItems.filter((addedItem) => addedItem.id !== item.id)
    );

    // Update the inventoryData by decrementing addedCount
    const updatedItems = inventoryData.map((inventoryItem) =>
      inventoryItem.id === item.id
        ? {
            ...inventoryItem,
            addedCount: Math.max(
              0,
              (inventoryItem.addedCount || 0) - 1 // Prevent negative values
            ),
          }
        : inventoryItem
    );
    setInventoryData(updatedItems);
  };
  return (
    <>
      <Header
        addedItems={addedItems}
        setAddedItems={setAddedItems}
        handleRemoveItem={handleRemoveItem}
      />
      <Sidebar />
      <div className="raw-container">
        <div className="raw-section">
          <h2>Raw Material Inventory</h2>
          <div className="inventory-container">
            <div className="insight-card">
              {lowStockAlert.length > 0 && (
                <div className="alert">
                  {lowStockAlert.map((alert, index) => (
                    <p key={index} style={{ color: "red", fontWeight: "bold" }}>
                      {alert}
                    </p>
                  ))}
                </div>
              )}
            </div>

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
                    {/* <div className="bar">
                <div
                  className="bar-fill"
                  style={{
                    width: `${
                      (item.currentStock / item.minimumRequired) * 100
                    }%`,
                    backgroundColor:
                      item.currentStock < item.minimumRequired
                        ? "#ff0000"
                        : "#3e98c7",
                  }}
                ></div>
              </div> */}
                    <div className="button-count-container">
                      <button
                        className="add-button"
                        onClick={() => handleAddItem(item)}
                      >
                        Add
                      </button>
                      <p className="count">
                        <strong>+</strong> {item.addedCount}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="inventory-section">
              <h2 className="section-title">Finished Goods Inventory</h2>
              <div className="materials-grid">
                {inventoryData.map((item, index) => (
                  <div className="item" key={index}>
                    <p>
                      <strong>Finished Good:</strong> {item.finishedGoodName} (
                      {item.finishedGoodId})
                    </p>
                    <p>Current Stock: {item.finishedGoodCurrentStock}</p>
                    <p>Minimum Required: {item.finishedGoodMinimumRequired}</p>
                    {/* <div className="bar">
                <div
                  className="bar-fill"
                  style={{
                    width: `${
                      (item.finishedGoodCurrentStock / item.finishedGoodMinimumRequired) * 100
                    }%`,
                    backgroundColor:
                      item.finishedGoodCurrentStock < item.finishedGoodMinimumRequired
                        ? "#ff0000"
                        : "#3e98c7",
                  }}
                ></div>
              </div> */}
                    <div className="button-count-container">
                      <button
                        className="add-button"
                        onClick={() => handleAddItem(item)}
                      >
                        Add
                      </button>
                      <p className="count">+{item.addedCount}</p>
                    </div>
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
                        <span className="label">Lead Time:</span>{" "}
                        {vendor.leadTime}
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
        </div>
      </div>
    </>
  );
};

export default Inventory;
