const nodemailer = require('nodemailer');

// Cache transporter to reuse connection
let cachedTransporter = null;

const createTransporter = () => {
  // Return cached transporter if available
  if (cachedTransporter) {
    return cachedTransporter;
  }

  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  const emailHost = process.env.EMAIL_HOST || 'mail.jkexporthub.com';
  const emailPort = parseInt(process.env.EMAIL_PORT) || 587;
  
  // Port 465 = SSL (secure: true), Port 587 = TLS (secure: false)
  let emailSecure = false;
  if (process.env.EMAIL_SECURE === 'true' || process.env.EMAIL_SECURE === '1' || process.env.EMAIL_SECURE === 'SSL') {
    emailSecure = true;
  } else if (emailPort === 465) {
    emailSecure = true;
  }

  if (!emailUser || !emailPass) {
    throw new Error('EMAIL_USER and EMAIL_PASS must be set in .env file');
  }

  const transporterConfig = {
    host: emailHost,
    port: emailPort,
    secure: emailSecure,
    auth: {
      user: emailUser,
      pass: emailPass
    },
    tls: {
      rejectUnauthorized: false
    },
    // Reduced timeouts for faster failure
    connectionTimeout: 5000,  // 5 seconds instead of 20
    greetingTimeout: 5000,    // 5 seconds instead of 20
    socketTimeout: 10000,     // 10 seconds instead of 20
    requireTLS: !emailSecure,
    // Disable debug logging for better performance
    debug: false,
    logger: false
  };

  if (emailSecure && emailHost.includes('hostinger')) {
    delete transporterConfig.requireTLS;
  }

  cachedTransporter = nodemailer.createTransport(transporterConfig);
  return cachedTransporter;
};

const handleEmailError = (error) => {
  console.error('❌ Email error:', error.message);
  console.error('   Error code:', error.code);
  console.error('   Full error:', error);

  if (error.message.includes('Greeting never received') || error.message.includes('ECONNREFUSED')) {
    throw new Error('Cannot connect to SMTP server. Check EMAIL_HOST, EMAIL_PORT, and EMAIL_SECURE settings. For port 465 use EMAIL_SECURE=true, for port 587 use EMAIL_SECURE=false.');
  }

  if (error.message.includes('Invalid login') || error.message.includes('BadCredentials') || error.message.includes('Authentication failed')) {
    throw new Error('SMTP authentication failed. Check your email credentials in .env file.');
  }

  if (error.message.includes('ETIMEDOUT') || error.message.includes('timeout') || error.message.includes('Connection timeout')) {
    console.error('⚠️  Connection timeout troubleshooting:');
    console.error('   1. Try port 587 with EMAIL_SECURE=false (TLS)');
    console.error('   2. Check if your firewall is blocking port', process.env.EMAIL_PORT);
    console.error('   3. Verify EMAIL_HOST is correct:', process.env.EMAIL_HOST);
    console.error('   4. For Hostinger, try: EMAIL_HOST=smtp.hostinger.com, EMAIL_PORT=587, EMAIL_SECURE=false');
    throw new Error(`SMTP connection timeout to ${process.env.EMAIL_HOST}:${process.env.EMAIL_PORT}. Try port 587 with EMAIL_SECURE=false or check firewall settings.`);
  }

  throw error;
};

const sendContactEmail = async (formData) => {
  const startTime = Date.now();
  try {
    const transporter = createTransporter();
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'jkexporthub@gmail.com',
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
        Message: ${formData.message}
        ---
        This email was sent from the JKExportHub contact form.
      `
    };

    const info = await transporter.sendMail(mailOptions);
    const duration = Date.now() - startTime;
    console.log(`✅ Contact email sent in ${duration}ms:`, info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`❌ Email failed after ${duration}ms`);
    handleEmailError(error);
  }
};

const sendConfirmationEmail = async (formData) => {
  const startTime = Date.now();
  try {
    const transporter = createTransporter();
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: formData.email,
      bcc: ["jkfurnitureworksbpl@gmail.com", "contact@jkexporthub.com"],
      subject: 'Thank you for contacting JKExportHub - We received your message',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">JKExportHub</h1>
          </div>
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">Thank you for contacting us, ${formData.name}!</h2>
            <p style="color: #555; line-height: 1.6;">We have successfully received your message and our team will get back to you soon.</p>
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
              <h3 style="color: #333; margin-top: 0;">Your Inquiry Details:</h3>
              <p style="color: #666; margin: 5px 0;"><strong>Subject:</strong> ${formData.subject || 'General Inquiry'}</p>
              ${formData.product ? `<p style="color: #666; margin: 5px 0;"><strong>Product:</strong> ${formData.product}</p>` : ''}
              <p style="color: #666; margin: 5px 0;"><strong>Message:</strong></p>
              <p style="color: #666; background: #f1f5f9; padding: 15px; border-radius: 5px; margin-top: 10px;">${formData.message.replace(/\n/g, '<br>')}</p>
            </div>
            <p style="color: #555; line-height: 1.6;">We typically respond within 24-48 hours. If your inquiry is urgent, please feel free to call us at <strong>+91 9009065444</strong>.</p>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <p style="color: #888; font-size: 14px; margin: 5px 0;"><strong>Best regards,</strong><br>The JKExportHub Team</p>
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
        Message: ${formData.message}
        We typically respond within 24-48 hours. If your inquiry is urgent, please feel free to call us at +91 9009065444.
        Best regards,
        JKExportHub Team
        15/B Jehangirabad, Bhopal, Madhya Pradesh 462008, India
        Phone: +91 9009065444
        Email: contact@jkexporthub.com
      `
    };

    const info = await transporter.sendMail(mailOptions);
    const duration = Date.now() - startTime;
    console.log(`✅ Confirmation email sent in ${duration}ms:`, formData.email);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`❌ Confirmation email failed after ${duration}ms`);
    handleEmailError(error);
  }
};

module.exports = {
  sendContactEmail,
  sendConfirmationEmail
};
