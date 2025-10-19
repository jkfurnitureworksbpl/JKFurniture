import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './HomePage.css';

const HomePage = () => {



  return (
    <div className="home-page">
      {/* Single Home Section with Background Image */}
        <Navbar />
      <section className="home-main-section">
        <div className="container">
          {/* Hero Content */}
          <div className="home-hero-content">
            <h1 className="hero-title">
              Transform Your Space with Beautiful Furniture
            </h1>
            <p className="hero-subtitle">
              Discover our curated collection of modern furniture that combines style, 
              comfort, and functionality. Create the perfect home that reflects your personality.
            </p>
            <div className="hero-cta">
              <Link to="/about" className="btn-primary">
                Learn More →
              </Link>
              <Link to="/contact" className="btn-secondary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;