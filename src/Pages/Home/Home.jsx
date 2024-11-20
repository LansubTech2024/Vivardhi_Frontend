import Header from '../../Components/Header/Header'
import Sidebar from '../../Components/SideBar/Sidebar'
import Logo from '../../../src/Images/lansub.png'
import "./Home.css";


const Home = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <main className="home-main">
        <div className="home-main-content">
          <img src={Logo} alt='home-logo' />
        </div>
        <section className="home-overview-section">
                <div className="home-overview">
                    <h2>Application Overview</h2>
                    <p>
                    Our application 'Opfact' visualizes real-time manufacturing data and features a professional OEE-based dashboard. It includes modules for productivity analysis, machine performance, inventory tracking, and power consumption insights, providing a comprehensive overview for operational excellence.
                    </p>
                </div>
            </section>
      </main>
    </>
  );
};

export default Home;
