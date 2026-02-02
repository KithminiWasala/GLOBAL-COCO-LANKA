const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const User = require('../models/User');
const Counter = require('../models/Counter');
const sendOrderEmail = require('../utils/email');

// @route   POST api/orders
// @desc    Create a new order
// @access  Private
router.post('/', auth, async (req, res) => {
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

        // Send email notification (don't await so response isn't delayed)
        sendOrderEmail({
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
