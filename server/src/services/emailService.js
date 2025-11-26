const nodemailer = require('nodemailer');

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailUser || !emailPass) {
    throw new Error('EMAIL_USER and EMAIL_PASS must be set in .env file');
  }

  // For Gmail, you MUST use an App Password, not your regular password
  // Steps to get App Password:
  // 1. Go to Google Account → Security
  // 2. Enable 2-Step Verification (if not already enabled)
  // 3. Go to "App passwords" → Generate new app password for "Mail"
  // 4. Use that 16-character password (no spaces) in EMAIL_PASS
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass
    }
  });

  return transporter;
};

/**
 * Send email from contact form
 * @param {Object} formData - Contact form data
 * @returns {Promise<Object>} - Result of email sending
 */
const sendContactEmail = async (formData) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: 'jkexporthub@gmail.com, ceojkf@gmail.com',
      subject: `Contact Form Submission: ${formData.subject || 'General Inquiry'}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${formData.subject || 'Not provided'}</p>
        <p><strong>Product:</strong> ${formData.product || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${formData.message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>This email was sent from the JKExportHub contact form.</small></p>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${formData.name}
        Email: ${formData.email}
        Phone: ${formData.phone || 'Not provided'}
        Subject: ${formData.subject || 'Not provided'}
        Product: ${formData.product || 'Not provided'}
        
        Message:
        ${formData.message}
        
        ---
        This email was sent from the JKExportHub contact form.
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Contact email sent to jkexporthub@gmail.com and ceojkf@gmail.com:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending contact email:', error.message);
    
    // Provide helpful error messages
    if (error.message.includes('Invalid login') || error.message.includes('BadCredentials')) {
      console.error('⚠️  Gmail Authentication Error:');
      console.error('   1. Make sure you are using a Gmail App Password, NOT your regular password');
      console.error('   2. Enable 2-Step Verification in your Google Account');
      console.error('   3. Generate an App Password: Google Account → Security → App passwords');
      console.error('   4. Use the 16-character App Password (remove spaces) in EMAIL_PASS');
      throw new Error('Gmail authentication failed. Please use an App Password instead of your regular password. See server logs for details.');
    }
    
    throw error;
  }
};

/**
 * Send confirmation email to client
 * @param {Object} formData - Contact form data
 * @returns {Promise<Object>} - Result of email sending
 */
const sendConfirmationEmail = async (formData) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: `${formData.email}, admin@jkexporthub.com`,
      subject: 'Thank you for contacting JKExportHub - We received your message',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">JKExportHub</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">Thank you for contacting us, ${formData.name}!</h2>
            
            <p style="color: #555; line-height: 1.6;">
              We have successfully received your message and our team will get back to you soon.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
              <h3 style="color: #333; margin-top: 0;">Your Inquiry Details:</h3>
              <p style="color: #666; margin: 5px 0;"><strong>Subject:</strong> ${formData.subject || 'General Inquiry'}</p>
              ${formData.product ? `<p style="color: #666; margin: 5px 0;"><strong>Product:</strong> ${formData.product}</p>` : ''}
              <p style="color: #666; margin: 5px 0;"><strong>Message:</strong></p>
              <p style="color: #666; background: #f1f5f9; padding: 15px; border-radius: 5px; margin-top: 10px;">
                ${formData.message.replace(/\n/g, '<br>')}
              </p>
            </div>
            
            <p style="color: #555; line-height: 1.6;">
              We typically respond within 24-48 hours. If your inquiry is urgent, please feel free to call us at <strong>+91 9009065444</strong>.
            </p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <p style="color: #888; font-size: 14px; margin: 5px 0;">
                <strong>Best regards,</strong><br>
                The JKExportHub Team
              </p>
              <p style="color: #888; font-size: 12px; margin-top: 20px;">
                📍 15/B Jehangirabad, Bhopal, Madhya Pradesh 462008, India<br>
                📞 +91 9009065444<br>
                ✉️ contact@jkexporthub.com
              </p>
            </div>
          </div>
        </div>
      `,
      text: `
        Thank you for contacting us, ${formData.name}!
        
        We have successfully received your message and our team will get back to you soon.
        
        Your Inquiry Details:
        Subject: ${formData.subject || 'General Inquiry'}
        ${formData.product ? `Product: ${formData.product}\n` : ''}
        Message:
        ${formData.message}
        
        We typically respond within 24-48 hours. If your inquiry is urgent, please feel free to call us at +91 9009065444.
        
        Best regards,
        The JKExportHub Team
        
        15/B Jehangirabad, Bhopal, Madhya Pradesh 462008, India
        Phone: +91 9009065444
        Email: hello@JKExportHub.com
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Confirmation email sent to client:', formData.email, info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending confirmation email:', error.message);
    
    // Provide helpful error messages
    if (error.message.includes('Invalid login') || error.message.includes('BadCredentials')) {
      console.error('⚠️  Gmail Authentication Error:');
      console.error('   1. Make sure you are using a Gmail App Password, NOT your regular password');
      console.error('   2. Enable 2-Step Verification in your Google Account');
      console.error('   3. Generate an App Password: Google Account → Security → App passwords');
      console.error('   4. Use the 16-character App Password (remove spaces) in EMAIL_PASS');
      throw new Error('Gmail authentication failed. Please use an App Password instead of your regular password. See server logs for details.');
    }
    
    throw error;
  }
};

module.exports = {
  sendContactEmail,
  sendConfirmationEmail
};


