const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');
const User = require('../models/user');
const auth = require('../utils/authMiddleware');

// POST /api/payment/create-deposit
// body: { userId, amountTon }
// returns deposit invoice (address + amount) — custodial flow
router.post('/create-deposit', async (req, res) => {
  try {
    const { userId, amountTon } = req.body;
    if (!userId || !amountTon) return res.status(400).json({ error: 'userId and amountTon required' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const address = process.env.CUSTODIAL_TON_ADDR || 'EQD...EXAMPLE';

    const tx = new Transaction({ userId: user._id, type: 'deposit', amount: amountTon, currency: 'TON', status: 'pending', meta: { address } });
    await tx.save();

    res.json({ invoice: { address, amountTon, txId: tx._id } });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/payment/verify
// body: { userId, amountTon, txHash } -> admin or webhook should call this after verifying on-chain
router.post('/verify', async (req, res) => {
  try {
    const { userId, amountTon, txHash } = req.body;
    if (!userId || !amountTon || !txHash) return res.status(400).json({ error: 'userId, amountTon, txHash required' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // NOTE: In production — verify txHash on TON chain: destination address, amount and confirmations
    user.balanceTon = (user.balanceTon || 0) + parseFloat(amountTon);
    await user.save();

    const tx = new Transaction({ userId: user._id, type: 'deposit', amount: amountTon, currency: 'TON', status: 'success', meta: { txHash } });
    await tx.save();

    res.json({ ok: true, balanceTon: user.balanceTon });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
