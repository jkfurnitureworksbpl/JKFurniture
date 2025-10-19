const express = require('express');
const { getHoverTabs } = require('../controllers/hoverTabsController');

const router = express.Router();

// GET /api/hover-tabs - Get all hover tabs
router.get('/', getHoverTabs);

module.exports = router;
