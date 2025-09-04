const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');
const auth = require('../utils/authMiddleware');

// GET /api/rewards/history
router.get('/history', auth, async (req, res) => {
  try {
    const txs = await Transaction.find({ userId: req.user.id, type: 'reward' }).sort({ createdAt: -1 }).limit(100);
    res.json(txs);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
