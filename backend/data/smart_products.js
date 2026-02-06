const smartProducts = [
    // --- OILS ---
    {
        id: "1", // Virgin Coconut Oil (Standard)
        tags: ["oil", "virgin", "cold-pressed", "unrefined", "chemical-free", "natural", "pure", "hair", "skin", "coconut oil"],
        bestFor: ["cooking medium heat", "skincare", "haircare", "massage", "moisturizer", "dry skin", "dry hair"],
        avoid: ["high-heat frying", "deep frying"],
        keyBenefits: [
            "Pure coconut flavor and aroma",
            "Retains all natural nutrients and antioxidants",
            "100% natural and chemical-free"
        ]
    },
    {
        id: "9", // Premium Extra Virgin
        tags: ["oil", "virgin", "extra virgin", "first extract", "highest grade", "premium", "aromatic", "gift", "luxury"],
        bestFor: ["raw consumption", "premium cooking", "luxury skincare", "gifts", "health conscious", "salad dressing"],
        avoid: ["budget purchases", "deep frying"],
        keyBenefits: [
            "Extracted from the very first press for maximum purity",
            "Premium packaging suitable for gifting",
            "Highest nutrient retention and superior aroma"
        ]
    },
    {
        id: "10", // Value Pack
        tags: ["oil", "bulk", "economical", "family-size", "kitchen-use", "value", "cheap", "save", "1l", "liter"],
        bestFor: ["daily cooking", "large families", "restaurants", "cost-conscious", "budget cooking"],
        avoid: ["gift-giving"],
        keyBenefits: [
            "Most cost-effective option for daily use",
            "Large 1L quantity lasts longer",
            "Same high quality in economical packaging"
        ]
    },
    {
        id: "11", // Refined Oil
        tags: ["oil", "refined", "odorless", "flavorless", "high-smoke-point", "neutral", "frying"],
        bestFor: ["deep frying", "baking", "high heat cooking", "neutral flavor needed", "crispy frying"],
        avoid: ["skincare", "haircare", "raw consumption"],
        keyBenefits: [
            "No coconut taste or smell (neutral)",
            "High smoke point perfect for deep frying",
            "Versatile for any cooking where flavor shouldn't interfere"
        ]
    },
    {
        id: "12", // Mini Travel Oil
        tags: ["oil", "travel", "mini", "small", "portable", "100ml", "convenient"],
        bestFor: ["travel", "on-the-go", "gym", "vacation", "trial size"],
        avoid: ["bulk cooking"],
        keyBenefits: [
            "Perfect travel size for portability",
            "TSA-friendly for flights",
            "Try before buying larger sizes"
        ]
    },

    // --- DAIRY ALTERNATIVES ---
    {
        id: "3", // Milk Powder
        tags: ["milk", "powder", "dairy-free", "creamer", "vegan", "lactose-free", "coconut milk"],
        bestFor: ["curries", "coffee", "smoothies", "travel", "camping"],
        avoid: ["liquid milk needs"],
        keyBenefits: [
            "Long shelf-life and convenient storage",
            "Great for camping and travel",
            "Instant creamy texture when mixed"
        ]
    },
    {
        id: "13", // Organic Milk Powder
        tags: ["milk", "powder", "organic", "vegan", "dairy-free", "no additives", "pure"],
        bestFor: ["organic diet", "health conscious", "vegan cooking"],
        avoid: ["budget purchases"],
        keyBenefits: [
            "100% organic certification",
            "No additives or preservatives",
            "Perfect for health-conscious users"
        ]
    },
    {
        id: "14", // Low Fat Milk Powder
        tags: ["milk", "powder", "low fat", "diet", "light", "reduced fat"],
        bestFor: ["weight loss", "low-fat diet", "calorie counting"],
        avoid: ["rich desserts"],
        keyBenefits: [
            "Reduced fat content",
            "Lower calories than regular",
            "Still creamy and delicious"
        ]
    },
    {
        id: "15", // Bulk Milk Powder
        tags: ["milk", "powder", "bulk", "5kg", "commercial", "restaurant", "wholesale"],
        bestFor: ["restaurants", "cafes", "bulk cooking", "commercial use"],
        avoid: ["home use", "small families"],
        keyBenefits: [
            "Commercial grade packaging",
            "Best value for bulk users",
            "Long-lasting supply"
        ]
    },
    {
        id: "16", // Instant Milk Mix
        tags: ["milk", "instant", "quick", "coffee", "tea", "creamer"],
        bestFor: ["coffee", "tea", "quick drinks", "office use"],
        avoid: ["cooking"],
        keyBenefits: [
            "Dissolves instantly",
            "Perfect for beverages",
            "No mixing required"
        ]
    },
    {
        id: "6", // Coconut Cream
        tags: ["cream", "liquid", "thick", "rich", "cooking", "curry", "coconut cream"],
        bestFor: ["thick curries", "desserts", "soups", "sauces"],
        avoid: ["light tea"],
        keyBenefits: [
            "Rich and velvety texture",
            "High fat content for creaminess",
            "Ready to use straight from can"
        ]
    },
    {
        id: "25", // Condensed Milk
        tags: ["milk", "condensed", "sweet", "thick", "dessert", "vegan"],
        bestFor: ["desserts", "sweet dishes", "vegan baking"],
        avoid: ["savory cooking"],
        keyBenefits: [
            "Sweet and thick consistency",
            "Perfect for vegan desserts",
            "No dairy needed"
        ]
    },
    {
        id: "26", // Whipping Cream
        tags: ["cream", "whipping", "high fat", "dessert", "topping"],
        bestFor: ["whipped cream", "dessert topping", "cakes"],
        avoid: ["cooking"],
        keyBenefits: [
            "Whips up perfectly",
            "Dairy-free alternative",
            "Stable and fluffy"
        ]
    },
    {
        id: "27", // Culinary Cream
        tags: ["cream", "cooking", "savory", "sauce", "culinary"],
        bestFor: ["sauces", "savory dishes", "pasta", "soups"],
        avoid: ["desserts"],
        keyBenefits: [
            "Designed for savory cooking",
            "Blends smoothly into sauces",
            "Professional quality"
        ]
    },
    {
        id: "28", // Light Cooking Cream
        tags: ["cream", "light", "low calorie", "cooking", "diet"],
        bestFor: ["light cooking", "diet recipes", "everyday use"],
        avoid: ["rich desserts"],
        keyBenefits: [
            "Lower calorie option",
            "Thinner consistency",
            "Healthier choice"
        ]
    },

    // --- CHIPS (Snacks) ---
    {
        id: "4", // Toasted Chips
        tags: ["chips", "toasted", "snack", "healthy", "crispy", "coconut chips"],
        bestFor: ["snacking", "healthy treat", "mid-day snack", "lunchbox"],
        avoid: ["cooking"],
        keyBenefits: [
            "Crispy and lightly toasted",
            "No artificial flavors",
            "High in fiber"
        ]
    },
    {
        id: "17", // Honey Glazed
        tags: ["chips", "honey", "sweet", "glazed", "snack", "dessert"],
        bestFor: ["sweet craving", "dessert topping", "kids", "yogurt topping"],
        avoid: ["low sugar diet"],
        keyBenefits: [
            "Natural sweetness from Sri Lankan honey",
            "Perfect crunchy texture",
            "Great energy booster"
        ]
    },
    {
        id: "18", // Spicy Chili
        tags: ["chips", "spicy", "chili", "hot", "snack", "savory"],
        bestFor: ["savory snack", "spicy lovers", "party snack"],
        avoid: ["kids", "sensitive stomach"],
        keyBenefits: [
            "Authentic Ceylon spice blend",
            "Exciting savory flavor",
            "No MSG"
        ]
    },
    {
        id: "19", // Chocolate Drip
        tags: ["chips", "chocolate", "dessert", "luxury", "sweet", "dark chocolate"],
        bestFor: ["dessert", "luxury snack", "gifts", "chocolate lovers"],
        avoid: ["diet", "vegan"],
        keyBenefits: [
            "Half-dipped in rich dark chocolate",
            "Luxurious treat",
            "Perfect gift option"
        ]
    },
    {
        id: "20", // Raw Chips
        tags: ["chips", "raw", "natural", "unprocessed", "healthy", "paleo"],
        bestFor: ["raw diet", "paleo", "health conscious", "natural snacking"],
        avoid: ["cooked food preference"],
        keyBenefits: [
            "Unprocessed and raw",
            "Retains maximum nutrients",
            "Low temperature dried"
        ]
    },

    // --- SWEETENERS ---
    {
        id: "5", // Coconut Sugar
        tags: ["sugar", "sweetener", "baking", "healthy sugar", "low-gi", "coconut sugar"],
        bestFor: ["coffee", "tea", "baking", "diabetics", "health conscious"],
        avoid: ["savory dishes"],
        keyBenefits: [
            "Lower glycemic index than regular sugar",
            "Natural caramel flavor",
            "Unrefined and natural"
        ]
    },
    {
        id: "21", // Premium Golden Sugar
        tags: ["sugar", "premium", "golden", "fine", "baking", "sweetener"],
        bestFor: ["fine baking", "premium desserts", "gifts"],
        avoid: ["budget cooking"],
        keyBenefits: [
            "Fine-grained texture",
            "Selected coconut blossoms",
            "Premium quality"
        ]
    },
    {
        id: "22", // Coconut Nectar Syrup
        tags: ["nectar", "syrup", "liquid sweetener", "honey alternative", "pancake syrup", "topping", "nectra"],
        bestFor: ["pancakes", "waffles", "oats", "ice cream", "drizzling"],
        avoid: ["high heat baking"],
        keyBenefits: [
            "Delicious natural caramel taste",
            "Perfect liquid consistency for drizzling",
            "100% natural coconut blossom nectar"
        ]
    },
    {
        id: "23", // Coarse Sugar
        tags: ["sugar", "coarse", "large granules", "baking", "topping"],
        bestFor: ["baking topping", "texture", "decoration"],
        avoid: ["beverages"],
        keyBenefits: [
            "Larger granules for texture",
            "Great for baking toppings",
            "Adds crunch"
        ]
    },
    {
        id: "24", // Budget Sugar Mix
        tags: ["sugar", "budget", "cheap", "affordable", "daily use", "economical"],
        bestFor: ["daily use", "budget cooking", "large families"],
        avoid: ["premium baking"],
        keyBenefits: [
            "Most affordable option",
            "Mixed blend for daily use",
            "Good value"
        ]
    },

    // --- BEAUTY ---
    {
        id: "7", // Body Soap
        tags: ["soap", "body", "beauty", "skincare", "natural", "handmade"],
        bestFor: ["daily bathing", "sensitive skin", "natural skincare"],
        avoid: ["face only"],
        keyBenefits: [
            "Handmade natural soap",
            "Moisturizes while cleansing",
            "Essential oils for fragrance"
        ]
    },
    {
        id: "29", // Charcoal Scrub
        tags: ["scrub", "charcoal", "exfoliate", "deep cleanse", "beauty", "body"],
        bestFor: ["deep cleansing", "exfoliation", "detox", "oily skin"],
        avoid: ["sensitive skin"],
        keyBenefits: [
            "Active charcoal for deep cleansing",
            "Crushed coconut shells for exfoliation",
            "Removes impurities"
        ]
    },
    {
        id: "30", // Lavender Lotion
        tags: ["lotion", "lavender", "moisturizer", "beauty", "body", "relaxing"],
        bestFor: ["dry skin", "body moisturizer", "relaxation", "bedtime"],
        avoid: ["oily skin"],
        keyBenefits: [
            "Soothing lavender scent",
            "Deep moisturization",
            "Calming and relaxing"
        ]
    },
    {
        id: "31", // Lip Balm
        tags: ["lip balm", "lips", "beauty", "moisturizer", "vitamin e", "lip care"],
        bestFor: ["dry lips", "chapped lips", "lip care", "winter"],
        avoid: ["body use"],
        keyBenefits: [
            "Natural lip hydration",
            "Vitamin E enriched",
            "3-pack value"
        ]
    },
    {
        id: "32", // Hair Repair Mask
        tags: ["hair", "mask", "treatment", "repair", "beauty", "conditioner", "damaged hair"],
        bestFor: ["damaged hair", "deep conditioning", "hair repair", "dry hair"],
        avoid: ["oily hair"],
        keyBenefits: [
            "Intense conditioning treatment",
            "Rich in coconut proteins",
            "Repairs damaged hair"
        ]
    },

    // --- BAKING ---
    {
        id: "8", // Desiccated Coconut
        tags: ["desiccated", "shredded", "baking", "cooking", "dried coconut"],
        bestFor: ["baking", "cooking", "decoration", "cakes"],
        avoid: ["snacking"],
        keyBenefits: [
            "Finely shredded",
            "Perfect for baking",
            "100% pure coconut"
        ]
    },
    {
        id: "33", // Sweet Shredded
        tags: ["shredded", "sweet", "baking", "decoration", "coconut"],
        bestFor: ["cake decoration", "sweet baking", "toppings"],
        avoid: ["savory cooking"],
        keyBenefits: [
            "Pre-sweetened",
            "Perfect for decoration",
            "Ready to use"
        ]
    },
    {
        id: "34", // Coconut Flour
        tags: ["flour", "gluten-free", "baking", "paleo", "keto", "healthy"],
        bestFor: ["gluten-free baking", "paleo diet", "keto diet", "healthy baking"],
        avoid: ["regular baking"],
        keyBenefits: [
            "100% gluten-free",
            "High in fiber",
            "Low carb option"
        ]
    },
    {
        id: "35", // Toasted Desiccated
        tags: ["desiccated", "toasted", "baking", "nutty flavor", "golden"],
        bestFor: ["baking", "topping", "flavor enhancement"],
        avoid: ["white cakes"],
        keyBenefits: [
            "Golden toasted color",
            "Extra nutty flavor",
            "Enhanced aroma"
        ]
    },
    {
        id: "36", // Macaroon Mix
        tags: ["macaroon", "mix", "baking", "ready-to-bake", "easy", "dessert"],
        bestFor: ["easy baking", "macaroons", "quick desserts"],
        avoid: ["from-scratch baking"],
        keyBenefits: [
            "Ready-to-bake convenience",
            "Perfect macaroons every time",
            "Just add water"
        ]
    }
];

module.exports = smartProducts;
