const nodemailer = require('nodemailer');
const config = require('../config/config');

const sendEmail = async (options) => {
  // 1) Create a transporter
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'abdelrahman.ali.sayed27@gmail.com', // TODO: your gmail account
      pass: 'kadov$$$', // TODO: your gmail password
    },
  });

  // 2) Define the email options
  let mailOptions = {
    from: 'abdelrahman7@gmail.com',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
