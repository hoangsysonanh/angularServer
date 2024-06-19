const nodemailer = require('nodemailer');

// Tạo một transporter
const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "f24cb241d468dd",
    pass: "2d88de1d64f95a"
  }
});

// send mail
async function sendEmail(customerEmail, orderId) {
    try {
        const mailOptions = {
            from: 'from@example.com',
            to: customerEmail,
            subject: 'Order Confirmation',
            html: `<p>Thank you for your order! Your order ID is: ${orderId}</p>
        <p>We will contact you soon for confirmation
        <a href="http://localhost:3001/order/${orderId}">Click here</a> to view your order details
        .</p>

      
      `
        };
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

module.exports = sendEmail;
