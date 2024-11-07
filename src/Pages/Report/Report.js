import Header from '../../Components/Header/Header';
import Report from '../../Components/Report/Report';
import Sidebar from '../../Components/SideBar/Sidebar';


const About = () => {
  return (
    <>
    <Header/>
    <Sidebar/>
    <div className='Report'>
      <Report/>
    </div>
    </>
  )
}

export default About;