import React, { useEffect, useState } from 'react';
import { getMenuData } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './Menu.css';

function Menu() {
  const [menuData, setMenuData] = useState(null);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Seasonal Product');
  const navigate = useNavigate(); 

  const fetchMenuData = async () => {
    const token_type = localStorage.getItem('token_type');
    const access_token = localStorage.getItem('access_token');
    if (!token_type || !access_token) {
      setError('Token tidak ditemukan. Silahkan login kembali.');
      return;
    }
    try {
      const data = await getMenuData(token_type, access_token);
      if (data.status === 'success') {
        setMenuData(data.result);
      } else {
        setError(data.message || 'Gagal mengambil data menu');
      }
    } catch (err) {
      setError('Terjadi kesalahan, coba lagi.');
    }
  };

  useEffect(() => {
    fetchMenuData();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="menu-container">
      <div className="menu-tabs">
      <h2 className="menu-title">MENU</h2>
        <button className={`tab-button ${selectedCategory === 'Seasonal Product' ? 'active' : ''}`} onClick={() => handleCategoryClick('Seasonal Product')}>Seasonal Product</button>
        <button className={`tab-button ${selectedCategory === 'Best Seller' ? 'active' : ''}`} onClick={() => handleCategoryClick('Best Seller')}>Best Seller</button>
        <button className={`tab-button ${selectedCategory === 'Coffee' ? 'active' : ''}`} onClick={() => handleCategoryClick('Coffee')}>Coffee</button>
        <button className={`tab-button ${selectedCategory === 'Cold Brew' ? 'active' : ''}`} onClick={() => handleCategoryClick('Cold Brew')}>Cold Brew</button>
        <button className={`tab-button ${selectedCategory === 'Chocolate' ? 'active' : ''}`} onClick={() => handleCategoryClick('Chocolate')}>Chocolate</button>
      </div>
      <div className="menu-content">
        {error && <p className="error-message">{error}</p>}
        {!menuData ? (
          <p className="loading">Loading...</p>
        ) : (
          menuData.categories
            .sort((a, b) => (a.category_name === selectedCategory ? -1 : b.category_name === selectedCategory ? 1 : 0))
            .map((category, index) => (
              <div key={index} className="category-section">
                <h3 className="category-title">{category.category_name}</h3>
                <div className="menu-items">
                  {category.menu.map((item, idx) => (
                    <div key={idx} className="menu-item">
                      <img src={item.photo} alt={item.name} className="menu-item-photo" />
                      <div className="menu-item-info">
                        <h4 className="menu-item-name">{item.name}</h4>
                        <p className="menu-item-description">{item.description}</p>
                        <p className="menu-item-price">Rp {item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
        )}
      </div>
      <div className="bottom-navigation">
        <button 
              className="home-button" 
              onClick={() => navigate('/home')}
              aria-label="Home"
            ></button>
        <button className="menu-button"></button>
      </div>
    </div>
  );
}

export default Menu;
