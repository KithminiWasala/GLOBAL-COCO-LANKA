const express = require('express');
const router = express.Router();
const smartProducts = require('../data/smart_products');

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

            // A. Direct Keyword Match (User names the product)
            // If user says "chips", boost all chips.
            p.tags.forEach(tag => {
                if (lowerQuery.includes(tag)) score += 15; // Huge boost for direct matches
            });

            // B. Intent Matching (User describes usage)
            p.bestFor.forEach(usage => {
                if (lowerQuery.includes(usage)) score += 5;
            });

            // C. Negative Filtering (User mentions what they DON'T want implied context)
            p.avoid.forEach(issue => {
                if (lowerQuery.includes(issue)) score -= 20; // Penalize heavily
            });

            // D. Specific Scenario Boosts
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

        // Find alternatives (next best scores > 0)
        const alternatives = scoredProducts
            .slice(1)
            .filter(p => p.score > 0)
            .slice(0, 2); // Take top 2 alternatives

        if (bestMatch.score <= 0) {
            return res.json({
                found: false,
                message: "I couldn't find a specific recommendation for that. Try searching for 'cooking', 'skin', 'chips', or 'oil'."
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

        // Custom "Why It's Perfect" Generation
        if (lowerQuery.includes("cheap") || lowerQuery.includes("bulk")) {
            responseData.bestMatch.whyItIsPerfect = "This is the most economical choice, offering the same high quality in a larger, value-focused package.";
        } else if (lowerQuery.includes("gift")) {
            responseData.bestMatch.whyItIsPerfect = "This is our most premium product, featuring elegant packaging and the highest grade extraction—perfect for gifting.";
        } else if (lowerQuery.includes("fry")) {
            responseData.bestMatch.whyItIsPerfect = "For deep frying, you need high heat stability. This oil has a high smoke point so it won't burn.";
        }

        // Add specific "Pro Tips"
        if (intents.frying.some(k => lowerQuery.includes(k))) responseData.proTip = "Refined oil has a higher smoke point (400°F), making it safer for deep frying than virgin oil.";
        else if (intents.skincare.some(k => lowerQuery.includes(k))) responseData.proTip = "Apply to damp skin immediately after a shower for maximum absorption.";
        else if (lowerQuery.includes("chip") || lowerQuery.includes("snack")) responseData.proTip = "Great for a mid-day energy boost without the sugar crash of candy.";
        else responseData.proTip = "Store your coconut products in a cool, dry place out of direct sunlight.";

        res.json(responseData);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
