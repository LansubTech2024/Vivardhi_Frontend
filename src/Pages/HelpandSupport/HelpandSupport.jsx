import './HelpandSupport.css'
import Logo from '../../Images/logo3.png';
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/SideBar/Sidebar';

const HelpandSupport = () => {
  return (
    <>
    <Header/>
    <Sidebar/>
    <div className="help-support-page">
            <header className="header-logo">
                <img src={Logo} alt="Company Logo" className="company-logo" height={150}/>
            </header>
            <section className="contact-info">
                <h2>Help & Support</h2>
                <ul>
                    <li>
                        <strong>Contact Number:</strong> +91 8667257110
                    </li>
                    <li>
                        <strong>Email:</strong> info@lansubtechnologies.com
                    </li>
                    <li className='linkedin-link'>
                        <strong>LinkedIn:</strong> <a href=" https://www.linkedin.com/company/lansub-technologies" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
                    </li>
                </ul>
            </section>
        </div>
        </>
  )
}

export default HelpandSupport
