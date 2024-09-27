// src/components/TimeframeSelector.jsx

import React from 'react';

const TIMEFRAMES = [
  { label: '1 Minute', value: '1m' },
  { label: '3 Minutes', value: '3m' },
  { label: '5 Minutes', value: '5m' },
];

const TimeframeSelector = ({ selected, onSelect }) => {
  return (
    <div className="timeframe-selector">
      <select value={selected} onChange={(e) => onSelect(e.target.value)}>
        {TIMEFRAMES.map((tf) => (
          <option key={tf.value} value={tf.value}>
            {tf.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimeframeSelector;
