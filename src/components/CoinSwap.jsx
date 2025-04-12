
// src/components/CoinSwap.jsx
import React, { useState, useEffect } from 'react';
import { fetchCoinPrices, getSwapRate } from '../utils/api';

const CoinSwap = () => {
  const [coins, setCoins] = useState([]);
  const [fromCoin, setFromCoin] = useState('');
  const [toCoin, setToCoin] = useState('');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [swapping, setSwapping] = useState(false);

  useEffect(() => {
    const loadCoins = async () => {
      try {
        const coinData = await fetchCoinPrices();
        setCoins(coinData);
        
        // Set default selections
        if (coinData.length >= 2) {
          setFromCoin(coinData[0].id);
          setToCoin(coinData[1].id);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading coins:', error);
        setLoading(false);
      }
    };
    
    loadCoins();
  }, []);

  useEffect(() => {
    // Update rate when either coin changes
    if (fromCoin && toCoin) {
      updateRate();
    }
  }, [fromCoin, toCoin]);

  const updateRate = async () => {
    if (fromCoin && toCoin) {
      const newRate = await getSwapRate(fromCoin, toCoin);
      setRate(newRate);
      
      // Update the to amount based on the new rate
      if (fromAmount) {
        setToAmount((parseFloat(fromAmount) * newRate).toFixed(6));
      }
    }
  };

  const handleFromAmountChange = (e) => {
    const value = e.target.value;
    setFromAmount(value);
    
    if (value && rate) {
      setToAmount((parseFloat(value) * rate).toFixed(6));
    } else {
      setToAmount('');
    }
  };

  const handleToAmountChange = (e) => {
    const value = e.target.value;
    setToAmount(value);
    
    if (value && rate) {
      setFromAmount((parseFloat(value) / rate).toFixed(6));
    } else {
      setFromAmount('');
    }
  };

  const handleSwapCoins = () => {
    const temp = fromCoin;
    setFromCoin(toCoin);
    setToCoin(temp);
    
    const tempAmount = fromAmount;
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  const executeSwap = async () => {
    if (!fromCoin || !toCoin || !fromAmount || !toAmount) {
      return;
    }
    
    setSwapping(true);
    
    try {
      // In a real app, this would call a smart contract or DEX API
      // For this demo, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset the form
      setFromAmount('');
      setToAmount('');
      alert(`Swap successful! Exchanged ${fromAmount} ${fromCoin} for ${toAmount} ${toCoin}`);
    } catch (error) {
      console.error('Swap failed:', error);
      alert('Swap failed. Please try again.');
    } finally {
      setSwapping(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading swap interface...</div>;
  }

  const fromCoinData = coins.find(c => c.id === fromCoin);
  const toCoinData = coins.find(c => c.id === toCoin);

  return (
    <div className="swap-container">
      <h2>Swap Cryptocurrencies</h2>
      
      <div className="swap-card">
        <div className="swap-input-container">
          <div className="swap-input">
            <label>From</label>
            <div className="input-with-select">
              <input
                type="number"
                placeholder="0.0"
                value={fromAmount}
                onChange={handleFromAmountChange}
                min="0"
                step="0.000001"
              />
              <select
                value={fromCoin}
                onChange={(e) => setFromCoin(e.target.value)}
              >
                {coins.map((coin) => (
                  <option key={coin.id} value={coin.id}>
                    {coin.symbol.toUpperCase()} - {coin.name}
                  </option>
                ))}
              </select>
            </div>
            {fromCoinData && (
              <div className="coin-balance">
                <img src={fromCoinData.image} alt={fromCoinData.name} className="coin-icon-small" />
                <span>1 {fromCoinData.symbol.toUpperCase()} = ${fromCoinData.current_price.toFixed(2)}</span>
              </div>
            )}
          </div>
          
          <button className="swap-direction-btn" onClick={handleSwapCoins}>
            ↑↓
          </button>
          
          <div className="swap-input">
            <label>To</label>
            <div className="input-with-select">
              <input
                type="number"
                placeholder="0.0"
                value={toAmount}
                onChange={handleToAmountChange}
                min="0"
                step="0.000001"
              />
              <select
                value={toCoin}
                onChange={(e) => setToCoin(e.target.value)}
              >
                {coins.map((coin) => (
                  <option key={coin.id} value={coin.id}>
                    {coin.symbol.toUpperCase()} - {coin.name}
                  </option>
                ))}
              </select>
            </div>
            {toCoinData && (
              <div className="coin-balance">
                <img src={toCoinData.image} alt={toCoinData.name} className="coin-icon-small" />
                <span>1 {toCoinData.symbol.toUpperCase()} = ${toCoinData.current_price.toFixed(2)}</span>
              </div>
            )}
          </div>
        </div>
        
        {rate && fromCoin && toCoin && (
          <div className="exchange-rate">
            <p>Exchange Rate: 1 {fromCoinData?.symbol.toUpperCase()} = {rate} {toCoinData?.symbol.toUpperCase()}</p>
          </div>
        )}
        
        <button
          className="swap-btn"
          onClick={executeSwap}
          disabled={!fromAmount || !toAmount || swapping}
        >
          {swapping ? 'Processing...' : 'Swap'}
        </button>
      </div>
    </div>
  );
};

export default CoinSwap;
