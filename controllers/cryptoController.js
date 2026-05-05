// In-memory mock database
const cryptos = [
  {
    id: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 65000,
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    change24h: '+2.5',
    createdAt: new Date()
  },
  {
    id: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3500,
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    change24h: '+1.8',
    createdAt: new Date()
  },
  {
    id: 3,
    name: 'Solana',
    symbol: 'SOL',
    price: 140,
    image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
    change24h: '-0.5',
    createdAt: new Date()
  }
];

exports.getAllCrypto = async (req, res) => {
  res.status(200).json({
    status: 'success',
    results: cryptos.length,
    data: { cryptos },
  });
};

exports.getGainers = async (req, res) => {
  const sorted = [...cryptos].sort((a, b) => parseFloat(b.change24h) - parseFloat(a.change24h));
  res.status(200).json({
    status: 'success',
    results: sorted.length,
    data: { cryptos: sorted },
  });
};

exports.getNewListings = async (req, res) => {
  const sorted = [...cryptos].sort((a, b) => b.createdAt - a.createdAt);
  res.status(200).json({
    status: 'success',
    results: sorted.length,
    data: { cryptos: sorted },
  });
};

exports.createCrypto = async (req, res) => {
  const newCrypto = {
    id: cryptos.length + 1,
    ...req.body,
    createdAt: new Date()
  };
  cryptos.push(newCrypto);
  res.status(201).json({
    status: 'success',
    data: { crypto: newCrypto },
  });
};
