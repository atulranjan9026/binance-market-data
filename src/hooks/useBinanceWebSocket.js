// src/hooks/useBinanceWebSocket.js

import { useEffect, useRef } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

const useBinanceWebSocket = (symbol, interval, onMessage) => {
  const ws = useRef(null);

  useEffect(() => {
    if (!symbol || !interval) return;

    const streamName = `${symbol.toLowerCase()}@kline_${interval}`;
    const wsUrl = `wss://stream.binance.com:9443/ws/${streamName}`;

    console.log(`Connecting to WebSocket: ${wsUrl}`);

    ws.current = new ReconnectingWebSocket(wsUrl, [], {
      maxRetries: 10,
      reconnectInterval: 3000, // 3 seconds
    });

    ws.current.addEventListener('open', () => {
      console.log(`WebSocket connected to ${wsUrl}`);
    });

    ws.current.addEventListener('message', (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.e === 'kline') {
          onMessage(data.k);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    });

    ws.current.addEventListener('error', (err) => {
      console.error('WebSocket error:', err);
    });

    ws.current.addEventListener('close', (event) => {
      console.warn(`WebSocket disconnected from ${wsUrl}. Code: ${event.code}, Reason: ${event.reason}`);
    });

    return () => {
      if (ws.current) {
        ws.current.close();
        console.log(`WebSocket connection to ${wsUrl} closed`);
      }
    };
  }, [symbol, interval, onMessage]);

  return ws.current;
};

export default useBinanceWebSocket;
