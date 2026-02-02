const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const User = require('../models/User');
const Counter = require('../models/Counter');
const sendOrderEmail = require('../utils/email');
const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '../email-debug.log');

// @route   POST api/orders
// @desc    Create a new order
// @access  Private
router.post('/', auth, async (req, res) => {
    fs.appendFileSync(logFile, `[${new Date().toISOString()}] Incoming order from ${req.user.id} (Connection: ${req.headers['x-forwarded-for'] || req.socket.remoteAddress})\n`);
    try {
        const { items, total, shippingDetails } = req.body;

        // Get the next sequence number for orders
        const counter = await Counter.findOneAndUpdate(
            { id: 'orderNumber' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );

        const newOrder = new Order({
            orderNumber: counter.seq,
            user: req.user.id,
            items,
            total,
            shippingDetails
        });

        const order = await newOrder.save();

        // Fetch user email to include in notification
        const user = await User.findById(req.user.id);

        // Send email notification
        await sendOrderEmail({
            items,
            total,
            shippingDetails,
            orderId: order._id,
            orderNumber: order.orderNumber,
            userEmail: user ? user.email : 'Unknown'
        });

        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
