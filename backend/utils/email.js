const nodemailer = require('nodemailer');

const sendOrderEmail = async (orderData) => {
    try {
        const { items, total, shippingDetails, orderId, userEmail, orderNumber } = orderData;

        console.log(`--- Initiating Email for Order #${orderNumber} ---`);
        console.log(`Recipient (Notify): ${process.env.EMAIL_NOTIFY}`);
        console.log(`Sender (User): ${process.env.EMAIL_USER}`);

        const orderDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        // Create transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        console.log('Verifying SMTP connection...');
        await transporter.verify();
        console.log('SMTP Connection verified successfully');

        // Format items list
        const itemsHtml = items.map(item => `
            <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee; color: #4a5568;">${item.product}</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee; color: #4a5568; text-align: center;">${item.quantity}</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee; color: #4a5568; text-align: right;">$${item.price.toFixed(2)}</td>
            </tr>
        `).join('');

        // Email description
        const mailOptions = {
            from: `"Global Coco Lanka" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_NOTIFY,
            subject: `🧾 Order Receipt #${orderNumber} - Global Coco Lanka`,
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 20px auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                    <div style="background-color: #2c7a7b; color: white; padding: 30px; text-align: center;">
                        <h1 style="margin: 0; font-size: 24px;">ORDER RECEIPT</h1>
                        <p style="margin: 10px 0 0; opacity: 0.9;">Thank you for your purchase!</p>
                    </div>
                    
                    <div style="padding: 30px; background-color: white;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 30px; border-bottom: 2px solid #f7fafc; padding-bottom: 20px;">
                            <div>
                                <h3 style="margin: 0; color: #2d3748; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Order Information</h3>
                                <p style="margin: 10px 0 5px; color: #4a5568;"><strong>Order Number:</strong> #${orderNumber}</p>
                                <p style="margin: 0; color: #4a5568;"><strong>Date:</strong> ${orderDate}</p>
                            </div>
                            <div style="text-align: right;">
                                <h3 style="margin: 0; color: #2d3748; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Customer Account</h3>
                                <p style="margin: 10px 0 0; color: #4a5568;">${userEmail}</p>
                            </div>
                        </div>

                        <h3 style="color: #2d3748; font-size: 16px; margin-bottom: 15px;">Order Summary</h3>
                        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                            <thead>
                                <tr style="background-color: #edf2f7;">
                                    <th style="padding: 12px; text-align: left; color: #4a5568; font-size: 13px;">Product</th>
                                    <th style="padding: 12px; text-align: center; color: #4a5568; font-size: 13px;">Qty</th>
                                    <th style="padding: 12px; text-align: right; color: #4a5568; font-size: 13px;">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${itemsHtml}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="2" style="padding: 20px 12px 10px; text-align: right; color: #718096;">Subtotal:</td>
                                    <td style="padding: 20px 12px 10px; text-align: right; color: #4a5568;">$${total.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="padding: 5px 12px 20px; text-align: right; color: #2d3748; font-size: 18px; font-weight: bold;">Grand Total:</td>
                                    <td style="padding: 5px 12px 20px; text-align: right; color: #2c7a7b; font-size: 22px; font-weight: bold;">$${total.toFixed(2)}</td>
                                </tr>
                            </tfoot>
                        </table>
                        
                        <div style="background-color: #f7fafc; padding: 20px; border-radius: 6px; margin-top: 30px;">
                            <h3 style="margin: 0 0 10px; color: #2d3748; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Shipping Address</h3>
                            <p style="margin: 0; color: #4a5568; line-height: 1.6;">
                                <strong>${shippingDetails.name}</strong><br>
                                ${shippingDetails.address}<br>
                                ${shippingDetails.city}<br>
                                <strong>Phone:</strong> ${shippingDetails.phone}
                            </p>
                        </div>
                    </div>
                    
                    <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #edf2f7; color: #a0aec0; font-size: 12px;">
                        <p style="margin: 0;">Global Coco Lanka - Premium Coconut Products</p>
                        <p style="margin: 5px 0 0;">This is a system-generated receipt for your records.</p>
                    </div>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`Order notification email sent: ${info.messageId}`);
        return true;
    } catch (error) {
        console.error(`CRITICAL ERROR in sendOrderEmail: ${error.message}`);
        if (error.stack) console.error(error.stack);
        return false;
    }
};

module.exports = sendOrderEmail;
