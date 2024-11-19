
import { useState, useEffect } from 'react';

export const usePowerUsageMetrics = () => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      const response = await fetch('http://localhost:5000/api/power-metrics');
      const data = await response.json();
      setMetrics(data);
    };

    fetchMetrics();
  }, []);

  return metrics;
};
