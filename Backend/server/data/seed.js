// Run with `npm run seed`. It imports the original React data shape into Atlas.
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');
const Product = require('../models/Product');
const { products } = require('./products.json');
const users = [
  { name: 'Admin', email: 'admin@test.in', password: 'Admin123!', role: 'admin' },
  { name: 'Demo user', email: 'user@test.in', password: 'user123!', role: 'user' }
];
async function seed() {
  await connectDB(); await User.deleteMany({}); await Product.deleteMany({});
  for (const user of users) await User.create(user); // runs bcrypt hook
  // Rename only id: MongoDB reserves _id; all other fields are identical.
  await Product.insertMany(products.map(({ id, ...product }) => ({ sourceId: id, ...product })));
  console.log(`Imported ${products.length} products. Admin: admin@test.in / Admin123!`);
  await mongoose.disconnect();
}
seed().catch(error => { console.error('Seeding failed:', error.message); process.exit(1); });
