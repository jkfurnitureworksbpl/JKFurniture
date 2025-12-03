const { sendContactEmail, sendConfirmationEmail } = require('../services/emailService');

// @desc    Send contact form email
// @route   POST /api/contact
// @access  Public
const sendContact = async (req, res) => {
  try {
    const { name, email, phone, subject, product, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, subject, and message are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    console.log('📧 Processing contact form submission...');
    console.log('   From:', email);
    console.log('   Name:', name);
    console.log('   Subject:', subject);

    const formData = {
      name,
      email,
      phone: phone || '',
      subject,
      product: product || '',
      message
    };
     

    // this can be used later if needed
    // Send email to seller (jkexporthub@gmail.com)
    // const sellerEmailResult = await sendContactEmail(formData);
    // console.log('✅ Email sent to seller');

    // Send confirmation email to client
    let confirmationResult = null;
    try {
      confirmationResult = await sendConfirmationEmail(formData);
      console.log('✅ Confirmation email sent to client');
    } catch (confirmationError) {
      // Log error but don't fail the request if confirmation email fails
      console.error('⚠️ Failed to send confirmation email, but seller email was sent:', confirmationError.message);
    }

    res.json({
      success: true,
      message: 'Contact form submitted successfully. We will get back to you soon!',
      // messageId: sellerEmailResult.messageId,
      confirmationSent: confirmationResult !== null
    });

  } catch (error) {
    console.error('Error sending contact email:', error);
    
    return res.status(500).json({
      success: false,
      error: `Failed to send contact email: ${error.message}`
    });
  }
};

module.exports = {
  sendContact
};


