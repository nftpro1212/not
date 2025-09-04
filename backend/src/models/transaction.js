const mongoose = require('mongoose');

const txSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['deposit','withdraw','nft_buy','reward'], required: true },
  amount: { type: Number, required: true },
  currency: { type: String, enum: ['TON','USDT'], required: true },
  status: { type: String, enum: ['pending','success','failed'], default: 'pending' },
  meta: { type: Object },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', txSchema);
