import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OEE analysis.css';

const OeeDashboard = () => {
    const [machines, setMachines] = useState([]);
    const [selectedMachine, setSelectedMachine] = useState(null);
    const [searchZone, setSearchZone] = useState('');

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
        setSelectedMachine(machine);
    };

    // Filter machines by zone
    const filteredMachines = machines.filter(machine => 
        machine.zoneName.toLowerCase().includes(searchZone.toLowerCase())
    );

    return (
        <div>
            <h2>Machine OEE Dashboard</h2>

            {/* Search bar to filter by zone */}
            <input
                type="text"
                placeholder="Search by Zone..."
                value={searchZone}
                onChange={(e) => setSearchZone(e.target.value)}
                style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
            />

            {/* Table to display OEE data */}
            <table>
                <thead>
                    <tr>
                        <th>Machine ID</th>
                        <th>Zone Name</th>
                        <th>Availability (%)</th>
                        <th>Performance (%)</th>
                        <th>Quality (%)</th>
                        <th>OEE (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredMachines.map(machine => (
                        <tr key={machine.machineId} onClick={() => handleRowClick(machine)}>
                            <td>{machine.machineId}</td>
                            <td>{machine.zoneName}</td>
                            <td>{machine.availability}</td>
                            <td>{machine.performance}</td>
                            <td>{machine.quality}</td>
                            <td>{machine.oee}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Display details in individual cards if a machine is selected */}
            {selectedMachine && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Details for Machine {selectedMachine.machineId}</h3>
                    <div className="card-container">
                        {/* OEE Metrics Cards */}
                        <div className="card">
                            <h3>Availability</h3>
                            <p>{selectedMachine.availability}%</p>
                        </div>
                        <div className="card">
                            <h3>Performance</h3>
                            <p>{selectedMachine.performance}%</p>
                        </div>
                        <div className="card">
                            <h3>Quality</h3>
                            <p>{selectedMachine.quality}%</p>
                        </div>
                        <div className="card">
                            <h3>OEE</h3>
                            <p>{selectedMachine.oee}%</p>
                        </div>

                        {/* Performance Details */}
                        <h4>Performance Details</h4>
                        <div className="card">
                            <h4>Total Pieces</h4>
                            <p>{selectedMachine.productionDetails?.totalPieces}</p>
                        </div>
                        <div className="card">
                            <h4>Good Pieces</h4>
                            <p>{selectedMachine.productionDetails?.goodPieces}</p>
                        </div>
                        <div className="card">
                            <h4>Target</h4>
                            <p>{selectedMachine.target}</p>
                        </div>

                        {/* Quality Details */}
                        <h4>Quality Details</h4>
                        <div className="card">
                            <h4>Waste Scrap</h4>
                            <p>{selectedMachine.productionDetails?.wasteScrap}</p>
                        </div>
                        <div className="card">
                            <h4>Waste Defect</h4>
                            <p>{selectedMachine.productionDetails?.wasteDefect}</p>
                        </div>

                        {/* Availability Details */}
                        <h4>Availability Details</h4>
                        <div className="card">
                            <h4>Uptime</h4>
                            <p>{selectedMachine.uptime}</p>
                        </div>
                        <div className="card">
                            <h4>Downtime</h4>
                            <p>{selectedMachine.downtime}</p>
                        </div>
                        <div className="card">
                            <h4>Status</h4>
                            <p>{selectedMachine.machineStatus}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OeeDashboard;
