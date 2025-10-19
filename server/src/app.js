const express = require('express');
const cors = require('cors');
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

// Import routes
const hoverTabsRoutes = require('./routes/hoverTabsRoutes');
const productImagesRoutes = require('./routes/productImagesRoutes');

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Furniture API Server',
    version: '1.0.0',
    endpoints: {
      hoverTabs: '/api/hover-tabs',
      productImages: '/api/product-images'
    }
  });
});

// API routes
app.use('/api/hover-tabs', hoverTabsRoutes);
app.use('/api/product-images', productImagesRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📋 Hover Tabs API: http://localhost:${PORT}/api/hover-tabs`);
  console.log(`🖼️ Product Images API: http://localhost:${PORT}/api/product-images`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
});

module.exports = app;