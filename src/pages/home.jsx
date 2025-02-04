// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHomeData } from '../services/api';
import TechnopartnerLogo from '../assets/logo technopartner.png';
import './Home.css';

function Home() {
  const [homeData, setHomeData] = useState(null);
  const [error, setError] = useState('');
  const [bannerIndex, setBannerIndex] = useState(0);
  const [showQRPopup, setShowQRPopup] = useState(false);
  const navigate = useNavigate(); 

  const fetchHomeData = async () => {
    const token_type = localStorage.getItem('token_type');
    const access_token = localStorage.getItem('access_token');
    if (!token_type || !access_token) {
      setError('Token tidak ditemukan, silakan login kembali.');
      return;
    }
    try {
      const data = await getHomeData(token_type, access_token);
      if (data.status === 'success') {
        setHomeData(data.result);
      } else {
        setError(data.message || 'Gagal mengambil data.');
      }
    } catch (err) {
      setError('Terjadi kesalahan, coba lagi.');
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  useEffect(() => {
    if (!homeData || !homeData.banner || homeData.banner.length === 0) return;
    const interval = setInterval(() => {
      setBannerIndex(prevIndex => (prevIndex + 1) % homeData.banner.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [homeData]);

  const handleRefresh = () => {
    fetchHomeData();
  };

  const handleQRCodeClick = () => {
    setShowQRPopup(true);
  };

  const closePopup = () => {
    setShowQRPopup(false);
  };

  return (
    <div className="home-container">
      <div className="logo-container">
        <a href={TechnopartnerLogo} target="_blank" rel="noopener noreferrer">
          <img src={TechnopartnerLogo} className="logo" alt="logo technopartner" />
        </a>
      </div>
      {error && <p className="error">{error}</p>}
      {!homeData ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="user-info">
            <h3>{homeData.greeting},</h3>
            <h3>{homeData.name}</h3>
            <div className="qr-code" onClick={handleQRCodeClick}>
              <img
                src={homeData.qrcode}
                alt="QR Code"
                className="qr-code-image"
              />
            </div>
            <div className='user-dana'>
            <p>Saldo <span className="saldo">RP {homeData.saldo}</span></p>
            <p>Point <span className="point">{homeData.point}</span></p>
            </div>
            </div>

          <div className="banner-carousel">
            {homeData.banner && homeData.banner.length > 0 && (
              <img
                src={homeData.banner[bannerIndex]}
                alt="Banner"
                className="banner-image"
              />
            )}
          </div>

          {showQRPopup && (
            <div className="popup" onClick={closePopup}>
              <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <p>Show the QR Code below to the cashier</p>
                <img src={homeData.qrcode} alt="QR Code" className="qr-code-image" />
                <button onClick={closePopup}>Close</button>
              </div>
            </div>
          )}

          <div className="bottom-navigation">
            <button className="home-button" onClick={handleRefresh} aria-label="Home"></button>
            <button 
              className="menu-button" 
              onClick={() => navigate('/menu')}
              aria-label="Menu"
            ></button>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
