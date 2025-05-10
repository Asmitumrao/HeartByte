import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();



const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, // Your Gmail address
    pass: process.env.GMAIL_PASS, // Use App Password if 2FA is enabled
  },
});



// Email options
// const mailOptions = {
//   from: 'Heartbytes',
//   to: 'recipient@example.com',
//   subject: 'Test Email',
//   html: 
// };


// // Send the email
// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.error('Error:', error);
//   } else {
//     console.log('Email sent:', info.response);
//   }
// });



export {transporter};