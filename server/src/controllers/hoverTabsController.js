const https = require('https');
const { URL } = require('url');

// @desc    Get all hover tabs
// @route   GET /api/hover-tabs
// @access  Public
const getHoverTabs = async (req, res) => {
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

    // Make direct HTTP request to Supabase (same as Postman)
    console.log('🔍 Fetching from Supabase using direct HTTP request...');
    
    const data = await new Promise((resolve, reject) => {
      const url = new URL(`${supabaseUrl}/rest/v1/products?select=*`);
      
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
    console.log("✅ Supabase data received:", data);
    console.log("📊 Total records from Supabase:", data ? data.length : 0);
    
    // Add subcategories to each tab if they don't exist
    const tabsWithSubcategories = data.map(tab => ({
      ...tab,
      subcategories: tab.subcategories || ['Item 1', 'Item 2', 'Item 3'] // Default subcategories
    }));
    
    res.json({
      success: true,
      data: tabsWithSubcategories
    });
    
  } catch (error) {
    console.error('Error fetching hover tabs:', error);
    
    return res.status(500).json({
      success: false,
      error: `Failed to fetch hover tabs: ${error.message}`
    });
  }
};

module.exports = {
  getHoverTabs
};
