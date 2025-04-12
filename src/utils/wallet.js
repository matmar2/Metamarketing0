// src/utils/wallet.js
export const connectMetaMask = async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      return { 
        success: true, 
        address: accounts[0],
        wallet: 'MetaMask',
        chainId: await window.ethereum.request({ method: 'eth_chainId' })
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  } else {
    return { success: false, error: 'MetaMask is not installed' };
  }
};

export const connectTronLink = async () => {
  if (window.tronWeb && window.tronWeb.ready) {
    try {
      const address = window.tronWeb.defaultAddress.base58;
      if (address) {
        return { 
          success: true, 
          address,
          wallet: 'TronLink',
          network: window.tronWeb.fullNode.host
        };
      } else {
        return { success: false, error: 'Please unlock TronLink' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  } else {
    return { success: false, error: 'TronLink is not installed' };
  }
};

export const connectSolana = async () => {
  if (window.solana && window.solana.isPhantom) {
    try {
      const response = await window.solana.connect();
      return {
        success: true,
        address: response.publicKey.toString(),
        wallet: 'Phantom',
        network: window.solana.networkVersion
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  } else {
    return { success: false, error: 'Phantom wallet is not installed' };
  }
};