const express = require('express');
const router = express.Router();
const { sendContact } = require('../controllers/contactController');

// @route   POST /api/contact
// @desc    Send contact form email
// @access  Public
router.post('/', sendContact);

module.exports = router;


