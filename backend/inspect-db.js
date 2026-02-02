require('dotenv').config();
const mongoose = require('mongoose');
const Order = require('./models/Order');
const Counter = require('./models/Counter');

async function debugDetails() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('--- Database Inspection ---');

        const counter = await Counter.findOne({ id: 'orderNumber' });
        console.log('Counter Doc:', JSON.stringify(counter, null, 2));

        const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(3);
        console.log('\nRecent Orders (Raw Data):');
        recentOrders.forEach((o, i) => {
            console.log(`[Order ${i}] Number: ${o.orderNumber}, Type: ${typeof o.orderNumber}, ID: ${o._id}`);
        });

        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

debugDetails();
