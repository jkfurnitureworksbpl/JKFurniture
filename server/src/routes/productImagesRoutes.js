const express = require('express');
const { getProductImages, getProductImagesByCategory } = require('../controllers/productImagesController');

const router = express.Router();

// GET /api/product-images - Get all product images
router.get('/', getProductImages);

// GET /api/product-images/category/:category - Get product images by category
router.get('/category/:category', getProductImagesByCategory);

module.exports = router;
