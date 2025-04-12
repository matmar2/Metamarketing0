
// src/components/Navbar.jsx
import React from 'react';

const Navbar = ({ activePage, setActivePage }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">CryptoConnect</div>
      <ul className="navbar-nav">
        <li className={`nav-item ${activePage === 'wallets' ? 'active' : ''}`}>
          <button onClick={() => setActivePage('wallets')}>Wallets</button>
        </li>
        <li className={`nav-item ${activePage === 'prices' ? 'active' : ''}`}>
          <button onClick={() => setActivePage('prices')}>Prices</button>
        </li>
        <li className={`nav-item ${activePage === 'swap' ? 'active' : ''}`}>
          <button onClick={() => setActivePage('swap')}>Swap</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
