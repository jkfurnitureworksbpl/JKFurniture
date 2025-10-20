import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchHoverTabs } from '../services/api';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [isProductsClicked, setIsProductsClicked] = useState(false);
  const [hoverTabs, setHoverTabs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleExportsClick = (e) => {
    e.preventDefault();
    setIsProductsClicked(!isProductsClicked);
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProductsClicked && !event.target.closest('.nav-dropdown') && !event.target.closest('.dropdown-menu')) {
        setIsProductsClicked(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isProductsClicked) {
        setIsProductsClicked(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isProductsClicked]);

  // Handle body scroll lock when popup is open/closed
  useEffect(() => {
    if (isProductsClicked) {
      // Store current scroll position
      const scrollY = window.scrollY;
      document.body.style.top = `-${scrollY}px`;
      document.body.classList.add('popup-open');
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.classList.remove('popup-open');
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    // Cleanup function to ensure body scroll is restored
    return () => {
      document.body.classList.remove('popup-open');
      document.body.style.top = '';
    };
  }, [isProductsClicked]);

  // Fetch hover tabs from API
  useEffect(() => {
    const loadHoverTabs = async () => {
      try {
        setIsLoading(true);
        console.log('🔄 Fetching hover tabs from API...');
        const tabs = await fetchHoverTabs();
        console.log('✅ Hover tabs loaded:', tabs);
        console.log('📊 Total tabs count:', tabs.length);
        console.log('📋 All tabs:', tabs.map(tab => ({ id: tab.id, name: tab.name, subcategories: tab.subcategories })));
        setHoverTabs(tabs);
      } catch (error) {
        console.error('❌ Failed to load hover tabs:', error);
        console.log('❌ No fallback data - showing error state');
        setHoverTabs([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadHoverTabs();
  }, []);

  return (
    <nav className="navbar_visible">
      <div className="container-navbar">
        <div className="nav-content">
            <div className="footer-logo">
                {/* <span className="logo-icon"></span> */}
                <img
                style={{width: '60px', height: '60px', borderRadius: '15px' }}
                  src="/images/logo/Copilot_20251001_160357.png"
                  alt="JKExportHub Logo"
                  loading="lazy"
                />
            </div>
          <div className="logo">
            <span className="logo-text">JKExportHub</span>
          </div>
          
          {/* Desktop Navigation - Right Side */}
          <div className="nav-links">
            <Link to="/home" className={`nav-link ${isActive('/home') ? 'active' : ''}`}>
              Home
            </Link>
            <Link to="/catalog" className={`nav-link ${isActive('/catalog') ? 'active' : ''}`}>
              Catalog
            </Link>
                <div className="nav-dropdown">
                  <button 
                    className={`nav-link ${isProductsClicked ? 'active' : ''}`}
                    onClick={handleExportsClick}
                  >
                    Products
                    <span className="dropdown-arrow">▼</span>
                  </button>
              
                      <div className={`dropdown-menu ${isProductsClicked ? 'visible' : ''}`}>
                        <div className="mega-menu-content">
                          {isLoading ? (
                            <div className="dropdown-item">
                              <div className="dropdown-content">
                                <h3 className="dropdown-name">Loading...</h3>
                              </div>
                            </div>
                          ) : hoverTabs.length === 0 ? (
                            <div className="dropdown-item">
                              <div className="dropdown-content">
                                <h3 className="dropdown-name">Error Loading Data</h3>
                                <div className="subcategories">
                                  <span className="subcategory-item">Unable to fetch data from Supabase</span>
                                  <span className="subcategory-item">Please check your connection</span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            hoverTabs.map((tab, index) => (
                              <div
                                key={tab.id || tab.key}
                                className="dropdown-item"
                                style={{ '--delay': `${index * 0.1}s` }}
                              >
                                <div className="dropdown-content">
                                  <h3 className="dropdown-name" title={tab.name}>
                                    {tab.name}
                                    <div className="tooltip-popup">
                                      <div className="tooltip-content">
                                        {tab.name}
                                      </div>
                                    </div>
                                  </h3>
                                  <div className="subcategories">
                                    {tab.subcategories && tab.subcategories.length > 0 ? (
                                      tab.subcategories.map((subcat, subIndex) => (
                                        <span 
                                          key={subIndex} 
                                          className="subcategory-item"
                                          style={{ '--sub-delay': `${subIndex * 0.05}s` }}
                                          title={subcat}
                                        >
                                          {subcat}
                                          <div className="tooltip-popup">
                                            <div className="tooltip-content">
                                              {subcat}
                                            </div>
                                          </div>
                                        </span>
                                      ))
                                    ) : (
                                      <span className="subcategory-item">No subcategories</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
            </div>
            <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>
              About
            </Link>
            <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>
              Contact Us
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
