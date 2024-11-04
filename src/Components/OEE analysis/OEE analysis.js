import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './OEE analysis.css';

const OeeDashboard = () => {
    const [machines, setMachines] = useState([]);
    const [searchZone, setSearchZone] = useState('');
    const [selectedZone, setSelectedZone] = useState('all');
    const navigate = useNavigate();
     // Get the selected metric from query parameters
     const location = useLocation();
     const params = new URLSearchParams(location.search);
     const selectedMetric = params.get('metric');
     

    // Fetch machine data on component mount
    useEffect(() => {
        const fetchMachineData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/oeemachine'); // Update with your API URL
                setMachines(response.data);
            } catch (error) {
                console.error("Error fetching machine data:", error);
            }
        };
        fetchMachineData();
    }, []);

    // Handle row click to display machine details
    const handleRowClick = (machine) => {
        navigate(`/machine-details/${machine.machineId}`, { state: { machine } });
    };


    // Filter machines by zone and search text
    const filteredMachines = machines.filter(machine => {
        const matchesZone = selectedZone === 'all' || machine.zoneName.toLowerCase() === selectedZone.toLowerCase();
        const matchesSearch = machine.zoneName.toLowerCase().includes(searchZone.toLowerCase());
        return matchesZone && matchesSearch;
    });



    // Define CSS classes to blur columns that are not selected
    const getColumnClass = (column) => {
        if (!selectedMetric) {
            return 'visible-column';
        }
        if (column === 'machine' || column === selectedMetric) {
            return 'visible-column';
        }
        return 'blurred-column';
    };

    // Unique zone names for dropdown options
    const zoneOptions = ['all', ...new Set(machines.map(machine => machine.zoneName))];


    return (
        <div className="oee-table-part">
            <h2>Machine OEE Dashboard</h2>

            {/* Dropdown to filter by zone */}
            <select
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
                style={{ marginBottom: '20px', padding: '10px', width: '200px' }}
            >
                {zoneOptions.map(zone => (
                        <option key={zone} value={zone}>
                            {zone === 'all' ? 'All Zones' : zone}
                        </option>
                    ))}
            </select>

            {/* Table to display OEE data */}
            <table>
                <thead>
                    <tr>
                        <th className={getColumnClass('machine')}>Machine</th>
                        <th className={getColumnClass('oee')}>OEE (%)</th>
                        <th className={getColumnClass('availability')}>Availability (%)</th>
                        <th className={getColumnClass('performance')}>Performance (%)</th>
                        <th className={getColumnClass('quality')}>Quality (%)</th>
                    </tr>
                </thead>
                <tbody>
                {filteredMachines.length > 0 ? (
                    filteredMachines.map(machine => (
                        <tr key={machine.machineId} onClick={() => handleRowClick(machine)}>
                        <td className={getColumnClass('machine')}>{machine.machineId}</td>
                        <td className={getColumnClass('oee')}>{machine.oee}</td>
                        <td className={getColumnClass('availability')}>{machine.availability}</td>
                        <td className={getColumnClass('performance')}>{machine.performance}</td>
                        <td className={getColumnClass('quality')}>{machine.quality}</td>
                    </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" style={{ textAlign: 'center' }}>No machines found for the selected zone.</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default OeeDashboard;
