// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri =
      process.env.MONGODB_URI ||
      'mongodb://127.0.0.1:27017/product-api';     // ← force IPv4

    const conn = await mongoose.connect(uri /* no extra options needed */);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
