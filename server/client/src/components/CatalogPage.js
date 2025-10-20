import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { fetchHoverTabs, fetchProductImages, fetchProductImagesBaseOnCategory } from '../services/api';
import './CatalogPage.css';

const CatalogPage = () => {
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [hoverTabs, setHoverTabs] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoading, setImagesLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imagesError, setImagesError] = useState(null);
  
  // Quote modal state
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quoteFormData, setQuoteFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });



  useEffect(() => {
    const loadHoverTabs = async () => {
      try {
        setIsLoading(true);
        console.log('🔄 Fetching hover tabs from API...');
        const tabs = await fetchHoverTabs();
        console.log('✅ Hover tabs loaded:', tabs);
        console.log('📊 Total tabs count:', tabs.length);
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

  // Fetch product images from API
  useEffect(() => {
    const loadProductImages = async () => {
      try {
        setImagesLoading(true);
        console.log('🔄 Fetching product images from API...');
        const images = await fetchProductImages();
        console.log('✅ Product images loaded:', images);
        console.log('📊 Total product images count:', images.length);
        setProductImages(images);
      } catch (error) {
        console.error('❌ Failed to load product images:', error);
        setImagesError(error.message);
        setProductImages([]);
      } finally {
        setImagesLoading(false);
      }
    };

    loadProductImages();
  }, []);

  // Handle Get Quote button click
  const handleGetQuote = (item) => {
    console.log('Get Quote clicked for:', item);
    setSelectedProduct(item);
    setShowQuoteModal(true);
  };

  // Handle quote form input changes
  const handleQuoteInputChange = (e) => {
    setQuoteFormData({
      ...quoteFormData,
      [e.target.name]: e.target.value
    });
  };

  // Handle quote form submission
  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    console.log('Quote form submitted:', quoteFormData, selectedProduct);
    alert(`Thank you for your quote request for "${selectedProduct?.img_name || 'Product'}"! We'll get back to you soon.`);
    
    // Reset form and close modal
    setQuoteFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    setShowQuoteModal(false);
    setSelectedProduct(null);
  };

  // Close modal
  const closeQuoteModal = () => {
    setShowQuoteModal(false);
    setSelectedProduct(null);
    setQuoteFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  // Category click handler - customize this function as needed
  const handleCategoryClick = async (category) => {
    console.log('Category clicked:', category);
    
    
    setActiveCategoryId(category.id);

    try {
      setImagesLoading(true);
      console.log('🔄 Fetching product images from API...');
      const images = await fetchProductImagesBaseOnCategory(category.name);
      // console.log('✅ Product images loaded:', images);
      // console.log('📊 Total product images count:', images.length);
      setProductImages(images);
    } catch (error) {
      console.error('❌ Failed to load product images:', error);
      setImagesError(error.message);
      setProductImages([]);
    } finally {
      setImagesLoading(false);
    }
    
    
  };

  // Checkbox selection removed; only displaying list of categories

  // Removed search/clear actions as per requirements
  return (
    <div className="catalog-page">
      {/* Single Catalog Section with Background Image */}
        <Navbar />
        <section className="catalog-main-section">
          <div className="catalog-content">
            <div className="catalog-container">
              {/* Left Panel */}
              <div className="catalog-left-panel">
                <div className="right-panel-content">
                  <h3>Categories</h3>
                  
                  {isLoading ? (
                    <div className="loading-state">
                      <div className="spinner"></div>
                      <p>Loading categories...</p>
                    </div>
                  ) : error ? (
                    <div className="error-state">
                      <p>Error loading categories: {error}</p>
                    </div>
                  ) : hoverTabs.length === 0 ? (
                    <div className="empty-state">
                      <p>No categories available</p>
                    </div>
                  ) : (
                    <div className="categories-list">
                      {hoverTabs.map(category => (
                        <div
                          key={category.id}
                          className={`category-item ${activeCategoryId === category.id ? 'active' : ''}`}
                        >
                          <div
                            className="category-label"
                            onClick={() => handleCategoryClick(category)}
                          >
                            <span className="category-name">{category.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action buttons removed */}
                </div>
              </div>

              {/* Main Content Area */}
              <div className="catalog-main-content">
                {imagesLoading ? (
                  <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Loading product images...</p>
                  </div>
                ) : imagesError ? (
                  <div className="error-state">
                    <p>Error loading product images: {imagesError}</p>
                  </div>
                ) : productImages.length === 0 ? (
                  <div className="empty-state">
                    <p>No product images available</p>
                  </div>
                ) : (
                   <div className="catalog-cards-grid">
                     {productImages.map(item => (
                       <div key={item.img_id} className="catalog-card">
                         <div className="catalog-card-image-wrap">
                           <img 
                             src={`data:image/jpeg;base64,${item.img_doc_src}`} 
                             alt={item.img_name || 'product'} 
                             className="catalog-card-image" 
                           />
                         </div>
                         <div className="catalog-card-content">
                           <p className="catalog-card-desc">{item.img_desc || item.img_name}</p>
                           <button 
                             className="get-quote-btn"
                             onClick={() => handleGetQuote(item)}
                           >
                             Get a Quote
                           </button>
                         </div>
                       </div>
                     ))}
                   </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Quote Modal */}
        {showQuoteModal && (
          <div className="quote-modal-overlay" onClick={closeQuoteModal}>
            <div className="quote-modal" onClick={(e) => e.stopPropagation()}>
              <div className="quote-modal-header">
                <h2>Get a Quote</h2>
                <button className="close-modal-btn" onClick={closeQuoteModal}>
                  ×
                </button>
              </div>
              
              {selectedProduct && (
                <div className="selected-product-info">
                  <h3>Product: {selectedProduct.img_name || 'Product'}</h3>
                  <p>{selectedProduct.img_desc || 'No description available'}</p>
                </div>
              )}

              <form className="quote-form" onSubmit={handleQuoteSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="quote-name">Full Name *</label>
                    <input
                      type="text"
                      id="quote-name"
                      name="name"
                      value={quoteFormData.name}
                      onChange={handleQuoteInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="quote-email">Email Address *</label>
                    <input
                      type="email"
                      id="quote-email"
                      name="email"
                      value={quoteFormData.email}
                      onChange={handleQuoteInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="quote-phone">Phone Number</label>
                    <input
                      type="tel"
                      id="quote-phone"
                      name="phone"
                      value={quoteFormData.phone}
                      onChange={handleQuoteInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="quote-subject">Subject *</label>
                    <select
                      id="quote-subject"
                      name="subject"
                      value={quoteFormData.subject}
                      onChange={handleQuoteInputChange}
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="quote">Request Quote</option>
                      <option value="custom">Custom Order</option>
                      <option value="bulk">Bulk Order</option>
                      <option value="delivery">Delivery Inquiry</option>
                      <option value="general">General Question</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="quote-message">Message *</label>
                  <textarea
                    id="quote-message"
                    name="message"
                    rows="4"
                    value={quoteFormData.message}
                    onChange={handleQuoteInputChange}
                    placeholder="Please provide details about your requirements..."
                    required
                  ></textarea>
                </div>
                
                <div className="quote-form-actions">
                  <button type="button" className="cancel-btn" onClick={closeQuoteModal}>
                    Cancel
                  </button>
                  <button type="submit" className="submit-quote-btn">
                    Send Quote Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default CatalogPage;
