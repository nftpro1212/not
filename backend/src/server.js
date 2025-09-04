require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cron = require('node-cron');

const connectDB = require('./config/db');
const seedIfNeeded = require('./seed');
const weeklyRewards = require('./cron/weeklyRewards');

// Routers
const authRoutes = require('./routes/auth');
const nftRoutes = require('./routes/nft');
const paymentRoutes = require('./routes/payment');
const rewardsRoutes = require('./routes/rewards');

// Telegram bot (agar kerak bo‘lsa)
const telegramBot = require('./telegram/bot');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/nft', nftRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/rewards', rewardsRoutes);

// Health check
app.get('/', (_, res) => res.send('NFT + TON Backend running 🚀'));

// Start server
const startServer = async () => {
  try {
    await connectDB(); // MongoDB ga ulanish
    console.log("✅ MongoDB connected");

    // Seed initial NFTs
    await seedIfNeeded();

    // Weekly rewards cron — har dushanba 00:00 UTC
    cron.schedule('0 0 * * 1', async () => {
      console.log('⏰ Running weekly rewards...');
      try {
        await weeklyRewards();
      } catch (err) {
        console.error('❌ Weekly rewards error:', err);
      }
    });

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`🚀 Backend listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();
