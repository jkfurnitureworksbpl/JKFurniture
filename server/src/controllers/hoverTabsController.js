const { query } = require('../services/databaseService');

// @desc    Get all hover tabs
// @route   GET /api/hover-tabs
// @access  Public
const getHoverTabs = async (req, res) => {
  try {
    console.log('🔍 Fetching from PostgreSQL database...');
    
    // Query all products from the export_data.products table
    const result = await query('SELECT * FROM export_data.products');
    
    const data = result.rows;
    console.log("✅ PostgreSQL data received:", data);
    console.log("📊 Total records from PostgreSQL:", data ? data.length : 0);
    
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
