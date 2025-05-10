
import { transporter } from "./mailer.js"

const sendVerification = async (email, verificationToken) => {


    const html = `<h1 style="font-family: Arial, sans-serif; color: #333;">Email Verification</h1>
<p style="font-family: Arial, sans-serif; color: #555;">
  Click the link below to verify your email address:
</p>
<p>
  <a 
    href="${process.env.BACKEND_URL}/api/v1/auth/verify/${verificationToken}" 
    style="display: inline-block; padding: 10px 20px; background-color: #007BFF; color: white; text-decoration: none; border-radius: 5px; font-family: Arial, sans-serif;">
    Verify Email
  </a>
</p>
<p style="font-family: Arial, sans-serif; color: #999; font-size: 12px;">
  If you did not request this, you can safely ignore this email.
</p>`

    // Email options
    const mailOptions = {
        from: 'Heartbytes',
        to: email,
        subject: 'Email Verification',
        html: html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });


}
export default sendVerification;