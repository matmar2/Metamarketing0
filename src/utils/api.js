// src/utils/api.js
export const fetchCoinPrices = async () => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=false');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching coin data:', error);
    return [];
  }
};

export const getSwapRate = async (fromCoin, toCoin) => {
  try {
    // In a real app, this would connect to a DEX API or liquidity pool
    // Using mock data for demonstration
    const mockRates = {
      'bitcoin-ethereum': 13.5,
      'ethereum-bitcoin': 0.074,
      'bitcoin-solana': 350,
      'ethereum-solana': 26,
      'solana-ethereum': 0.038,
      'solana-bitcoin': 0.0028,
      // Add more pairs as needed
    };
    
    const rate = mockRates[`${fromCoin}-${toCoin}`] || 1;
    return rate;
  } catch (error) {
    console.error('Error getting swap rate:', error);
    return 1; // Default fallback rate
  }
};