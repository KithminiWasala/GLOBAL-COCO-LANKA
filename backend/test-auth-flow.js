// Native fetch used


async function testAuth() {
    const baseUrl = 'http://localhost:5000/api/auth';
    const user = {
        name: "Auth Test User",
        email: `authtest_${Date.now()}@example.com`,
        phone: "5555555555",
        password: "password123"
    };

    console.log("1. Testing Registration...");
    try {
        const regRes = await fetch(`${baseUrl}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
        const regData = await regRes.json();
        console.log("Registration Status:", regRes.status);
        console.log("Registration Response:", regData);

        if (regRes.status !== 200) {
            console.error("Registration Failed!");
            return;
        }

        console.log("\n2. Testing Login...");
        const loginRes = await fetch(`${baseUrl}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: user.email,
                password: user.password
            })
        });
        const loginData = await loginRes.json();
        console.log("Login Status:", loginRes.status);
        console.log("Login Response:", loginData);

        if (loginRes.status === 200 && loginData.token) {
            console.log("\nSUCCESS: User registered and logged in! Data is persisting in MongoDB.");
        } else {
            console.error("\nFAILURE: Login failed after registration.");
        }

    } catch (err) {
        console.error("Error during test:", err.message);
    }
}

testAuth();
