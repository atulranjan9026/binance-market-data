// src/App.js

import React, { useState, useEffect, useCallback } from 'react';
import Layout from './components/Layout';
import ChartComponent from './components/ChartComponent';
import CryptoToggle from './components/CryptoToggle';
import TimeframeSelector from './components/TimeframeSelector';
import useBinanceWebSocket from './hooks/useBinanceWebSocket';
import { loadData, saveData } from './utils/storage';

const App = () => {
  const [selectedCrypto, setSelectedCrypto] = useState('ethusdt'); // Lowercase
  const [selectedInterval, setSelectedInterval] = useState('1m');
  const [chartData, setChartData] = useState(() => loadData());

  const handleNewKline = useCallback(
    (kline) => {
      setChartData((prevData) => {
        const updatedData = { ...prevData };
        const symbolData = updatedData[selectedCrypto] || {};
        const intervalData = symbolData[selectedInterval] || [];

        const isFinal = kline.x; // kline.x indicates if the kline is closed
        const newCandle = {
          time: kline.t, // Event time in milliseconds
          open: parseFloat(kline.o),
          high: parseFloat(kline.h),
          low: parseFloat(kline.l),
          close: parseFloat(kline.c),
        };

        if (isFinal) {
          // Final candle, push to data
          intervalData.push(newCandle);
        } else {
          // Update last candle
          if (intervalData.length > 0) {
            intervalData[intervalData.length - 1] = newCandle;
          } else {
            intervalData.push(newCandle);
          }
        }

        // Limit data points to prevent memory issues
        if (intervalData.length > 1000) {
          intervalData.shift();
        }

        symbolData[selectedInterval] = intervalData;
        updatedData[selectedCrypto] = symbolData;

        // Save to local storage
        saveData(updatedData);

        return updatedData;
      });
    },
    [selectedCrypto, selectedInterval]
  );

  // Initialize WebSocket
  useBinanceWebSocket(selectedCrypto, selectedInterval, handleNewKline);

  // Load initial data from local storage
  useEffect(() => {
    setChartData(loadData());
  }, []);

  return (
    <Layout>
      <div className="controls">
        <CryptoToggle selected={selectedCrypto} onSelect={setSelectedCrypto} />
        <TimeframeSelector selected={selectedInterval} onSelect={setSelectedInterval} />
      </div>
      <ChartComponent
        data={chartData[selectedCrypto]?.[selectedInterval] || []}
        symbol={selectedCrypto}
        interval={selectedInterval}
      />
    </Layout>
  );
};

export default App;
