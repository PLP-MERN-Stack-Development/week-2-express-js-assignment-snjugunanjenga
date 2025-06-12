require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');

// Sample products data
const products = [
    // Electronics (20 products)
    {
        name: "iPhone 14 Pro",
        description: "Latest Apple smartphone with A16 Bionic chip and 48MP camera",
        price: 999.99,
        category: "electronics",
        inStock: true
    },
    {
        name: "Samsung Galaxy S23",
        description: "Premium Android smartphone with Snapdragon 8 Gen 2",
        price: 899.99,
        category: "electronics",
        inStock: true
    },
    {
        name: "MacBook Pro M2",
        description: "Powerful laptop with Apple Silicon chip",
        price: 1299.99,
        category: "electronics",
        inStock: true
    },
    {
        name: "Sony WH-1000XM5",
        description: "Premium noise-cancelling headphones",
        price: 399.99,
        category: "electronics",
        inStock: true
    },
    {
        name: "iPad Air",
        description: "Versatile tablet with M1 chip",
        price: 599.99,
        category: "electronics",
        inStock: true
    },
    {
        name: "Samsung 4K Smart TV",
        description: "55-inch 4K UHD Smart TV with HDR",
        price: 799.99,
        category: "electronics",
        inStock: true
    },
    {
        name: "Nintendo Switch OLED",
        description: "Handheld gaming console with OLED display",
        price: 349.99,
        category: "electronics",
        inStock: true
    },
    {
        name: "DJI Mini 3 Pro",
        description: "Compact drone with 4K camera",
        price: 699.99,
        category: "electronics",
        inStock: true
    },
    {
        name: "Apple Watch Series 8",
        description: "Advanced smartwatch with health features",
        price: 399.99,
        category: "electronics",
        inStock: true
    },
    {
        name: "Bose SoundLink Revolve",
        description: "Portable Bluetooth speaker with 360° sound",
        price: 199.99,
        category: "electronics",
        inStock: true
    },
    {
        name: "Logitech MX Master 3S",
        description: "Premium wireless mouse for productivity",
        price: 99.99,
        category: "electronics",
        inStock: true
    },
    {
        name: "Samsung Galaxy Watch 5",
        description: "Android smartwatch with health tracking",
        price: 279.99,
        category: "electronics",
        inStock: true
    },
    {
        name: "Sony PlayStation 5",
        description: "Next-gen gaming console with 4K support",
        price: 499.99,
        category: "electronics",
        inStock: false
    },
    {
        name: "Microsoft Surface Pro 9",
        description: "Versatile 2-in-1 laptop with Windows 11",
        price: 1099.99,
        category: "electronics",
        inStock: true
    },
    {
        name: "Google Pixel 7 Pro",
        description: "Android smartphone with advanced camera",
        price: 899.99,
        category: "electronics",
        inStock: true
    },
    {
        name: "Apple AirPods Pro 2",
        description: "Wireless earbuds with noise cancellation",
        price: 249.99,
        category: "electronics",
        inStock: true
    },
    {
        name: "Dell XPS 13",
        description: "Ultra-portable laptop with InfinityEdge display",
        price: 999.99,
        category: "electronics",
        inStock: true
    },
    {
        name: "Samsung Galaxy Buds2 Pro",
        description: "Wireless earbuds with active noise cancellation",
        price: 229.99,
        category: "electronics",
        inStock: true
    },
    {
        name: "LG OLED C2",
        description: "65-inch OLED TV with perfect blacks",
        price: 2499.99,
        category: "electronics",
        inStock: true
    },
    {
        name: "GoPro Hero 11",
        description: "Action camera with 5.3K video",
        price: 499.99,
        category: "electronics",
        inStock: true
    },

    // Sports (10 products)
    {
        name: "Nike Air Max 270",
        description: "Comfortable running shoes with Air cushioning",
        price: 150.00,
        category: "sports",
        inStock: true
    },
    {
        name: "Adidas Ultraboost 22",
        description: "Responsive running shoes with Boost technology",
        price: 180.00,
        category: "sports",
        inStock: true
    },
    {
        name: "Wilson Pro Staff Tennis Racket",
        description: "Professional tennis racket with perfect balance",
        price: 199.99,
        category: "sports",
        inStock: true
    },
    {
        name: "Yoga Mat Premium",
        description: "Non-slip yoga mat with alignment lines",
        price: 29.99,
        category: "sports",
        inStock: true
    },
    {
        name: "Fitbit Charge 5",
        description: "Advanced fitness tracker with ECG",
        price: 179.99,
        category: "sports",
        inStock: true
    },
    {
        name: "Basketball Official Size 7",
        description: "Professional basketball with deep channels",
        price: 49.99,
        category: "sports",
        inStock: true
    },
    {
        name: "Resistance Band Set",
        description: "Set of 5 resistance bands for strength training",
        price: 24.99,
        category: "sports",
        inStock: true
    },
    {
        name: "Garmin Forerunner 255",
        description: "GPS running watch with advanced metrics",
        price: 349.99,
        category: "sports",
        inStock: true
    },
    {
        name: "Dumbbell Set 20kg",
        description: "Adjustable dumbbell set for home workouts",
        price: 199.99,
        category: "sports",
        inStock: true
    },
    {
        name: "Swimming Goggles Pro",
        description: "Anti-fog swimming goggles with UV protection",
        price: 34.99,
        category: "sports",
        inStock: true
    },

    // Home (10 products)
    {
        name: "Smart LED Light Bulbs",
        description: "WiFi-enabled LED bulbs with voice control",
        price: 49.99,
        category: "home",
        inStock: true
    },
    {
        name: "Robot Vacuum Cleaner",
        description: "Smart vacuum with app control and mapping",
        price: 299.99,
        category: "home",
        inStock: true
    },
    {
        name: "Smart Door Lock",
        description: "Fingerprint and app-enabled door lock",
        price: 199.99,
        category: "home",
        inStock: true
    },
    {
        name: "Air Purifier HEPA",
        description: "HEPA air purifier for large rooms",
        price: 249.99,
        category: "home",
        inStock: true
    },
    {
        name: "Smart Thermostat",
        description: "WiFi thermostat with energy saving features",
        price: 129.99,
        category: "home",
        inStock: true
    },
    {
        name: "Security Camera System",
        description: "4K security cameras with night vision",
        price: 399.99,
        category: "home",
        inStock: true
    },
    {
        name: "Smart Speaker",
        description: "Voice-controlled speaker with premium sound",
        price: 99.99,
        category: "home",
        inStock: true
    },
    {
        name: "Smart Plug Set",
        description: "Set of 4 WiFi smart plugs",
        price: 39.99,
        category: "home",
        inStock: true
    },
    {
        name: "Smart Doorbell",
        description: "Video doorbell with two-way audio",
        price: 149.99,
        category: "home",
        inStock: true
    },
    {
        name: "Smart Blinds",
        description: "Automated window blinds with app control",
        price: 199.99,
        category: "home",
        inStock: true
    },

    // Furniture (10 products)
    {
        name: "Modern Sofa Set",
        description: "3-piece sofa set with premium fabric",
        price: 1299.99,
        category: "furniture",
        inStock: true
    },
    {
        name: "Ergonomic Office Chair",
        description: "Adjustable office chair with lumbar support",
        price: 299.99,
        category: "furniture",
        inStock: true
    },
    {
        name: "Dining Table Set",
        description: "6-seater dining table with chairs",
        price: 899.99,
        category: "furniture",
        inStock: true
    },
    {
        name: "Queen Size Bed Frame",
        description: "Modern bed frame with headboard",
        price: 499.99,
        category: "furniture",
        inStock: true
    },
    {
        name: "Bookshelf Unit",
        description: "5-shelf bookcase with adjustable shelves",
        price: 199.99,
        category: "furniture",
        inStock: true
    },
    {
        name: "Coffee Table",
        description: "Modern coffee table with storage",
        price: 249.99,
        category: "furniture",
        inStock: true
    },
    {
        name: "TV Stand",
        description: "Entertainment center with cable management",
        price: 299.99,
        category: "furniture",
        inStock: true
    },
    {
        name: "Accent Chair",
        description: "Comfortable accent chair with ottoman",
        price: 399.99,
        category: "furniture",
        inStock: true
    },
    {
        name: "Console Table",
        description: "Entryway console with mirror",
        price: 349.99,
        category: "furniture",
        inStock: true
    },
    {
        name: "Bar Stools Set",
        description: "Set of 4 modern bar stools",
        price: 299.99,
        category: "furniture",
        inStock: true
    }
];

// Function to seed the database
async function seedDatabase() {
    try {
        // Connect to MongoDB
        await connectDB();

        // Get the Product model
        const Product = require('./models/Product');

        // Clear existing products
        await Product.deleteMany({});
        console.log('Cleared existing products');

        // Insert new products
        await Product.insertMany(products);
        console.log('Successfully seeded database with products');

        // Log statistics
        const totalProducts = await Product.countDocuments();
        const categories = await Product.distinct('category');
        const categoryStats = await Promise.all(
            categories.map(async (category) => {
                const count = await Product.countDocuments({ category });
                return { category, count };
            })
        );

        console.log('\nDatabase Statistics:');
        console.log(`Total Products: ${totalProducts}`);
        console.log('\nProducts by Category:');
        categoryStats.forEach(({ category, count }) => {
            console.log(`${category}: ${count} products`);
        });

        // Close the database connection
        await mongoose.connection.close();
        console.log('\nDatabase connection closed');

    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

// Run the seed function
seedDatabase(); 