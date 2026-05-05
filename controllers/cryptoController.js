const Crypto = require('../models/Crypto');

exports.getAllCrypto = async (req, res) => {
  try {
    const cryptos = await Crypto.find();
    res.status(200).json({
      status: 'success',
      results: cryptos.length,
      data: { cryptos },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.getGainers = async (req, res) => {
  try {
    const cryptos = await Crypto.find().sort('-change24h').limit(10);
    res.status(200).json({
      status: 'success',
      results: cryptos.length,
      data: { cryptos },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.getNewListings = async (req, res) => {
  try {
    const cryptos = await Crypto.find().sort('-createdAt').limit(10);
    res.status(200).json({
      status: 'success',
      results: cryptos.length,
      data: { cryptos },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.createCrypto = async (req, res) => {
  try {
    const newCrypto = await Crypto.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { crypto: newCrypto },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};
