import { useEffect, useRef } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

const useBinanceWebSocket = (symbol, interval, onMessage) => {
  const ws = useRef(null);

  useEffect(() => {
    if (!symbol || !interval) return;

    const streamName = `${symbol.toLowerCase()}@kline_${interval}`;
    const wsUrl = `wss://stream.binance.com:9443/ws/${streamName}`;

    ws.current = new ReconnectingWebSocket(wsUrl);

    ws.current.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      if (data.e === 'kline') {
        onMessage(data.k);
      }
    });

    ws.current.addEventListener('error', (err) => {
      console.error('WebSocket error:', err);
    });

    return () => {
      ws.current.close();
    };
  }, [symbol, interval, onMessage]);

  return ws.current;
};

export default useBinanceWebSocket;
