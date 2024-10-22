import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Quality = () => {
  const qualityData = {
    TotalProducts: 1000,
    defectiveProducts: 98,
    dispatchedProducts: 832,
    scrapProducts: 70,
  };

  const getPercentage = (value, total) => (value / total) * 100;

  return (
    <>
      <div className="quality">
        <h2>Quality</h2>
      </div>
      <div className="quality-cards">
        <div className="cardStyle">
          <h3>Total Products</h3>
          <CircularProgressbar
            value={getPercentage(qualityData.TotalProducts, 1000)}
            text={`${getPercentage(qualityData.TotalProducts, 1000).toFixed(2)}%`}
            styles={buildStyles({ pathColor: "#1d4f91", textColor: "#0b6fa4",trailColor: '#4a90e2' })}
          />
        </div>
        <div className="cardStyle">
          <h3>Defective Products</h3>
          <CircularProgressbar
            value={getPercentage(qualityData.defectiveProducts, qualityData.TotalProducts)}
            text={`${getPercentage(qualityData.defectiveProducts, qualityData.TotalProducts).toFixed(2)}%`}
            styles={buildStyles({ pathColor: "#1d4f91", textColor: "#1d4f91" ,trailColor: '#4a90e2'})}
          />
        </div>
        <div className="cardStyle">
          <h3>Dispatched Products</h3>
          <CircularProgressbar
            value={getPercentage(qualityData.dispatchedProducts, qualityData.TotalProducts)}
            text={`${getPercentage(qualityData.dispatchedProducts, qualityData.TotalProducts).toFixed(2)}%`}
            styles={buildStyles({ pathColor: "#1d4f91", textColor: "#1d4f91",trailColor: '#4a90e2'})}
          />
        </div>
        <div className="cardStyle">
          <h3>Scrap Products</h3>
          <CircularProgressbar
            value={getPercentage(qualityData.scrapProducts, qualityData.TotalProducts)}
            text={`${getPercentage(qualityData.scrapProducts, qualityData.TotalProducts).toFixed(2)}%`}
            styles={buildStyles({ pathColor: "#1d4f91", textColor: "#1d4f91",trailColor: '#4a90e2'})}
          />
        </div>
      </div>
    </>
  );
};

export default Quality;
