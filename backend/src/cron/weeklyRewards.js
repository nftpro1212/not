const UserNft = require('../models/userNft');
const NFT = require('../models/nft');
const User = require('../models/user');
const Transaction = require('../models/transaction');

module.exports = async function weeklyRewards() {
  // For each userNft record, calculate reward based on NFT.weeklyPercent and nft.priceUsdt
  const holdings = await UserNft.find().populate('nftId userId');
  for (const h of holdings) {
    try {
      const nft = h.nftId;
      const user = h.userId;
      if (!nft || !user) continue;

      const percent = parseFloat(nft.weeklyPercent || 0);
      const base = parseFloat(nft.priceUsdt || 0);
      const reward = (base * percent) / 100.0;

      if (reward <= 0) continue;

      // Credit reward to user's USDT balance (you can change to TON if desired)
      user.balanceUsdt = (parseFloat(user.balanceUsdt || 0) + reward);
      await user.save();

      // Save transaction
      await Transaction.create({
        userId: user._id,
        type: 'reward',
        amount: reward,
        currency: 'USDT',
        status: 'success',
        meta: { nftId: nft._id, nftName: nft.name, weeklyPercent: percent }
      });

      // update lastRewardDate
      h.lastRewardDate = new Date();
      await h.save();
    } catch (e) {
      console.error('weeklyRewards item error:', e);
    }
  }
};
