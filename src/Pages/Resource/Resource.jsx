import { useEffect, useState } from 'react';
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/SideBar/Sidebar';
import axios from 'axios';
import './Resource.css';

function GetData() {
    const [data, setData] = useState([]);

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

    return (
        <>
          <Header/>
          <Sidebar/>
          <div className='resource-container'>
            <h2>Resources Data</h2>
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
                    {data.map((item) => (
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

