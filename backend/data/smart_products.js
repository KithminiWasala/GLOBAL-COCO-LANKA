const smartProducts = [
    // --- OILS ---
    {
        id: "1", // Virgin Coconut Oil (Standard)
        tags: ["oil", "cold-pressed", "unrefined", "chemical-free", "natural", "pure", "hair", "skin"],
        bestFor: ["cooking medium heat", "skincare", "haircare", "massage", "moisturizer", "dry skin", "dry hair"],
        avoid: ["high-heat frying", "deep frying"],
        keyBenefits: [
            "Pure coconut flavor and aroma",
            "Retains all natural nutrients and antioxidants",
            "100% natural and chemical-free"
        ],
        matchScore: 0
    },
    {
        id: "9", // Premium Extra Virgin
        tags: ["oil", "first extract", "highest grade", "premium", "aromatic", "gift", "luxury"],
        bestFor: ["raw consumption", "premium cooking", "luxury skincare", "gifts", "health conscious", "salad dressing"],
        avoid: ["budget purchases", "deep frying"],
        keyBenefits: [
            "Extracted from the very first press for maximum purity",
            "Premium packaging suitable for gifting",
            "Highest nutrient retention and superior aroma"
        ],
        matchScore: 0
    },
    {
        id: "10", // Value Pack
        tags: ["oil", "bulk", "economical", "family-size", "kitchen-use", "value", "cheap", "save"],
        bestFor: ["daily cooking", "large families", "restaurants", "cost-conscious", "budget cooking"],
        avoid: ["gift-giving"],
        keyBenefits: [
            "Most cost-effective option for daily use",
            "Large 1L quantity lasts longer",
            "Same high quality in economical packaging"
        ],
        matchScore: 0
    },
    {
        id: "11", // Refined Oil
        tags: ["oil", "odorless", "flavorless", "high-smoke-point", "refined", "neutral"],
        bestFor: ["deep frying", "baking", "high heat cooking", "neutral flavor needed", "crispy frying"],
        avoid: ["skincare", "haircare", "raw consumption"],
        keyBenefits: [
            "No coconut taste or smell (neutral)",
            "High smoke point is perfect for deep frying",
            "Versatile for any cooking where flavor shouldn't interfere"
        ],
        matchScore: 0
    },

    // --- CHIPS (Snacks) ---
    {
        id: "4", // Toasted Chips (Standard)
        tags: ["chips", "snack", "toasted", "healthy", "crispy"],
        bestFor: ["snacking", "healthy treat", "mid-day snack"],
        avoid: ["cooking"],
        keyBenefits: ["Crispy and lightly toasted", "No artificial flavors", "High in fiber"],
        matchScore: 0
    },
    {
        id: "17", // Honey Glazed Chips
        tags: ["chips", "snack", "sweet", "honey", "glazed"],
        bestFor: ["sweet craving", "dessert topping", "kids"],
        avoid: ["low sugar diet"],
        keyBenefits: ["Natural sweetness from Sri Lankan honey", "Perfect crunchy texture", "Great energy booster"],
        matchScore: 0
    },
    {
        id: "18", // Spicy Chili Chips
        tags: ["chips", "snack", "spicy", "chili", "hot"],
        bestFor: ["savory snack", "spicy lovers", "party snack"],
        avoid: ["kids", "sensitive stomach"],
        keyBenefits: ["Authentic Ceylon spice blend", "Exciting savory flavor", "No MSG"],
        matchScore: 0
    },

    // --- DAIRY ALTERNATIVES ---
    {
        id: "3", // Milk Powder
        tags: ["milk", "powder", "dairy-free", "creamer", "vegan", "lactose-free"],
        bestFor: ["curries", "coffee", "smoothies", "travel"],
        avoid: ["liquid milk needs (needs mixing)"],
        keyBenefits: ["long shelf-life", "Great for camping/travel", "Instant creamy texture"],
        matchScore: 0
    },
    {
        id: "6", // Coconut Cream
        tags: ["cream", "liquid", "thick", "rich", "cooking", "curry"],
        bestFor: ["thick curries", "desserts", "soups"],
        avoid: ["light tea"],
        keyBenefits: ["Rich and velvety texture", "High fat content for creaminess", "Ready to use"],
        matchScore: 0
    },

    // --- SWEETENERS ---
    {
        id: "5", // Coconut Sugar
        tags: ["sugar", "sweetener", "baking", "healthy sugar", "low-gi"],
        bestFor: ["coffee", "tea", "baking", "diabetics (moderation)"],
        avoid: ["savory dishes"],
        keyBenefits: ["Lower glycemic index", "Natural caramel flavor", "Unrefined"],
        matchScore: 0
    }
];

module.exports = smartProducts;
