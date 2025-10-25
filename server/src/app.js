const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Node.js 18+ has built-in fetch, no polyfill needed

const { connectSupabase } = require('./services/supabaseService');

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to Supabase
connectSupabase();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from React build
app.use(express.static(path.join(__dirname, '..', 'build')));

// Import routes
const hoverTabsRoutes = require('./routes/hoverTabsRoutes');
const productImagesRoutes = require('./routes/productImagesRoutes');

// API routes (must be before catch-all route)
app.use('/api/hover-tabs', hoverTabsRoutes);
app.use('/api/product-images', productImagesRoutes);

// API status endpoint
app.get('/api', (req, res) => {
  res.json({ 
    message: 'Furniture API Server',
    version: '1.0.0',
    endpoints: {
      hoverTabs: '/api/hover-tabs',
      productImages: '/api/product-images'
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Catch-all handler: send back React's index.html file for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📋 Hover Tabs API: http://localhost:${PORT}/api/hover-tabs`);
  console.log(`🖼️ Product Images API: http://localhost:${PORT}/api/product-images`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
});

module.exports = app;