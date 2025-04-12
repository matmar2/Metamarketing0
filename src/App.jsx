
// src/App.jsx
import React, { useState, useEffect } from 'react';
import './styles/App.css';
import WalletConnect from './components/WalletConnect';
import CoinValueDisplay from './components/CoinValueDisplay';
import CoinSwap from './components/CoinSwap';

function App() {
  const [activePage, setActivePage] = useState('wallets');

  useEffect(() => {
    // Check for wallet extensions on app load
    const checkWalletExtensions = () => {
      const walletExtensions = {
        ethereum: window.ethereum !== undefined,
        tronWeb: window.tronWeb !== undefined,
        solana: window.solana !== undefined
      };
      
      console.log('Available wallet extensions:', walletExtensions);
    };
    
    checkWalletExtensions();
  }, []);

  return (
    <div className="app">
      {/* Simple navigation bar */}
      <div style={{
        backgroundColor: '#6c5ce7',
        color: 'white',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>CryptoConnect</div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            onClick={() => setActivePage('wallets')}
            style={{
              background: activePage === 'wallets' ? '#a29bfe' : 'transparent',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Wallets
          </button>
          <button 
            onClick={() => setActivePage('prices')}
            style={{
              background: activePage === 'prices' ? '#a29bfe' : 'transparent',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Prices
          </button>
          <button 
            onClick={() => setActivePage('swap')}
            style={{
              background: activePage === 'swap' ? '#a29bfe' : 'transparent',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Swap
          </button>
        </div>
      </div>
      
      <main className="main-content">
        {activePage === 'wallets' && <WalletConnect />}
        {activePage === 'prices' && <CoinValueDisplay />}
        {activePage === 'swap' && <CoinSwap />}
      </main>
      
      <footer style={{
        backgroundColor: '#6c5ce7',
        color: 'white',
        padding: '1rem',
        textAlign: 'center',
        marginTop: 'auto'
      }}>
        <p>CryptoConnect — Cryptocurrency Wallet Integration Demo</p>
      </footer>
    </div>
  );
}

export default App;