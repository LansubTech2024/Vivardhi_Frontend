
import { useState, useEffect } from 'react';

export const usePowerUsageMetrics = () => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      const response = await fetch('https://opfactbackend-aeh5g0a3fkbtcbae.canadacentral-01.azurewebsites.net/api/power-metrics');
      const data = await response.json();
      setMetrics(data);
    };

    fetchMetrics();
  }, []);

  return metrics;
};