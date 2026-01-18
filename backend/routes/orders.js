const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/Order');

// @route   POST api/orders
// @desc    Create a new order
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const { items, total, shippingDetails } = req.body;

        const newOrder = new Order({
            user: req.user.id,
            items,
            total,
            shippingDetails
        });

        const order = await newOrder.save();
        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
