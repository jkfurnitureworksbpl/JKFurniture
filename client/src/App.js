import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnimationPage from './components/AnimationPage';
import HomePage from './components/HomePage';
import CatalogPage from './components/CatalogPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="app-loader">
        <div className="loader-content">
          <div className="loader-logo">
            <div className="furniture-icon">
              <div className="chair-leg"></div>
              <div className="chair-seat"></div>
              <div className="chair-back"></div>
            </div>
            <h1>JKExportHub</h1>
          </div>
          <div className="loader-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AnimationPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

