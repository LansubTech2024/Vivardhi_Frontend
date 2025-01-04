import React, { useState, useEffect } from 'react';
import {  AiOutlineReload, AiOutlineWhatsApp } from 'react-icons/ai';
import AxiosService from '../../Components/AuthService/AuthService';
import { ToastContainer,toast } from 'react-toastify';
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/SideBar/Sidebar";
import "./qrCode.css"

const QRCodePage = () => {
  const [qrCode, setQrCode] = useState('');
  const [whatsappLink, setWhatsappLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setUserData(loggedInUser);
      setQrCode(loggedInUser.qr_code);
      setWhatsappLink(loggedInUser.whatsapp_group_link);
    }
  }, []);

  const handleRefreshQR = async () => {
    setLoading(true);
    try {
      const token = userData.token;
      const response = await AxiosService.post('refresh-qr/', {}, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (response.data.qr_code) {
        setQrCode(response.data.qr_code);
        setWhatsappLink(response.data.whatsappGroupLink);
        setLastUpdated(new Date());
        // Update localStorage
        const updatedUserData = { ...userData, qr_code: response.data.qr_code, whatsapp_group_link: response.data.whatsappGroupLink  };
        localStorage.setItem('loggedInUser', JSON.stringify(updatedUserData));
        setUserData(updatedUserData);
        
        toast.success('QR Code refreshed successfully!', {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Failed to refresh QR code:', error);
      toast.error('Failed to refresh QR code', {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppJoin = () => {
    if (whatsappLink) {
      window.open(whatsappLink, '_blank');
      toast.info('Opening WhatsApp chat. You will receive an automated welcome message shortly.');
    } else {
      toast.error('WhatsApp link not available');
    }
  };

  return (
    <>
    <Header/>
    <Sidebar/>
    <div className="qr-code-page">
      <div className="qr-code-container">
        <div className="qr-header">
          <h2>Your Access QR Code</h2>
          <p>Scan this QR code for quick access</p>
        </div>
        
        <div className="qr-display">
            {qrCode ? (
              <>
                <img src={qrCode} alt="Access QR Code" className="qr-image" />
                <button 
                  className="whatsapp-button"
                  onClick={handleWhatsAppJoin}
                >
                  <AiOutlineWhatsApp />
                  Join WhatsApp Group
                </button>
              </>
            ) : (
              <div className="no-qr">No QR Code available</div>
            )}
          </div>
        
        <div className="qr-actions">
          <button 
            className="refresh-button"
            onClick={handleRefreshQR}
            disabled={loading}
          >
            <AiOutlineReload className={loading ? 'spinning' : ''} />
            {loading ? 'Refreshing...' : 'Refresh QR Code'}
          </button>
          
          <div className="qr-info">
            <p>Last updated: {new Date().toLocaleString()}</p>
            <p>Company: {userData?.companyname}</p>
            <p>User: {userData?.username}</p>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
    </>
  );
};

export default QRCodePage;