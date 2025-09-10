const nodemailer = require('nodemailer');

module.exports = async function (context, req) {
  if (req.method !== 'POST') {
    context.res = {
      status: 405,
      body: 'Method Not Allowed',
    };
    return;
  }

  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    context.res = {
      status: 400,
      body: 'Missing required fields',
    };
    return;
  }

  // Configure Office 365 SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.office365.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false, // true for 465, false for 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: email,
    to: 'help@krhscougarband.org', // your destination email
    subject: `Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    context.res = {
      status: 200,
      body: 'Message sent successfully!',
    };
  } catch (err) {
    context.res = {
      status: 500,
      body: 'Failed to send message.',
    };
  }
};
