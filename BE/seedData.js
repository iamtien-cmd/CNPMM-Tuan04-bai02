const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');
require('dotenv').config();

const products = [
  {
    name: 'iPhone 15 Pro',
    description: 'Latest iPhone with A17 Pro chip and titanium design',
    price: 999.99,
    category: 'Electronics',
    stock: 50,
    image: 'https://example.com/iphone15.jpg',
    isActive: true
  },
  {
    name: 'MacBook Air M2',
    description: 'Powerful laptop with M2 chip and all-day battery life',
    price: 1199.99,
    category: 'Electronics',
    stock: 30,
    image: 'https://example.com/macbook.jpg',
    isActive: true
  },
  {
    name: 'AirPods Pro (2nd Gen)',
    description: 'Active noise cancellation and spatial audio',
    price: 249.99,
    category: 'Electronics',
    stock: 100,
    image: 'https://example.com/airpods.jpg',
    isActive: true
  },
  {
    name: 'iPad Pro 12.9"',
    description: 'Most advanced iPad with M2 chip and Liquid Retina XDR display',
    price: 1099.99,
    category: 'Electronics',
    stock: 25,
    image: 'https://example.com/ipad.jpg',
    isActive: true
  },
  {
    name: 'Apple Watch Series 9',
    description: 'Advanced health monitoring and fitness tracking',
    price: 399.99,
    category: 'Electronics',
    stock: 75,
    image: 'https://example.com/watch.jpg',
    isActive: true
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Premium Android phone with S Pen and AI features',
    price: 1199.99,
    category: 'Electronics',
    stock: 40,
    image: 'https://example.com/galaxy.jpg',
    isActive: true
  },
  {
    name: 'Dell XPS 13',
    description: 'Compact laptop with Intel Core i7 and stunning display',
    price: 999.99,
    category: 'Electronics',
    stock: 35,
    image: 'https://example.com/dell.jpg',
    isActive: true
  },
  {
    name: 'Sony WH-1000XM5',
    description: 'Industry-leading noise canceling headphones',
    price: 399.99,
    category: 'Electronics',
    stock: 60,
    image: 'https://example.com/sony.jpg',
    isActive: true
  },
  {
    name: 'Nintendo Switch OLED',
    description: 'Gaming console with vivid OLED screen',
    price: 349.99,
    category: 'Electronics',
    stock: 80,
    image: 'https://example.com/switch.jpg',
    isActive: true
  },
  {
    name: 'Logitech MX Master 3S',
    description: 'Advanced wireless mouse for productivity',
    price: 99.99,
    category: 'Electronics',
    stock: 120,
    image: 'https://example.com/mouse.jpg',
    isActive: true
  }
];

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shopping-cart');
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    console.log('🗑️ Cleared existing products');

    // Insert new products
    const createdProducts = await Product.insertMany(products);
    console.log(`📦 Created ${createdProducts.length} products`);

    // Create or update demo user
    const existingUser = await User.findOne({ email: 'demo@example.com' });
    if (existingUser) {
      console.log('👤 Demo user already exists');
    } else {
      const demoUser = new User({
        name: 'Demo User',
        email: 'demo@example.com',
        password: '1234567890'
      });
      await demoUser.save();
      console.log('👤 Created demo user');
    }

    console.log('\n🎉 Database seeded successfully!');
    console.log('📧 Demo user: demo@example.com');
    console.log('🔑 Password: 1234567890');
    console.log('\n📋 Products created:');
    createdProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - $${product.price}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();