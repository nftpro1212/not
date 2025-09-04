const mongoose = require('mongoose');

async function connectDB() {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      console.error('MONGO_URI not set in .env');
      process.exit(1);
    }
    await mongoose.connect(uri, {
      dbName: process.env.DB_NAME || 'Cluster0'
      // note: modern mongoose no longer needs useNewUrlParser/useUnifiedTopology options
    });
    console.log('✅ MongoDB Atlas connected');
  } catch (err) {
    console.error('❌ MongoDB Atlas connection error:', err);
    process.exit(1);
  }
}

module.exports = connectDB;
