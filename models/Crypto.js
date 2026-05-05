const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a cryptocurrency name'],
  },
  symbol: {
    type: String,
    required: [true, 'Please provide a symbol'],
    uppercase: true,
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
  },
  image: {
    type: String,
    required: [true, 'Please provide an image URL'],
  },
  change24h: {
    type: String,
    required: [true, 'Please provide a 24h change percentage'],
  },
}, { timestamps: true });

const Crypto = mongoose.model('Crypto', cryptoSchema);
module.exports = Crypto;
