import React from "react";
import GaugeChart from "react-gauge-chart";

const Performance = () => {
  const machineData = {
    temperature: 75,
    pressure: 120,
    standardTemp: 80,
    standardPressure: 130,
  };

  const manpowerData = {
    output: 100,
    manHours: 20,
  };

  const machineEfficiency =
    (machineData.temperature / machineData.standardTemp +
      machineData.pressure / machineData.standardPressure) /
    2;
  const manpowerEfficiency = manpowerData.output / manpowerData.manHours;

  return (
    <>
      <div className="performance">
        <h2>Performance</h2>
      </div>
      <div
        className="performance-graphs"
      >
        <div className="machine-meter">
        <div style={{ textAlign: "center", width:"500px" }}>
          <h2>Machine Performance</h2>
          <GaugeChart
            id="machine-performance-gauge"
            nrOfLevels={10}
            percent={machineEfficiency}
            textColor="#1d4f91"
            arcWidth={0.3}
            needleColor="#000"
            needleBaseColor="#000"
          />
          <p>Efficiency Ratio: {(machineEfficiency * 100).toFixed(2)}%</p>
        </div>
        <div className="section-style">
          <h3 className="sub-header-style">Machine Efficiency</h3>
          <p>
            Machine efficiency is calculated as the average of temperature and
            pressure ratios:
          </p>
          <div className="code-style">
            (Temperature / Standard Temperature + Pressure / Standard Pressure)
            / 2
          </div>
        </div>
        </div>
        <div className="manpower-meter">
        <div style={{ textAlign: "center", width:"500px" }}>
          <h2>Manpower Performance</h2>
          <GaugeChart
            id="manpower-performance-gauge"
            nrOfLevels={10}
            percent={manpowerEfficiency / 10} // Assuming a maximum output of 1000 units
            textColor="#1d4f91"
            arcWidth={0.3}
            needleColor="#000"
            needleBaseColor="#000"
          />
          <p>Output per Man-Hour: {manpowerEfficiency.toFixed(2)} units/hour</p>
        </div>
        <div className="section-style">
          <h3 className="sub-header-style">Manpower Efficiency</h3>
          <p>
            Manpower efficiency is calculated as the ratio of output to
            man-hours:
          </p>
          <div className="code-style">Output / Man-Hours</div>
        </div>
        </div>
      </div>
    </>
  );
};

export default Performance;
