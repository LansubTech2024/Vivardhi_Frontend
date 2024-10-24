import React from 'react';
import './Inventory.css';

const Inventory = () => {
  const materials = [
    {
      name: 'Aluminum Rods (1/4-20 × 1/2)',
      vendor: 'Trellis',
      leadTime: '2 weeks',
      supplyChainRisk: 'Medium',
      quantity: 35000,
      image: 'https://via.placeholder.com/50',
    },
    {
      name: 'Stainless Steel Rods (1/4-20)',
      vendor: 'Blue Ridge Hardware',
      leadTime: '3 days',
      supplyChainRisk: 'Low',
      quantity: 2000,
      image: 'https://via.placeholder.com/50', 
    },
  ];

  const vendors = [
    { name: 'Trellis', leadTime: '2 weeks', supplyChainRisk: 'Medium', stock: 35000, logo: 'https://via.placeholder.com/50' },
    { name: 'Blue Ridge Hardware', leadTime: '3 days', supplyChainRisk: 'Low', stock: 12000, logo: 'https://via.placeholder.com/50' },
    { name: 'Pioneer Fasteners', leadTime: '1 week', supplyChainRisk: 'High', stock: 8000, logo: 'https://via.placeholder.com/50' },
    { name: 'Summit Industrial Supplies', leadTime: '4 days', supplyChainRisk: 'Low', stock: 18000, logo: 'https://via.placeholder.com/50' },
  ];

  const insights = () => {
    const lowStockItems = materials.filter(item => item.quantity < 10000);
    
    if (lowStockItems.length > 0) {
      return (
        <div className="insights">
          <h3>Inventory Alerts</h3>
          {lowStockItems.map((item, index) => (
            <p key={index} className="insight-alert">
              <span className="warning-icon">⚠️</span>
              {item.name} is running low ({item.quantity.toLocaleString()} units)
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const getRiskClass = (risk) => {
    switch (risk.toLowerCase()) {
      case 'low':
        return 'risk-low';
      case 'medium':
        return 'risk-medium';
      case 'high':
        return 'risk-high';
      default:
        return '';
    }
  };

  return (
    <div className="inventory-container">
      <div className="insight-card">
        {insights()}
      </div>

      <section className="inventory-section">
        <h2 className="section-title">Predictive Restocking</h2>
        <div className="materials-grid">
          {materials.map((item, index) => (
            <div className="material-card" key={index}>
              <div className="material-header">
                <img src={item.image} alt={item.name} className="material-image" />
                <div className="material-title">{item.name}</div>
              </div>
              <div className="material-info">
                <div className="info-row">
                  <span className="label">Vendor:</span> {item.vendor}
                </div>
                <div className="info-row">
                  <span className="label">Lead Time:</span> {item.leadTime}
                </div>
                <div className="info-row">
                  <span className="label">Risk:</span> 
                  <span className={`risk-badge ${getRiskClass(item.supplyChainRisk)}`}>
                    {item.supplyChainRisk}
                  </span>
                </div>
              </div>
              <div className="stock-info">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${(item.quantity / 35000) * 100}%` }}
                  ></div>
                </div>
                <div className="quantity">{item.quantity.toLocaleString()} units</div>
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
              <img src={vendor.logo} alt={vendor.name} className="vendor-logo" />
              <div className="vendor-info">
                <h3 className="vendor-name">{vendor.name}</h3>
                <div className="info-row">
                  <span className="label">Lead Time:</span> {vendor.leadTime}
                </div>
                <div className="info-row">
                  <span className="label">Stock:</span> {vendor.stock.toLocaleString()} units
                </div>
                <div className="info-row">
                  <span className={`risk-badge ${getRiskClass(vendor.supplyChainRisk)}`}>
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