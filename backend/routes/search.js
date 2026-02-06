const express = require('express');
const router = express.Router();
const smartProducts = require('../data/smart_products');

// Helper: Levenshtein Distance for strict fuzzy matching
const getLevenshteinDistance = (a, b) => {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
                );
            }
        }
    }
    return matrix[b.length][a.length];
};

const isFuzzyMatch = (word, target) => {
    if (target.includes(word)) return true;
    const distance = getLevenshteinDistance(word, target);
    // Allow 1 error for short words, 2 for longer
    const allowed = target.length > 5 ? 2 : 1;
    return distance <= allowed;
};


// @route   POST api/search/analyze
// @desc    Analyze natural language query and recommend products
// @access  Public
router.post('/analyze', (req, res) => {
    try {
        const { query } = req.body;
        if (!query) return res.status(400).json({ msg: 'Query is required' });

        const lowerQuery = query.toLowerCase();

        // 1. Intent Detection
        const intents = {
            frying: ["fry", "deep fry", "high heat", "tempura", "crispy"],
            skincare: ["skin", "face", "moisturizer", "body", "lotion", "dry skin", "acne"],
            haircare: ["hair", "scalp", "dandruff", "conditioner", "dry hair"],
            gift: ["gift", "present", "premium", "luxury", "friend", "special"],
            budget: ["cheap", "bulk", "value", "economical", "save", "daily", "quantity", "low price"],
            baking: ["bake", "cake", "cookie", "dessert"],
            neutral: ["odorless", "no smell", "no taste", "neutral"]
        };

        // 2. Scoring System
        const scoredProducts = smartProducts.map(p => {
            let score = 0;

            // A. Direct Product Name Match (NEW - Highest Priority)
            const productNames = {
                "1": "Virgin Coconut Oil",
                "9": "Premium Extra Virgin Coconut Oil",
                "10": "Value Pack Coconut Oil",
                "11": "Refined Coconut Oil",
                "12": "Mini Travel Coconut Oil",
                "3": "Coconut Milk Powder",
                "13": "Organic Coconut Milk Powder",
                "14": "Low Fat Coconut Milk Powder",
                "15": "Bulk Milk Powder",
                "16": "Instant Coconut Milk Mix",
                "6": "Coconut Cream",
                "25": "Condensed Coconut Milk",
                "26": "Whipping Coconut Cream",
                "27": "Culinary Coconut Cream",
                "28": "Light Cooking Cream",
                "4": "Coconut Chips",
                "17": "Honey Glazed Coconut Chips",
                "18": "Spicy Chili Coconut Chips",
                "19": "Chocolate Drip Coconut Chips",
                "20": "Natural Raw Coconut Chips",
                "5": "Coconut Sugar",
                "21": "Premium Golden Coconut Sugar",
                "22": "Coconut Nectar Syrup",
                "23": "Coarse Coconut Sugar",
                "24": "Budget Coconut Sugar Mix",
                "7": "Coconut Body Soap",
                "29": "Charcoal Coconut Scrub",
                "30": "Lavender Coconut Lotion",
                "31": "Coconut Lip Balm",
                "32": "Pure Hair Repair Mask",
                "8": "Desiccated Coconut",
                "33": "Shredded Sweet Coconut",
                "34": "Coconut Flour",
                "35": "Toasted Desiccated Coconut",
                "36": "Coconut Macaroon Mix"
            };

            const productName = productNames[p.id];
            if (productName) {
                const nameLower = productName.toLowerCase();
                const queryWords = lowerQuery.split(" ");

                // Check if query contains significant words from product name
                let nameMatchCount = 0;
                queryWords.forEach(word => {
                    if (word.length > 2 && nameLower.includes(word)) {
                        nameMatchCount++;
                    }
                });

                // If multiple words from product name match, give huge boost
                if (nameMatchCount >= 2) {
                    score += 50; // Very high score for product name match
                } else if (nameMatchCount === 1) {
                    score += 20;
                }

                // Exact match gets even higher score
                if (lowerQuery.includes(nameLower) || nameLower.includes(lowerQuery)) {
                    score += 30;
                }
            }

            // B. Fuzzy Keyword Match (Tags)
            p.tags.forEach(tag => {
                // Split query into words to check against tags
                const queryWords = lowerQuery.split(" ");
                queryWords.forEach(word => {
                    if (isFuzzyMatch(word, tag)) score += 15;
                });
            });

            // C. Fuzzy Best For Match
            p.bestFor.forEach(usage => {
                if (lowerQuery.includes(usage)) score += 5;
            });

            // D. Negative Filtering
            p.avoid.forEach(issue => {
                if (lowerQuery.includes(issue)) score -= 20;
            });

            // E. Specific Scenario Boosts
            if (intents.frying.some(k => lowerQuery.includes(k))) {
                if (p.tags.includes("refined")) score += 10;
                if (p.tags.includes("unrefined")) score -= 10;
            }
            if (intents.skincare.some(k => lowerQuery.includes(k))) {
                if (p.tags.includes("chemical-free") || p.tags.includes("unrefined")) score += 8;
                if (p.tags.includes("refined")) score -= 10;
            }
            if (intents.gift.some(k => lowerQuery.includes(k))) {
                if (p.tags.includes("premium")) score += 10;
                if (p.tags.includes("bulk")) score -= 5;
            }
            if (intents.budget.some(k => lowerQuery.includes(k))) {
                if (p.tags.includes("value") || p.tags.includes("bulk")) score += 10;
            }

            return { ...p, score };
        });

        // 3. Find Winner
        scoredProducts.sort((a, b) => b.score - a.score);
        const bestMatch = scoredProducts[0];

        // Find alternatives
        const alternatives = scoredProducts
            .slice(1)
            .filter(p => p.score > 25) // Minimum score threshold
            .slice(0, 2);

        // Require minimum score of 25 to prevent random/meaningless searches
        if (bestMatch.score < 25) {
            return res.json({
                found: false,
                message: "I couldn't find products matching that search. Try searching for specific products like 'Virgin Coconut Oil', 'Coconut Chips', 'Lip Balm', or describe what you need like 'oil for cooking' or 'product for dry skin'."
            });
        }

        // 4. Generate "AI" Response Text
        const responseData = {
            found: true,
            query: query,
            bestMatch: {
                id: bestMatch.id,
                whyItIsPerfect: `Based on your request, this is the best match because it aligns with "${bestMatch.tags[0]}" and is perfect for ${bestMatch.bestFor[0]}.`,
                keyBenefits: bestMatch.keyBenefits
            },
            alternatives: alternatives.map(a => ({
                id: a.id,
                reason: `Another great ${a.tags[0]} option.`
            }))
        };

        // Custom Copy
        if (lowerQuery.includes("cheap") || lowerQuery.includes("bulk")) {
            responseData.bestMatch.whyItIsPerfect = "This is the most economical choice, offering the same high quality in a larger, value-focused package.";
        } else if (lowerQuery.includes("gift")) {
            responseData.bestMatch.whyItIsPerfect = "This is our most premium product, featuring elegant packaging and the highest grade extraction—perfect for gifting.";
        } else if (lowerQuery.includes("nectar") || lowerQuery.includes("syrup") || lowerQuery.includes("nectra")) {
            responseData.bestMatch.whyItIsPerfect = "This natural nectar is a perfect liquid sweetener, great for pancakes and toppings.";
        }

        // Pro Tips
        if (intents.frying.some(k => lowerQuery.includes(k))) responseData.proTip = "Refined oil has a higher smoke point (400°F), making it safer for deep frying than virgin oil.";
        else if (intents.skincare.some(k => lowerQuery.includes(k))) responseData.proTip = "Apply to damp skin immediately after a shower for maximum absorption.";
        else if (lowerQuery.includes("chip") || lowerQuery.includes("snack")) responseData.proTip = "Great for a mid-day energy boost without the sugar crash of candy.";
        else if (lowerQuery.includes("nectar") || lowerQuery.includes("syrup")) responseData.proTip = "Use it as a 1:1 replacement for honey or maple syrup.";
        else responseData.proTip = "Store your coconut products in a cool, dry place out of direct sunlight.";

        res.json(responseData);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
