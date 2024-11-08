const nodemailer = require("nodemailer");
const config = require("../config/variables");

const sendEmail = async (option) => {
  //Create a transporter for sending the email
  let transporter = nodemailer.createTransport({
    host: config.EMAIL_HOST,
    port: config.EMAIL_PORT,
    // secure: false,
    auth: {
      user: config.EMAIL_USER,
      pass: config.EMAIL_PASS,
    },
  });

  //Define the email options
  let mailOptions = {
    from: option.from,
    to: option.email,
    subject: option.subject,
    text: option.message,
  };

  await transporter.sendMail(mailOptions);
  console.log(`Verification code sent to mail ${option.email}`);
};
module.exports = sendEmail;
