import { useEffect, useState } from 'react';
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/SideBar/Sidebar';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CSVLink } from 'react-csv';
import './Resource.css';

function GetData() {
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [filterText, setFilterText] = useState('');

    useEffect(() => {
        axios('http://127.0.0.1:8000/api/get-resources/')
            .then(response => {
              console.log('Data fetched:', response.data);
                setData(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(filterText.toLowerCase())
    );

    const filteredByDateData = filteredData.filter(item => {
        if (!startDate || !endDate) return true;
        const itemDate = new Date(item.date); // assuming 'date' is a field in your data
        return itemDate >= startDate && itemDate <= endDate;
    });

    return (
        <>
          <Header/>
          <Sidebar/>
          <div className='resource-container'>
            <h2>Resources Data</h2>

            {/* Filter and Date Range Picker */}
            <div className='filter-container'>
                    <div className='date-range'>
                        <span>Range: </span>
                        <DatePicker
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            dateFormat="MM/dd/yyyy"
                            placeholderText="Start Date"
                        />
                        <DatePicker
                            selected={endDate}
                            onChange={date => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            dateFormat="MM/dd/yyyy"
                            placeholderText="End Date"
                        />
                    </div>

                    <div className='filter-box'>
                        <input
                            type="text"
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                            placeholder="Filter by Name"
                        />
                    </div>

                    <div className='download-section'>
                        <CSVLink data={filteredByDateData} filename={"resources_data.csv"}>
                            <i class="fa-solid fa-download"></i>
                        </CSVLink>
                    </div>
                </div>
            <table className='table-container'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Working</th>
                        <th>Worked</th>
                        <th>Leave</th>
                        <th>Working Hours</th>
                        <th colSpan="2">Shift</th>
                        <th>Allocated/Not Allocated</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>Day</th>
                        <th>Night</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredByDateData.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.working}</td>
                            <td>{item.worked}</td>
                            <td>{item.leave}</td>
                            <td>{item.working_hours}</td>
                            <td>{item.shift === 'Day' ?'✔️' : ''}</td>
                            <td>{item.shift === 'Night' ?'✔️' : ''}</td>
                            <td style={{color : item.allocated === 'Yes' ? 'green' : 'red'}}>
                            {item.allocated}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </>
    );
}

export default GetData;

