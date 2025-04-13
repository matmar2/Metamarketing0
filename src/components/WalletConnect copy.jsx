// src/components/WalletConnect.jsx
import React, { useState, useEffect } from 'react';
import { connectMetaMask, connectTronLink, connectSolana } from '../utils/wallet';

const WalletConnect = () => {
  const [connectedWallets, setConnectedWallets] = useState({
    metamask: null,
    tronlink: null,
    solana: null
  });

  useEffect(() => {
    // Check if wallets are already connected on component mount
    checkWalletConnections();
  }, []);

  const checkWalletConnections = async () => {
    // Auto-connect to wallets if they're already authorized
    if (window.ethereum && window.ethereum.selectedAddress) {
      handleConnectMetaMask();
    }
    
    if (window.tronWeb && window.tronWeb.ready) {
      handleConnectTronLink();
    }
    
    if (window.solana && window.solana.isConnected) {
      handleConnectSolana();
    }
  };

  const handleConnectMetaMask = async () => {
    const result = await connectMetaMask();
    if (result.success) {
      setConnectedWallets(prev => ({ ...prev, metamask: result }));
    } else {
      console.error(result.error);
    }
  };

  const handleConnectTronLink = async () => {
    const result = await connectTronLink();
    if (result.success) {
      setConnectedWallets(prev => ({ ...prev, tronlink: result }));
    } else {
      console.error(result.error);
    }
  };

  const handleConnectSolana = async () => {
    const result = await connectSolana();
    if (result.success) {
      setConnectedWallets(prev => ({ ...prev, solana: result }));
    } else {
      console.error(result.error);
    }
  };

  const renderWalletStatus = (wallet, data) => {
    if (!data) {
      return (
        <div className="wallet-status not-connected">
          <p>Not connected</p>
        </div>
      );
    }
    
    return (
      <div className="wallet-status connected">
        <p>Connected: {data.address.substring(0, 6)}...{data.address.substring(data.address.length - 4)}</p>
      </div>
    );
  };

  return (
    <div className="wallet-connect-container">
      <h2>Connect Your Wallets</h2>
      
      <div className="wallet-cards">
        <div className="wallet-card">
          <h3>MetaMask (Ethereum)</h3>
          {renderWalletStatus('metamask', connectedWallets.metamask)}
          <button 
            onClick={handleConnectMetaMask}
            disabled={connectedWallets.metamask !== null}
            className="connect-btn"
          >
            {connectedWallets.metamask ? 'Connected' : 'Connect MetaMask'}
          </button>
        </div>
        
        <div className="wallet-card">
          <h3>TronLink (Tron)</h3>
          {renderWalletStatus('tronlink', connectedWallets.tronlink)}
          <button 
            onClick={handleConnectTronLink}
            disabled={connectedWallets.tronlink !== null}
            className="connect-btn"
          >
            {connectedWallets.tronlink ? 'Connected' : 'Connect TronLink'}
          </button>
        </div>
        
        <div className="wallet-card">
          <h3>Phantom (Solana)</h3>
          {renderWalletStatus('solana', connectedWallets.solana)}
          <button 
            onClick={handleConnectSolana}
            disabled={connectedWallets.solana !== null}
            className="connect-btn"
          >
            {connectedWallets.solana ? 'Connected' : 'Connect Phantom'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletConnect;
