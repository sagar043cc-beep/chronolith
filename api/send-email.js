const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

module.exports = async (req, res) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  // Parse request body
  const { to, subject, body } = req.body || {};

  // Validate request parameters
  if (!to || !subject || !body) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields. Please provide "to", "subject", and "body".'
    });
  }

  // Retrieve environment variables
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailPass) {
    return res.status(500).json({
      success: false,
      error: 'Gmail credentials (GMAIL_USER or GMAIL_APP_PASSWORD) are not configured on the server.'
    });
  }

  // Resolve CV attachment path
  const cvPath = path.join(process.cwd(), 'public', 'cv.pdf');

  if (!fs.existsSync(cvPath)) {
    return res.status(500).json({
      success: false,
      error: 'CV attachment file not found at server root (public/cv.pdf).'
    });
  }

  // Create Gmail SMTP transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUser,
      pass: gmailPass
    }
  });

  // Construct email package
  const mailOptions = {
    from: gmailUser,
    to: to,
    subject: subject,
    text: body,
    attachments: [
      {
        filename: 'CV.pdf',
        path: cvPath
      }
    ]
  };

  try {
    // Send email
    const info = await transporter.sendMail(mailOptions);
    return res.status(200).json({
      success: true,
      message: 'Email sent successfully!',
      messageId: info.messageId
    });
  } catch (error) {
    console.error('Nodemailer error:', error);
    return res.status(500).json({
      success: false,
      error: `Failed to send email: ${error.message}`
    });
  }
};
