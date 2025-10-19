import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { fetchHoverTabs } from '../services/api';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    product: '',
    message: ''
  });
  const [hoverTabs, setHoverTabs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch hover tabs from API
  useEffect(() => {
    const loadHoverTabs = async () => {
      try {
        setIsLoading(true);
        console.log('🔄 Fetching hover tabs from API...');
        const tabs = await fetchHoverTabs();
        console.log('✅ Hover tabs loaded:', tabs);
        setHoverTabs(tabs);
      } catch (error) {
        console.error('❌ Failed to load hover tabs:', error);
        setHoverTabs([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadHoverTabs();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      product: '',
      message: ''
    });
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '+91 9009065444'; // Replace with your actual WhatsApp number
    const message = 'Hello! I would like to get in touch about your furniture services.';
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailClick = () => {
    const email = 'hello@JKExportHub.com';
    const subject = 'Inquiry from JKExportHub Website';
    const body = 'Hello, I would like to get in touch about your furniture services.';
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const handlePhoneClick = () => {
    const phoneNumber = '+91 9009065444'; // Remove spaces and special characters
    const telUrl = `tel:${phoneNumber}`;
    window.location.href = telUrl;
  };

  const handleMapClick = () => {
    const address = '15/B Badwali Masjid, Jehangirabad, Bhopal, Madhya Pradesh 462008, India';
    const encodedAddress = encodeURIComponent(address);
    // Using Google Maps search with more specific parameters for better pinning
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}&zoom=15`;
    window.open(mapUrl, '_blank');
  };

  const contactInfo = [
    {
      icon: '📍',
      title: 'Visit Our Showroom',
      details: ['15/B Jehangirabad Bhopal, ', 'MP (462008)', 'Open Mon-Sat 10AM-8PM'],
      isClickable: true,
      onClick: handleMapClick
    },
    {
      icon: '📞',
      title: 'Call Us',
      details: ['+91 9009065444', 'Mon-Fri 9AM-6PM', 'Sat 10AM-4PM'],
      isClickable: true,
      onClick: handlePhoneClick
    },
    {
      icon: '✉️',
      title: 'Email Us',
      details: ['hello@JKExportHub.com', 'jkfurnitureworksbpl@gmail.com', 'We respond within 24 hours'],
      isClickable: true,
      onClick: handleEmailClick
    },
    {
      icon: '💬',
      title: 'Live Chat',
      details: ['Available Mon-Fri 9AM-6PM', 'Click to chat on WhatsApp', 'Get instant help'],
      isClickable: true,
      onClick: handleWhatsAppClick
    }
  ];


  return (
    <div className="contact-page">

        <Navbar />
      {/* Single Contact Section with Background Image */}
      <section className="contact-main-section">
        <div style={{ marginBottom: '20px' }} className="container">
          {/* Hero Content */}
          <div className="contact-hero-content">
            <h1 className="hero-title">Get in Touch</h1>
            <p className="hero-subtitle">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          {/* Contact Info Cards */}
          <div className="contact-info-grid">
            {contactInfo.map((info, index) => (
              <div 
                key={info.title} 
                className={`contact-info-card ${info.isClickable ? 'clickable' : ''}`}
                style={{ '--delay': `${index * 0.1}s` }}
                onClick={info.isClickable ? info.onClick : undefined}
              >
                <div className="info-icon">{info.icon}</div>
                <h3 className="info-title">{info.title}</h3>
                <div className="info-details">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="info-detail">{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form & Map */}
          <div className="form-map-container">
            <div className="contact-form-container">
              <h2 className="form-title">Send us a Message</h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="product">Product Question</option>
                      <option value="delivery">Delivery Information</option>
                      <option value="support">Customer Support</option>
                      <option value="custom">Custom Order</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="product">Product *</label>
                  <select
                    id="product"
                    name="product"
                    value={formData.product}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a product</option>
                    {isLoading ? (
                      <option value="" disabled>Loading products...</option>
                    ) : hoverTabs.length === 0 ? (
                      <option value="" disabled>No products available</option>
                    ) : (
                      hoverTabs.map((tab) => (
                        <option key={tab.id || tab.key} value={tab.name}>
                          {tab.name}
                        </option>
                      ))
                    )}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us how we can help you..."
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn">
                  Send Message
                </button>
              </form>
            </div>
            <div className="map-container">
              <h3 className="map-title">Find Our Showroom</h3>
              <div className="map-placeholder" onClick={handleMapClick} style={{ cursor: 'pointer' }}>
                <div className="map-content">
                  <div className="map-icon">🗺️</div>
                  <p className="map-text">Click to open in Google Maps</p>
                  <p className="map-address">15/B Jehangirabad, Bhopal, Madhya Pradesh 462008, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
