
import { useState, useEffect } from 'react';

export const usePowerUsageMetrics = () => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      //const response = await fetch("https://opfactback1-d0aec8cfeqcmbec8.canadacentral-01.azurewebsites.net/api/power-metrics");
      const response = await fetch('http://localhost:5001/api/power-metrics');
      const data = await response.json();
      setMetrics(data);
    };

    fetchMetrics();
  }, []);

  return metrics;
};
