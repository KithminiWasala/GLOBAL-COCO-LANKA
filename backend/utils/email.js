const nodemailer = require('nodemailer');

const sendOrderEmail = async (orderData) => {
    try {
        const { items, total, shippingDetails } = orderData;

        // Create transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Format items list
        const itemsHtml = items.map(item => `
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.product}</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.quantity}</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">$${item.price.toFixed(2)}</td>
            </tr>
        `).join('');

        // Email content
        const mailOptions = {
            from: `"Global Coco Lanka" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_NOTIFY,
            subject: '🥥 New Order Received! - Global Coco Lanka',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
                    <h2 style="color: #2c7a7b; text-align: center;">New Order Received</h2>
                    <p>You have a new order from <strong>${shippingDetails.name}</strong>.</p>
                    
                    <h3>Order Summary</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead style="background-color: #f8f9fa;">
                            <tr>
                                <th style="padding: 10px; text-align: left;">Program</th>
                                <th style="padding: 10px; text-align: left;">Qty</th>
                                <th style="padding: 10px; text-align: left;">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itemsHtml}
                        </tbody>
                    </table>
                    
                    <p style="text-align: right; font-size: 18px; font-weight: bold; margin-top: 20px;">
                        Total Amount: $${total.toFixed(2)}
                    </p>
                    
                    <h3>Shipping Details</h3>
                    <p>
                        ${shippingDetails.address}<br>
                        ${shippingDetails.city}, ${shippingDetails.zipCode}<br>
                        Phone: ${shippingDetails.phone}
                    </p>
                    
                    <div style="margin-top: 30px; text-align: center; color: #718096; font-size: 12px;">
                        <p>This is an automated notification from your web store.</p>
                    </div>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Order notification email sent:', info.messageId);
        return true;
    } catch (error) {
        console.error('Error sending order email:', error);
        return false;
    }
};

module.exports = sendOrderEmail;
