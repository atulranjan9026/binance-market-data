// src/components/Layout.jsx

import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <header>
        <h1>Binance Market Data</h1>
      </header>
      <main>{children}</main>
      <footer>
        <p>Powered by Binance WebSocket API</p>
      </footer>
    </div>
  );
};

export default Layout;
