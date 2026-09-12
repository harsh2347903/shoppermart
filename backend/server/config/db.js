const mongoose = require('mongoose');

// This function connects our Express app to a MongoDB database.
// It is async because opening a network connection takes time and
// we want server.js to wait for it before accepting requests.
async function connectDB() {
  const rawUri = (process.env.MONGO_URI || '').trim();
  const uri = (rawUri.startsWith('mongodb://') || rawUri.startsWith('mongodb+srv://'))
    ? rawUri
    : 'mongodb://127.0.0.1:27017/db_shoppermart';

  try {
    // mongoose.connect() returns a promise that resolves once connected.
    await mongoose.connect(uri);
    console.log(`MongoDB connected: ${mongoose.connection.host}/${mongoose.connection.name}`);
  } catch (error) {
    // If the database is unreachable, there is no point starting the server.
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
