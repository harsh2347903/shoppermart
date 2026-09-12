const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');
const { products } = require('../data/products.json');

const users = [
  { name: 'Admin', email: 'admin@test.in', password: 'Admin123!', role: 'admin' },
  { name: 'Demo user', email: 'user@test.in', password: 'user123!', role: 'user' }
];

async function autoSeedIfEmpty() {
  try {
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log('Database is empty. Automatically seeding initial products and demo accounts...');
      for (const user of users) {
        await User.create(user).catch(() => {});
      }
      await Product.insertMany(products.map(({ id, ...product }) => ({ sourceId: id, ...product })));
      console.log(`Auto-seeded ${products.length} products and demo accounts.`);
    }
  } catch (err) {
    console.warn('Auto-seed check failed:', err.message);
  }
}

// This function connects our Express app to a MongoDB database.
async function connectDB() {
  let rawUri = (process.env.MONGO_URI || '').trim();
  // Strip surrounding quotes if accidentally included in environment variables
  rawUri = rawUri.replace(/^["']|["']$/g, '');

  const isCloud = Boolean(process.env.RENDER || process.env.NODE_ENV === 'production');

  if (!rawUri && isCloud) {
    console.warn(
      '\n[MongoDB WARNING] MONGO_URI environment variable is not defined on Render!\n' +
      'Please add MONGO_URI in your Render Dashboard -> Environment -> Environment Variables.\n' +
      'Example: mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/db_shoppermart?retryWrites=true&w=majority\n'
    );
  }

  const uri = (rawUri.startsWith('mongodb://') || rawUri.startsWith('mongodb+srv://'))
    ? rawUri
    : 'mongodb://127.0.0.1:27017/db_shoppermart';

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of default 30s
    });
    console.log(`MongoDB connected: ${mongoose.connection.host}/${mongoose.connection.name}`);
    await autoSeedIfEmpty();
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    if (isCloud) {
      console.error(
        '[MongoDB Advice] In cloud deployments (Render):\n' +
        '1. Ensure MONGO_URI is set in Render Environment Variables.\n' +
        '2. Ensure MongoDB Atlas Network Access allows 0.0.0.0/0 (anywhere).\n' +
        '3. Verify your Atlas username and password in the connection string.\n'
      );
    }
    // Do NOT call process.exit(1) so the web service stays alive for Render health checks.
    // Retry connecting after 10 seconds.
    setTimeout(connectDB, 10000);
  }
}

module.exports = connectDB;

