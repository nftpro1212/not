const NFT = require('./models/nft');

async function seed() {
  try {
    const count = await NFT.countDocuments();
    if (count === 0) {
      await NFT.insertMany([
        { name: 'Bronze A', category: 'Bronze', priceUsdt: 10, priceTon: 0.2, weeklyPercent: 1.0, imageUrl: '' },
        { name: 'Bronze B', category: 'Bronze', priceUsdt: 20, priceTon: 0.4, weeklyPercent: 1.2, imageUrl: '' },
        { name: 'Silver',   category: 'Silver', priceUsdt: 100, priceTon: 2, weeklyPercent: 2.5, imageUrl: '' },
        { name: 'Gold',     category: 'Gold', priceUsdt: 1000, priceTon: 20, weeklyPercent: 5.0, imageUrl: '' },
        { name: 'Diamond',  category: 'Diamond', priceUsdt: 5000, priceTon: 100, weeklyPercent: 7.0, imageUrl: '' }
      ]);
      console.log('✅ NFTs seeded');
    } else {
      console.log('NFTs already exist:', count);
    }
  } catch (e) {
    console.error('Seed error:', e);
  }
}

module.exports = seed;
