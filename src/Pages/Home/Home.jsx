import Header from '../../Components/Header/Header'
import Sidebar from '../../Components/SideBar/Sidebar'
import Logo from '../../../src/Images/lansub.png'
import "./Home.css";


const Home = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <main className="main">
        <div className="home-main-content">
          <img src={Logo} alt='home-logo' />
        </div>
        <section className="home-overview-section">
                <div className="home-overview">
                    <h2>Application Overview</h2>
                    <p>
                        Our application &apos;Opfact&apos; is designed to provide real-time insights into manufacturing performance by visualizing critical data such as temperature trends, temperature changes, average pressures, and their distributions. We present this information through intuitive graphs and impact cards to help users make informed decisions. By analyzing data on temperature fluctuations and pressure metrics, users can monitor equipment performance, assess efficiency, and identify areas for improvement. Our application integrates seamlessly with MES (Manufacturing Execution Systems) to offer comprehensive visibility into production processes, ensuring operational excellence and enhanced decision-making.
                    </p>
                </div>
            </section>
      </main>
    </>
  );
};

export default Home;
