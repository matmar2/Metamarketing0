// src/components/CoinValueDisplay.jsx
import React, { useState, useEffect } from 'react';
import { fetchCoinPrices } from '../utils/api';

const CoinValueDisplay = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCoins = async () => {
      try {
        setLoading(true);
        const coinData = await fetchCoinPrices();
        setCoins(coinData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch coin data');
        setLoading(false);
      }
    };

    getCoins();
    // Refresh prices every 60 seconds
    const intervalId = setInterval(getCoins, 60000);
    
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <div className="loading">Loading crypto prices...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="coin-value-display">
      <h2>Cryptocurrency Prices</h2>
      <div className="coin-list">
        <div className="coin-header">
          <span className="coin-rank">#</span>
          <span className="coin-name">Name</span>
          <span className="coin-price">Price</span>
          <span className="coin-change">24h Change</span>
          <span className="coin-market-cap">Market Cap</span>
        </div>
        
        {coins.map((coin) => (
          <div className="coin-item" key={coin.id}>
            <span className="coin-rank">{coin.market_cap_rank}</span>
            <span className="coin-name">
              <img src={coin.image} alt={coin.name} className="coin-icon" />
              {coin.name} ({coin.symbol.toUpperCase()})
            </span>
            <span className="coin-price">${coin.current_price.toLocaleString()}</span>
            <span className={`coin-change ${coin.price_change_percentage_24h > 0 ? 'positive' : 'negative'}`}>
              {coin.price_change_percentage_24h.toFixed(2)}%
            </span>
            <span className="coin-market-cap">${coin.market_cap.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoinValueDisplay;
