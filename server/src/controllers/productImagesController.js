const { query } = require('../services/databaseService');

// @desc    Get all product images
// @route   GET /api/product-images
// @access  Public
const getProductImages = async (req, res) => {
  try {
    console.log('🔍 Fetching product images from PostgreSQL database...');
    
    // Query product images from export_data.product_images with limit of 6
    const result = await query('SELECT * FROM export_data.product_images ORDER BY img_id ASC LIMIT 8');

    const rows = Array.isArray(result?.rows) ? result.rows : [];
    console.log('📊 Result from PostgreSQL:', rows);

    const productImages = rows.map((row) => {
      const { doc_src, img_doc_src, ...rest } = row;
      return {
        ...rest,
        img_doc_src: img_doc_src || doc_src || null,
      };
    });

    console.log('📊 Total product images from PostgreSQL:', productImages.length);

    res.json({
      success: true,
      data: productImages,
    });
    
  } catch (error) {
    console.error('Error fetching product images:', error);
    if (error?.stack) {
      console.error(error.stack);
    }
    
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

    console.log(`🔍 Fetching product images for category: ${category} from PostgreSQL...`);
    
    // Query product images from export_data.product_images filtered by category
    const result = await query(
      'SELECT * FROM export_data.product_images WHERE img_cat = $1 ORDER BY img_id ASC LIMIT 6',
      [category]
    );
    
    const rows = Array.isArray(result?.rows) ? result.rows : [];

    const productImages = rows.map((row) => {
      const { doc_src, img_doc_src, ...rest } = row;
      return {
        ...rest,
        img_doc_src: img_doc_src || doc_src || null,
      };
    });

    console.log(`✅ PostgreSQL product images for category '${category}' received:`, productImages);
    console.log(`📊 Total product images for category '${category}':`, productImages.length);

    res.json({
      success: true,
      data: productImages,
      category,
      count: productImages.length,
    });
    
  } catch (error) {
    console.error(`Error fetching product images for category '${req.params.category}':`, error);
    if (error?.stack) {
      console.error(error.stack);
    }
    
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
