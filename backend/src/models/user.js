const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  telegramId: { type: String, required: true, unique: true },
  username: String,
  firstName: String,
  lastName: String,
  balanceTon: { type: Number, default: 0 },
  balanceUsdt: { type: Number, default: 0 },
  createdAt: Date,
  lastLogin: Date
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
