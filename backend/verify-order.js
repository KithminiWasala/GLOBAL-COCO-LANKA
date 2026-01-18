// Native fetch
const baseUrl = 'http://localhost:5000/api';

async function verifyOrder() {
    console.log("1. Logging in to get token...");
    try {
        const loginRes = await fetch(`${baseUrl}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: "testuser@example.com",
                password: "password123"
            })
        });

        if (loginRes.status !== 200) {
            console.error("Login failed. Please ensure 'testuser@example.com' exists (from previous tests).");
            // Register if not exists
            console.log("Attempting registration fallback...");
            const regRes = await fetch(`${baseUrl}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: "Order Tester",
                    email: "ordertest_" + Date.now() + "@example.com",
                    phone: "1234567890",
                    password: "password123"
                })
            });
            const regData = await regRes.json();
            if (regData.token) {
                return placeOrder(regData.token);
            }
            return;
        }

        const loginData = await loginRes.json();
        const token = loginData.token;
        console.log("Login successful. Token received.");
        placeOrder(token);

    } catch (err) {
        console.error("Error:", err.message);
    }
}

async function placeOrder(token) {
    console.log("\n2. Placing an Order...");
    const orderData = {
        items: [
            {
                product: "Coconut Oil",
                productId: "mock_id_123",
                quantity: 2,
                price: 1500,
                image: "http://example.com/oil.jpg"
            }
        ],
        total: 3000,
        shippingDetails: {
            name: "Order Tester",
            address: "123 Coconut Lane",
            city: "Colombo",
            phone: "0771234567"
        }
    };

    const res = await fetch(`${baseUrl}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token
        },
        body: JSON.stringify(orderData)
    });

    const data = await res.json();
    console.log("Order Response Status:", res.status);
    console.log("Order Data:", data);

    if (res.status === 200 && data._id) {
        console.log("SUCCESS: Order saved to MongoDB!");
    } else {
        console.log("FAILURE: Order not saved.");
    }
}

verifyOrder();
