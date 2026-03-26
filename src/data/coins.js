// src/data/coins.js
// A static list of cryptocurrency data for our app
// In a real app, you'd fetch this from an API like CoinGecko

const COINS = [
  {
    id: '1',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 67420.50,
    change: 2.34,    // % change in 24h (positive = green, negative = red)
    icon: '₿',
  },
  {
    id: '2',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3512.80,
    change: -1.12,
    icon: 'Ξ',
  },
  {
    id: '3',
    name: 'Solana',
    symbol: 'SOL',
    price: 185.40,
    change: 5.67,
    icon: '◎',
  },
  {
    id: '4',
    name: 'Cardano',
    symbol: 'ADA',
    price: 0.612,
    change: -0.88,
    icon: '₳',
  },
  {
    id: '5',
    name: 'Ripple',
    symbol: 'XRP',
    price: 0.587,
    change: 1.20,
    icon: '✕',
  },
  {
    id: '6',
    name: 'Dogecoin',
    symbol: 'DOGE',
    price: 0.1423,
    change: 8.90,
    icon: 'Ð',
  },
  {
    id: '7',
    name: 'Polkadot',
    symbol: 'DOT',
    price: 9.14,
    change: -3.21,
    icon: '●',
  },
  {
    id: '8',
    name: 'Avalanche',
    symbol: 'AVAX',
    price: 38.72,
    change: 4.15,
    icon: '△',
  },
  {
    id: '9',
    name: 'Chainlink',
    symbol: 'LINK',
    price: 14.88,
    change: -0.45,
    icon: '⬡',
  },
  {
    id: '10',
    name: 'Litecoin',
    symbol: 'LTC',
    price: 83.20,
    change: 1.78,
    icon: 'Ł',
  },
];

export default COINS;
