const https = require('https');
const { URL } = require('url');

// @desc    Get all product images
// @route   GET /api/product-images
// @access  Public
const getProductImages = async (req, res) => {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      console.log('❌ Supabase credentials not configured');
      return res.status(500).json({
        success: false,
        error: 'Supabase credentials not configured. Please check your environment variables.'
      });
    }

    // Make direct HTTP request to Supabase
    console.log('🔍 Fetching product images from Supabase using direct HTTP request...');
    
    const data = await new Promise((resolve, reject) => {
      const url = new URL(`${supabaseUrl}/rest/v1/product_images?select=*&limit=6`);
      
      const options = {
        hostname: url.hostname,
        port: url.port || 443,
        path: url.pathname + url.search,
        method: 'GET',
        headers: {
          'apikey': supabaseKey,
          'Content-Type': 'application/json'
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            try {
              const jsonData = JSON.parse(data);
              resolve(jsonData);
            } catch (error) {
              reject(new Error(`Failed to parse JSON: ${error.message}`));
            }
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${data}`));
          }
        });
      });
      
      req.on('error', (error) => {
        reject(new Error(`Request failed: ${error.message}`));
      });
      
      req.end();
    });

    // console.log("✅ Supabase product images received:", data);
    console.log("📊 Total product images from Supabase:", data ? data.length : 0);
    
    res.json({
      success: true,
      data: data
    });
    
  } catch (error) {
    console.error('Error fetching product images:', error);
    
    return res.status(500).json({
      success: false,
      error: `Failed to fetch product images: ${error.message}`
    });
  }
};

// @desc    Get product images by category
// @route   GET /api/product-images/category/:category
// @access  Public
const getProductImagesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    if (!category) {
      return res.status(400).json({
        success: false,
        error: 'Category parameter is required'
      });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      console.log('❌ Supabase credentials not configured');
      return res.status(500).json({
        success: false,
        error: 'Supabase credentials not configured. Please check your environment variables.'
      });
    }

    // Make direct HTTP request to Supabase with category filter
    console.log(`🔍 Fetching product images for category: ${category} from Supabase...`);
    
    const data = await new Promise((resolve, reject) => {
      const url = new URL(`${supabaseUrl}/rest/v1/product_images?select=*&img_cat=eq.${encodeURIComponent(category)}&limit=6`);      
      const options = {
        hostname: url.hostname,
        port: url.port || 443,
        path: url.pathname + url.search,
        method: 'GET',
        headers: {
          'apikey': supabaseKey,
          'Content-Type': 'application/json'
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            try {
              const jsonData = JSON.parse(data);
              resolve(jsonData);
            } catch (error) {
              reject(new Error(`Failed to parse JSON: ${error.message}`));
            }
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${data}`));
          }
        });
      });
      
      req.on('error', (error) => {
        reject(new Error(`Request failed: ${error.message}`));
      });
      
      req.end();
    });

    console.log(`✅ Supabase product images for category '${category}' received:`, data);
    console.log(`📊 Total product images for category '${category}':`, data ? data.length : 0);
    
    res.json({
      success: true,
      data: data,
      category: category,
      count: data ? data.length : 0
    });
    
  } catch (error) {
    console.error(`Error fetching product images for category '${req.params.category}':`, error);
    
    return res.status(500).json({
      success: false,
      error: `Failed to fetch product images for category: ${error.message}`
    });
  }
};

module.exports = {
  getProductImages,
  getProductImagesByCategory
};
