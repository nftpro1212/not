const mongoose = require('mongoose');

const userNftSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  nftId: { type: mongoose.Schema.Types.ObjectId, ref: 'NFT', required: true },
  buyDate: { type: Date, default: Date.now },
  lastRewardDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserNft', userNftSchema);
