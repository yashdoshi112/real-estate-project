// backend/services/emailService.js
const nodemailer = require('nodemailer');

// Configure the transporter (using Gmail for this example; in production, consider a service like SendGrid or AWS SES)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'YOUR_EMAIL@gmail.com',
    pass: 'YOUR_EMAIL_PASSWORD'
  }
});

exports.sendOfferEmail = ({ to, subject, text, attachments }) => {
  const mailOptions = {
    from: 'YOUR_EMAIL@gmail.com',
    to,
    subject,
    text,
    attachments
  };
  
  return transporter.sendMail(mailOptions);
};
