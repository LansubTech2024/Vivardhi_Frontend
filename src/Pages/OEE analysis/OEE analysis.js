import Header from '../../Components/Header/Header';
import OEEanalysis from '../../Components/OEE analysis/OEE analysis';
import Sidebar from '../../Components/SideBar/Sidebar';
import "./OEE analysis.css"

const About = () => {
  return (
    <>
    <Header/>
    <Sidebar/>
    <div className='oee-table'>
      <OEEanalysis/>
    </div>
    </>
  )
}

export default About;