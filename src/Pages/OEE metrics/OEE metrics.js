import Header from '../../Components/Header/Header';
import OEEmetrics from '../../Components/OEE metrics/OEE metrics'
import Sidebar from '../../Components/SideBar/Sidebar';

const About = () => {
  return (
    <>
    <Header/>
    <Sidebar/>
    <div>
      <OEEmetrics/>
    </div>
    </>
  )
}

export default About;