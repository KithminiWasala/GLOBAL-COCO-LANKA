require('dotenv').config();
const mongoose = require('mongoose');
const Order = require('./models/Order');
const Counter = require('./models/Counter');

async function debugData() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Check Counter
        const counter = await Counter.findOne({ id: 'orderNumber' });
        console.log('--- Counter Status ---');
        console.log(counter ? `Current Order Number Sequence: ${counter.seq}` : 'Counter not found!');

        // Check Recent Orders
        const orders = await Order.find().sort({ createdAt: -1 }).limit(5);
        console.log('\n--- Recent Orders ---');
        orders.forEach(order => {
            console.log(`- Order #${order.orderNumber} (ID: ${order._id})`);
            console.log(`  Date: ${order.createdAt}`);
            console.log(`  Customer: ${order.shippingDetails?.name || 'Unknown'}`);
            console.log(`  Total: $${order.total}`);
            console.log('-------------------');
        });

        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

debugData();
