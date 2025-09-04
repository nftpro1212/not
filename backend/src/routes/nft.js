const express = require('express');
const router = express.Router();
const NFT = require('../models/nft');
const User = require('../models/user');
const UserNft = require('../models/userNft');
const Transaction = require('../models/transaction');
const auth = require('../utils/authMiddleware');

// GET /api/nft - list
router.get('/', async (req, res) => {
  const list = await NFT.find().sort({ priceUsdt: 1 });
  res.json(list);
});

// POST /api/nft (admin) - create new NFT
router.post('/', async (req, res) => {
  try {
    const nft = new NFT(req.body);
    await nft.save();
    res.json(nft);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// POST /api/nft/buy - buy NFT using TON or USDT from user's internal balance
// body: { nftId, currency } currency = 'TON' or 'USDT'
router.post('/buy', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const { nftId, currency } = req.body;
    const nft = await NFT.findById(nftId);
    if (!nft) return res.status(404).json({ error: 'NFT not found' });

    const price = currency === 'TON' ? nft.priceTon : nft.priceUsdt;

    if (currency === 'TON') {
      if (user.balanceTon < price) return res.status(400).json({ error: 'Insufficient TON' });
      user.balanceTon -= price;
    } else {
      if (user.balanceUsdt < price) return res.status(400).json({ error: 'Insufficient USDT' });
      user.balanceUsdt -= price;
    }
    await user.save();

    // record ownership
    const userNft = new UserNft({ userId: user._id, nftId: nft._id, buyDate: new Date(), lastRewardDate: new Date() });
    await userNft.save();

    // transaction
    const tx = new Transaction({ userId: user._id, type: 'nft_buy', amount: price, currency, status: 'success', meta: { nftId: nft._id } });
    await tx.save();

    res.json({ ok: true, user, userNft, tx });
  } catch (e) {
    console.error('Buy error', e);
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
