import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AnimationPage.css';

const AnimationPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            navigate('/home');
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="animation-page">
      <div className="animation-container">
        <div className={`logo-section ${isVisible ? 'visible' : ''}`}>
          <div className="logo">
            <div className="logo-icon">
              <div className="furniture-icon">
                <div className="chair-leg"></div>
                <div className="chair-seat"></div>
                <div className="chair-back"></div>
              </div>
            </div>
            <h1 className="logo-text">JKExportHub</h1>
          </div>
        </div>

        <div className={`welcome-section ${isVisible ? 'visible' : ''}`}>
          <h2 className="welcome-title">Welcome to Modern Living</h2>
          <p className="welcome-subtitle">Discover beautiful furniture for your home</p>
        </div>

        <div className={`loading-section ${isVisible ? 'visible' : ''}`}>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="loading-text">Loading amazing furniture...</p>
        </div>

        <div className={`floating-elements ${isVisible ? 'visible' : ''}`}>
          <div className="floating-item item-1">🪑</div>
          <div className="floating-item item-2">🛋️</div>
          <div className="floating-item item-3">🛏️</div>
          <div className="floating-item item-4">💺</div>
          <div className="floating-item item-5">🪞</div>
        </div>
      </div>
    </div>
  );
};

export default AnimationPage;

