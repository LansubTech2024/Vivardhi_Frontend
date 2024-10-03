import { useEffect, useState } from 'react';
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/SideBar/Sidebar';
import axios from 'axios';
import './GetData.css';

function GetData() {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch data from the Flask API when the component mounts
        axios.get('http://127.0.0.1:5000/api/data')
            .then(response => {
              console.log('Data fetched:', response.data);
                setData(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);

    return (
        <>
          <Header/>
          <Sidebar/>
          <div className='getdata-container'>
            <h2>Data from SQL Database</h2>
            <table className='table-container'>
                <thead>
                    <tr>
                        {/* Adjust column headers according to your data */}
                        <th>ID</th>
                        <th>CHW_IN_TEMP</th>
                        <th>CHW_OUT_TEMP</th>
                        <th>COW_IN_TEMP</th>
                        <th>COW_OUT_TEMP</th>
                        {/* Add more columns as needed */}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.ID}</td>
                            <td>{item.CHW_IN_TEMP}</td>
                            <td>{item.CHW_OUT_TEMP}</td>
                            <td>{item.COW_IN_TEMP}</td>
                            <td>{item.COW_OUT_TEMP}</td>
                            {/* Add more cells as needed */}
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </>
    );
}

export default GetData;

