// src/components/CryptoToggle.jsx

import React from 'react';

const CRYPTOS = [
  { label: 'ETH/USDT', value: 'ethusdt' },
  { label: 'BNB/USDT', value: 'bnbusdt' },
  { label: 'DOT/USDT', value: 'dotusdt' },
];

const CryptoToggle = ({ selected, onSelect }) => {
  return (
    <div className="crypto-toggle">
      {CRYPTOS.map((crypto) => (
        <button
          key={crypto.value}
          className={`crypto-button ${selected === crypto.value ? 'active' : ''}`}
          onClick={() => onSelect(crypto.value)}
        >
          {crypto.label}
        </button>
      ))}
    </div>
  );
};

export default CryptoToggle;
