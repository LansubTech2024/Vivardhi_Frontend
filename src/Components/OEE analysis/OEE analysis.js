import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import './OEE analysis.css';

const Dashboard = () => {
  const data = [
    {
      month: "Month 1",
      manpower: 38,
      production: 360,
      rawMaterial: 300,
      finishedgood:300,
      idealProductionRate: 50,
      actualRunTime: 6.4,
      plannedTime: 8,
      defectiveProducts: 15,
      plannedDowntime: 1.2,
      unplannedDowntime: 0.4,
    },
    {
      month: "Month 2",
      manpower: 52,
      production: 480,
      rawMaterial: 380,
      finishedgood:400,
      idealProductionRate: 50,
      actualRunTime: 6.6,
      plannedTime: 8,
      defectiveProducts: 12,
      plannedDowntime: 0.8,
      unplannedDowntime: 0.6,
    },
    {
      month: "Month 3",
      manpower: 35,
      production: 420,
      rawMaterial: 320,
      finishedgood:300,
      idealProductionRate: 50,
      actualRunTime: 6.4,
      plannedTime: 8,
      defectiveProducts: 18,
      plannedDowntime: 0.9,
      unplannedDowntime: 0.7,
    },
    {
      month: "Month 4",
      manpower: 45,
      production: 500,
      rawMaterial: 440,
      finishedgood:440,
      idealProductionRate: 50,
      actualRunTime: 6.6,
      plannedTime: 8,
      defectiveProducts: 14,
      plannedDowntime: 1.1,
      unplannedDowntime: 0.3,
    },
    {
      month: "Month 5",
      manpower: 50,
      production: 415,
      rawMaterial: 375,
      finishedgood:380,
      idealProductionRate: 50,
      actualRunTime: 6.8,
      plannedTime: 8,
      defectiveProducts: 11,
      plannedDowntime: 0.7,
      unplannedDowntime: 0.5,
    }
  ];

  const [selectedMonthIndex, setSelectedMonthIndex] = useState(0); // Default to the first month

  const calculateMetrics = (month) => {
    const availability = ((month.plannedTime - (month.plannedDowntime + month.unplannedDowntime)) / month.plannedTime) * 100;
    const performance = ((month.production / (month.idealProductionRate * month.actualRunTime)) * 100);
    const quality = ((month.production - month.defectiveProducts) / month.production) * 100;
    const yieldvalue = (month.production / month.rawMaterial) * 100; // Correct yield calculation

    // Cap each metric to 100% if they exceed
    const finalAvailability = Math.min(availability, 100);
    const finalPerformance = Math.min(performance, 100);
    const finalQuality = Math.min(quality, 100);
    const finalYield = Math.min(yieldvalue, 100);

    // Calculate OEE
    const oee = (finalAvailability / 100) * (finalPerformance / 100) * (finalQuality / 100) * 100; // OEE in percentage

    return {
      availability: finalAvailability,
      performance: finalPerformance,
      quality: finalQuality,
      yieldvalue: finalYield,
      oee, // Add OEE to the returned metrics
    };
  };

  const metrics = calculateMetrics(data[selectedMonthIndex]);

  return (
    <div className="manufacture">
      <div className='manufacture-section'>

      {/* Card for the selected month */}
      
        
        <div style={{ display: 'flex', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px',marginTop:'80px' }}>
          <div className='card'>
            <h3 className="text-base font-medium">OEE</h3>
            <div className="text-2xl font-semibold">{metrics.oee.toFixed(2)}%</div>
          </div>
          <div className='card'>
            <h3 className="text-base font-medium">Availability</h3>
            <div className="text-2xl font-semibold">{metrics.availability.toFixed(2)}%</div>
          </div>
          <div className='card'>
            <h3 className="text-base font-medium">Performance</h3>
            <div className="text-2xl font-semibold">{metrics.performance.toFixed(2)}%</div>
          </div>
          <div className='card'>
            <h3 className="text-base font-medium">Quality</h3>
            <div className="text-2xl font-semibold">{metrics.quality.toFixed(2)}%</div>
          </div>
          <div className='card'>
            <h3 className="text-base font-medium">Yield</h3>
            <div className="text-2xl font-semibold">{metrics.yieldvalue.toFixed(2)}%</div>
          </div>
        </div>
      

      {/* Consolidated Charts Section */}
      
      <h2 className="text-lg font-medium">OEE Metrics</h2>
      <div className='Availability'>
      <div style={{ display: 'grid',  gap: '40px', height:"300px" }}>
        {/* Availability Chart */}
        <div style={{ height: '200px' }}>
          <h3 className="text-base font-medium">Availability</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barSize={40}>
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#666' }}
              />
              <YAxis hide={true} />
              <Bar 
                dataKey="manpower" 
                fill="#f3f4f6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        </div>

        {/* Production Chart */}
        <div className='Production'>
        <div style={{ display: 'grid', margin:"center", gap: '20px',height: '300px' }}>
          <h3 className="text-base font-medium">Production Output</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#666' }}
              />
              <YAxis axisLine={true} tickLine={true} tick={false} /> 
              <Tooltip />
              <Line 
                type="monotone"
                dataKey="production"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        </div>

        <div className='Inventary'></div>
        
        <h2 className="text-lg font-medium">Inventory</h2>
        <h2>Raw material</h2>
        <div style={{ display: 'block', gridTemplateColumns: '1fr 1fr', gap: '20px', height:"300px",marginLeft:'100px',width:'800px'  }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#666' }}
              />
              <YAxis axisLine={true} tickLine={false} tick={false} /> 
              <Tooltip />
              <Line 
                type="monotone"
                dataKey="rawMaterial"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div style={{ display: 'block', gap: '10px',height: '300px',width:'800px', marginLeft:'100px'}}>
          <h2 className="text-base font-medium">Finishedgood</h2>
          <h2>1000unit</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barSize={40}>
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#666' }}
              />
              <YAxis hide={true} />
              <Bar 
                dataKey="finishedgood" 
                fill="#f3f4f6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        </div>
      </div>
      </div>
    
  );
};

export default Dashboard;
