
import { transporter } from "./mailer.js"

const sendVerification = async (email, verificationToken) => {

    // Email options
    const mailOptions = {
        from: 'Heartbytes',
        to: email,
        subject: 'Email Verification',
        html: `
            <h1>Email Verification</h1>
            <p>Click the link below to verify your email:</p>
            <a href="${process.env.BACKEND_URL}/api/v1/auth/verify/${verificationToken}">Verify Email</a>
        `,
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