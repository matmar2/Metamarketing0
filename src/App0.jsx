
// src/App.jsx
import React, { useState, useEffect } from 'react';
import './styles/App.css';
import Navbar from './components/Navbar';
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
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      
      <main className="main-content">
        {activePage === 'wallets' && <WalletConnect />}
        {activePage === 'prices' && <CoinValueDisplay />}
        {activePage === 'swap' && <CoinSwap />}
      </main>
      
      <footer className="footer">
        <p>CryptoConnect — Cryptocurrency Wallet Integration Demo</p>
      </footer>
    </div>
  );
}

export default App;
