const mongoose = require('mongoose');

const nftSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  priceUsdt: { type: Number, required: true },
  priceTon: { type: Number, required: true },
  weeklyPercent: { type: Number, required: true }, // e.g., 2.5
  imageUrl: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('NFT', nftSchema);
