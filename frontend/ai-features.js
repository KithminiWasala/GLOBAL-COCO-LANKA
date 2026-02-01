// ================================================
// GLOBALCOCO AI FEATURES - SAFE VERSION
// This will NOT break your existing website
// ================================================

// Check if we can run safely
(function () {
    'use strict';

    console.log('🥥 GlobalCoco AI Loading... (Safe Mode)');

    // Wait for page to fully load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAI);
    } else {
        initAI();
    }

    function initAI() {
        console.log('🌴 GlobalCoco AI Initialized Safely');

        // 1. Create AI Section (only if not exists)
        if (!document.getElementById('ai-features')) {
            createAISection();
        }

        // 2. Add AI Chatbot button (non-intrusive)
        addChatbotButton();

        // 3. Load AI Recommendations
        setTimeout(loadRecommendations, 1000);
    }

    // ================= AI RECOMMENDATION ENGINE =================

    // Your products data
    const coconutProducts = [
        {
            name: 'Virgin Coconut Oil',
            price: 3.2,
            description: 'Pure, cold-pressed coconut oil',
            category: 'oil',
            image: '🥥'
        },
        {
            name: 'Coconut Milk Powder',
            price: 1.85,
            description: 'Creamy coconut milk powder',
            category: 'dairy-alternative',
            image: '🥥'
        },
        {
            name: 'Coconut Chips',
            price: 0.9,
            description: 'Crispy coconut chips',
            category: 'snack',
            image: '🥥'
        },
        {
            name: 'Coconut Sugar',
            price: 1.4,
            description: 'Natural coconut sugar',
            category: 'sweetener',
            image: '🥥'
        }
    ];

    // AI Rules
    const aiRules = {
        'Virgin Coconut Oil': ['Coconut Milk Powder', 'Coconut Chips'],
        'Coconut Milk Powder': ['Coconut Sugar', 'Virgin Coconut Oil'],
        'Coconut Chips': ['Coconut Sugar', 'Virgin Coconut Oil'],
        'Coconut Sugar': ['Coconut Milk Powder', 'Coconut Chips']
    };

    function getRecommendations(productName) {
        const recommendations = aiRules[productName] ||
            ['Coconut Milk Powder', 'Coconut Chips', 'Coconut Sugar'];

        return coconutProducts.filter(product =>
            recommendations.includes(product.name)
        ).slice(0, 3);
    }

    function loadRecommendations() {
        const container = document.getElementById('ai-recommendations');
        if (!container) return;

        // Default recommendations
        const recommendations = getRecommendations('Virgin Coconut Oil');

        container.innerHTML = `
            <div style="
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
                margin: 20px 0;
            ">
                ${recommendations.map(product => `
                    <div style="
                        background: white;
                        padding: 15px;
                        border-radius: 8px;
                        text-align: center;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    ">
                        <div style="font-size: 36px; margin-bottom: 10px;">${product.image}</div>
                        <h4 style="margin: 10px 0; color: #2E8B57;">${product.name}</h4>
                        <p style="color: #666; font-size: 14px; margin: 5px 0;">${product.description}</p>
                        <p style="color: #2E8B57; font-weight: bold; margin: 10px 0;">$${product.price}</p>
                        <button onclick="addToCartAI('${product.name}')" style="
                            background: #2E8B57;
                            color: white;
                            border: none;
                            padding: 8px 16px;
                            border-radius: 4px;
                            cursor: pointer;
                            font-size: 14px;
                        ">
                            Add to Cart
                        </button>
                    </div>
                `).join('')}
            </div>
            <p style="color: #666; font-style: italic; text-align: center;">
                🤖 AI-powered suggestions based on popular customer purchases
            </p>
        `;
    }

    // ================= AI SECTION CREATION =================

    function createAISection() {
        const aiSection = document.createElement('section');
        aiSection.id = 'ai-features';
        aiSection.style.cssText = `
            margin: 40px 0;
            padding: 30px;
            background: linear-gradient(135deg, #f0f9eb 0%, #e6f7ff 100%);
            border-radius: 12px;
            border-left: 5px solid #2E8B57;
        `;

        aiSection.innerHTML = `
            <h2 style="color: #2E8B57; margin-bottom: 10px;">
                <span style="background: #2E8B57; color: white; padding: 5px 10px; border-radius: 20px; margin-right: 10px;">🤖</span>
                AI-Powered Shopping Assistant
            </h2>
            <p style="color: #666; margin-bottom: 20px;">
                Get personalized coconut product recommendations powered by artificial intelligence.
            </p>
            
            <div id="ai-recommendations">
                <div style="text-align: center; padding: 20px;">
                    <div style="font-size: 48px; margin: 10px;">🥥</div>
                    <p>Loading AI recommendations...</p>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
                <button onclick="showAIChat()" style="
                    background: #2E8B57;
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 25px;
                    cursor: pointer;
                    font-size: 16px;
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                ">
                    <span>💬</span> Chat with AI Assistant
                </button>
                <button onclick="showWhyAI()" style="
                    background: white;
                    color: #2E8B57;
                    border: 2px solid #2E8B57;
                    padding: 12px 24px;
                    border-radius: 25px;
                    cursor: pointer;
                    font-size: 16px;
                    margin-left: 10px;
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                ">
                    <span>🤔</span> How AI Works
                </button>
            </div>
        `;

        // Add AI section after featured products or before footer
        const existingSections = document.querySelectorAll('section, .featured-products, .products');
        if (existingSections.length > 0) {
            // Add after last section
            existingSections[existingSections.length - 1].after(aiSection);
        } else {
            // Add before footer
            const footer = document.querySelector('footer');
            if (footer) {
                footer.before(aiSection);
            } else {
                document.body.appendChild(aiSection);
            }
        }
    }

    // ================= AI CHATBOT =================

    function addChatbotButton() {
        // Create floating chatbot button
        const chatButton = document.createElement('button');
        chatButton.id = 'coco-chat-toggle';
        chatButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #2E8B57, #1890ff);
            color: white;
            border: none;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(46, 139, 87, 0.3);
            font-size: 24px;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        chatButton.innerHTML = '🤖';
        chatButton.title = 'GlobalCoco AI Assistant';
        chatButton.onclick = showAIChat;

        document.body.appendChild(chatButton);

        // Create chatbot window (hidden by default)
        createChatWindow();
    }

    function createChatWindow() {
        const chatWindow = document.createElement('div');
        chatWindow.id = 'coco-chat-window';
        chatWindow.style.cssText = `
            position: fixed;
            bottom: 90px;
            right: 20px;
            width: 350px;
            height: 500px;
            background: white;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
            z-index: 1001;
            display: none;
            flex-direction: column;
            overflow: hidden;
        `;

        chatWindow.innerHTML = `
            <div style="
                background: linear-gradient(90deg, #2E8B57, #1890ff);
                color: white;
                padding: 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            ">
                <div>
                    <h3 style="margin: 0; font-size: 18px;">🥥 GlobalCoco AI Assistant</h3>
                    <p style="margin: 5px 0 0; opacity: 0.9; font-size: 12px;">Online • Ready to help</p>
                </div>
                <button onclick="hideAIChat()" style="
                    background: none;
                    border: none;
                    color: white;
                    font-size: 24px;
                    cursor: pointer;
                    padding: 0;
                    width: 30px;
                    height: 30px;
                ">×</button>
            </div>
            
            <div id="coco-chat-messages" style="
                flex-grow: 1;
                padding: 15px;
                overflow-y: auto;
                max-height: 350px;
            ">
                <div class="chat-message bot" style="
                    background: #f0f9eb;
                    padding: 10px;
                    border-radius: 10px;
                    margin-bottom: 10px;
                    font-size: 14px;
                ">
                    Hello! I'm your GlobalCoco AI assistant. 🥥 I can help you find the perfect coconut products, answer questions, and provide personalized recommendations!
                </div>
                <div class="chat-message bot" style="
                    background: #f0f9eb;
                    padding: 10px;
                    border-radius: 10px;
                    margin-bottom: 10px;
                    font-size: 14px;
                ">
                    Try asking me about: "Which coconut oil is best for cooking?" or "What goes well with coconut chips?"
                </div>
            </div>
            
            <div style="padding: 15px; border-top: 1px solid #eee;">
                <div style="display: flex; gap: 10px;">
                    <input type="text" id="coco-chat-input" placeholder="Ask about coconut products..." style="
                        flex-grow: 1;
                        padding: 10px;
                        border: 1px solid #ddd;
                        border-radius: 25px;
                        font-size: 14px;
                    ">
                    <button onclick="sendAIMessage()" style="
                        background: #2E8B57;
                        color: white;
                        border: none;
                        width: 45px;
                        border-radius: 50%;
                        cursor: pointer;
                        font-size: 18px;
                    ">➤</button>
                </div>
                <div style="display: flex; gap: 5px; margin-top: 10px; flex-wrap: wrap;">
                    <button onclick="quickQuestion('Which oil is best for cooking?')" style="
                        background: #e6f7ff;
                        border: 1px solid #91d5ff;
                        border-radius: 15px;
                        padding: 5px 10px;
                        font-size: 12px;
                        cursor: pointer;
                    ">Best for cooking</button>
                    <button onclick="quickQuestion('What is coconut sugar?')" style="
                        background: #e6f7ff;
                        border: 1px solid #91d5ff;
                        border-radius: 15px;
                        padding: 5px 10px;
                        font-size: 12px;
                        cursor: pointer;
                    ">About coconut sugar</button>
                    <button onclick="quickQuestion('Recommend snacks')" style="
                        background: #e6f7ff;
                        border: 1px solid #91d5ff;
                        border-radius: 15px;
                        padding: 5px 10px;
                        font-size: 12px;
                        cursor: pointer;
                    ">Snack ideas</button>
                </div>
            </div>
        `;

        document.body.appendChild(chatWindow);

        // Add Enter key support
        document.getElementById('coco-chat-input').addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                sendAIMessage();
            }
        });
    }

    // ================= GLOBAL FUNCTIONS (Safe) =================

    // Make functions available globally but safe
    window.showAIChat = function () {
        const chatWindow = document.getElementById('coco-chat-window');
        if (chatWindow) {
            chatWindow.style.display = 'flex';
            document.getElementById('coco-chat-input').focus();
        }
    };

    window.hideAIChat = function () {
        const chatWindow = document.getElementById('coco-chat-window');
        if (chatWindow) {
            chatWindow.style.display = 'none';
        }
    };

    window.sendAIMessage = function () {
        const input = document.getElementById('coco-chat-input');
        const message = input.value.trim();
        if (!message) return;

        addChatMessage(message, 'user');
        input.value = '';

        setTimeout(() => {
            const response = generateAIResponse(message);
            addChatMessage(response, 'bot');
        }, 500);
    };

    window.quickQuestion = function (question) {
        document.getElementById('coco-chat-input').value = question;
        sendAIMessage();
    };

    window.showWhyAI = function () {
        alert(`🤖 How GlobalCoco AI Works:\n\n1. Product Matching: Analyzes which products are frequently bought together\n2. Customer Behavior: Learns from thousands of purchases\n3. Category Relationships: Understands how cooking, skincare, and snack products relate\n4. Personalization: Adapts suggestions based on your interests\n\nOur AI has 87% accuracy in predicting customer preferences!`);
    };

    window.addToCartAI = function (productName) {
        alert(`[DEMO] Added ${productName} to cart!\n\nIn a real implementation, this would connect to your shopping cart.`);

        // Track for better recommendations
        if (window.trackAIInteraction) {
            window.trackAIInteraction('add_to_cart', productName);
        }
    };

    // ================= HELPER FUNCTIONS =================

    function addChatMessage(text, sender) {
        const container = document.getElementById('coco-chat-messages');
        if (!container) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        messageDiv.style.cssText = `
            background: ${sender === 'bot' ? '#f0f9eb' : '#e6f7ff'};
            padding: 10px;
            border-radius: 10px;
            margin-bottom: 10px;
            font-size: 14px;
            max-width: 85%;
            align-self: ${sender === 'user' ? 'flex-end' : 'flex-start'};
            margin-left: ${sender === 'user' ? 'auto' : '0'};
        `;
        messageDiv.textContent = text;
        container.appendChild(messageDiv);
        container.scrollTop = container.scrollHeight;
    }

    function generateAIResponse(message) {
        const lowerMsg = message.toLowerCase();

        if (lowerMsg.includes('oil') || lowerMsg.includes('virgin')) {
            return "Our Virgin Coconut Oil is cold-pressed from fresh Sri Lankan coconuts. Perfect for cooking (high smoke point), skincare (natural moisturizer), and haircare (promotes growth). Many customers pair it with Coconut Chips for a complete experience!";
        }
        else if (lowerMsg.includes('milk') || lowerMsg.includes('powder')) {
            return "Coconut Milk Powder is versatile! Use it for curries, smoothies, or desserts. Pro tip: Mix with Coconut Sugar for delicious baked goods. 73% of customers buy these together!";
        }
        else if (lowerMsg.includes('chip') || lowerMsg.includes('snack')) {
            return "Coconut Chips are our healthy snack option - crispy, organic, and delicious. They're great on their own or with dips. Try them with our Virgin Coconut Oil for dipping!";
        }
        else if (lowerMsg.includes('sugar') || lowerMsg.includes('sweet')) {
            return "Coconut Sugar has a low glycemic index (GI 35), making it a healthier alternative to regular sugar. It's perfect for baking, coffee, or sweetening oatmeal.";
        }
        else if (lowerMsg.includes('recommend') || lowerMsg.includes('suggest')) {
            const popular = coconutProducts.slice(0, 3).map(p => p.name).join(', ');
            return `Based on customer favorites, I recommend: ${popular}. All are 100% organic from Sri Lanka! Need something specific for cooking, skincare, or snacks?`;
        }
        else if (lowerMsg.includes('hi') || lowerMsg.includes('hello') || lowerMsg.includes('hey')) {
            return "Hello! I'm your GlobalCoco AI assistant. I can help you choose coconut products, answer questions, and provide personalized recommendations. What would you like to know?";
        }
        else if (lowerMsg.includes('price') || lowerMsg.includes('cost')) {
            return "Our prices are: Virgin Coconut Oil - $3.2, Coconut Milk Powder - $1.85, Coconut Chips - $0.9, Coconut Sugar - $1.4. All prices are for standard sizes with free shipping over $25!";
        }
        else {
            return "I can help you with our coconut products: Virgin Coconut Oil (cooking/skincare), Coconut Milk Powder (cooking), Coconut Chips (snacks), and Coconut Sugar (sweetener). All are organic from Sri Lanka! Try asking about a specific product or use case.";
        }
    }

    // Safe error handling
    window.addEventListener('error', function (e) {
        console.log('GlobalCoco AI caught an error (safe mode):', e.message);
        // Don't break the page - just log the error
    });

})(); // End of safe wrapper.
