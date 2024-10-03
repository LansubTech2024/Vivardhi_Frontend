import './OEEData.css'
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/SideBar/Sidebar';
import Assumption from '../../Components/Assumption/Assumption';

const OEEData = () => {
  return (
    <>
    <Header/>
    <Sidebar/>
    <div className='oee-container'>
        <div className='oee-grid'>
         <Assumption/>
        </div>
    </div>
    </>
  )
}

export default OEEData;
