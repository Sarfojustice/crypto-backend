const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Crypto = require('./models/Crypto');

dotenv.config();

const cryptos = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 65000,
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    change24h: '+2.5'
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3500,
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    change24h: '+1.8'
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    price: 140,
    image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
    change24h: '-0.5'
  }
];

const seedDB = async () => {
  try {
    const DB = process.env.MONGODB_URI || 'mongodb://localhost:27017/coinbase_clone';
    await mongoose.connect(DB);
    await Crypto.deleteMany();
    await Crypto.insertMany(cryptos);
    console.log('Data seeded successfully!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
