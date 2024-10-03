import { useState, useEffect } from "react";
import "./CompanyInfo.css";
import Logo from "../../../src/Images/logo3.png";
import { FaMapMarkerAlt,FaEnvelope,FaPhone } from "react-icons/fa";


const CompanyInfo = () => {
  const [logoClass, setLogoClass] = useState("logo-center");
  const [contentClass, setContentClass] = useState('');

  useEffect(() => {
    // Move the logo to the top after the page loads
    setTimeout(() => {
      setLogoClass('logo-top');
    }, 500); // Delay to see the effect

    // Fade in the content after the logo animation
    setTimeout(() => {
      setContentClass('content-visible');
    }, 1500); // Delay to allow the logo to finish moving
  }, []);
  return (
  
    <div className="company-details">
      <div className={`logo-container ${logoClass}`}>
        <img src={Logo} alt="company-logo" width={100} />
        <h2>Lansub Technologies</h2>
      </div>
      <main className={`content-container ${contentClass}`}>
        {/* Company Overview Section */}
        <section className="company-overview">
          <h1>About Us</h1>
          <h2>What we do</h2>
          <p>
            Lansub Tech is a leading innovator in the technology sector,
            providing cutting-edge solutions to clients worldwide. Established
            in 2024, we have consistently delivered top-quality products and
            services.
          </p>
        </section>
        {/* Work Information Section */}
        <section className="our-work">
          <h3>Our Work</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse quod
            amet numquam itaque neque est animi praesentium impedit maxime
            incidunt velit qui quas hic fugiat fuga blanditiis quam, porro
            architecto.
          </p>
        </section>
        <section className="why-us">
            <h3>Why Us</h3>
            <p>Lansub Tech is a leading innovator in the technology sector,
            providing cutting-edge solutions to clients worldwide. Established
            in 2024, we have consistently delivered top-quality products and
            services.</p>
        </section>
        {/* Contact Information Section */}
        <section className="contact-information">
            <div className="container">
                <div className="row">
            <div className="col-lg-4 col-md-6">
                <div className="contact-about">
               <h4>Our-Company</h4>
               <p>Delivering relevant technologies for our times</p>
               <div className="social-links">
               <a href=" https://www.linkedin.com/company/lansub-technologies">
               <i className="fa-brands fa-linkedin"></i>
               </a>
               </div>
            </div>
            </div>
            <div className="address-info col-lg-3 col-md-6">
                <div className="info">
                    <div>
                      <FaMapMarkerAlt size={22} className="contact-icon"/>
                      <p> No.22b1,Tamil Min Nagar,Tiruvannamalai Tiruvannamalai,<br/>Tamil Nadu, 606601 India </p>
                    </div>
                    <div>
                        <FaPhone size={22} className="contact-icon"/>
                        <p></p>
                    </div>
                    <div>
                        <FaEnvelope size={22} className="contact-icon"/>
                        <p></p>
                    </div>
                </div>
            </div>
            </div>
            </div>
        </section>
      </main>
    </div>
  );
};

export default CompanyInfo;
