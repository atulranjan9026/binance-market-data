// src/components/ChartComponent.jsx

import React from 'react';
import { Chart, CategoryScale, LinearScale, TimeScale, Tooltip, Legend } from 'chart.js';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import 'chartjs-adapter-date-fns';
import { enUS, fr, de, es } from 'date-fns/locale';
import { Chart as ReactChart } from 'react-chartjs-2';

// Register necessary Chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  CandlestickController,
  CandlestickElement,
  Tooltip,
  Legend
);

const localeMap = {
  'en-US': enUS,
  'fr-FR': fr,
  'de-DE': de,
  'es-ES': es,
  // Add more locales as needed
};

const ChartComponent = ({ data, symbol, interval, locale = 'en-US' }) => {
  const selectedLocale = localeMap[locale] || enUS;

  const chartData = {
    datasets: [
      {
        label: `${symbol.toUpperCase()} ${interval} Candlestick`,
        data: data.map((d) => ({
          x: d.time,
          o: d.open,
          h: d.high,
          l: d.low,
          c: d.close,
        })),
        borderColor: '#000',
        borderWidth: 1,
        // Optional: Customize candlestick colors
        /*
        upColor: '#26a69a',
        downColor: '#ef5350',
        */
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows the chart to resize based on container
    scales: {
      x: {
        type: 'time',
        time: {
          unit: interval.includes('m') ? 'minute' : 'hour',
          tooltipFormat: 'MMM d, yyyy, h:mm a',
        },
        ticks: {
          source: 'auto',
          maxRotation: 0,
          autoSkip: true,
        },
        adapters: {
          date: {
            locale: selectedLocale, // Dynamically set locale
          },
        },
      },
      y: {
        beginAtZero: false,
        position: 'left',
        title: {
          display: true,
          text: 'Price (USDT)',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
  };

  return (
    <div style={{ height: '500px' }}>
      <ReactChart type="candlestick" data={chartData} options={options} />
    </div>
  );
};

export default ChartComponent;
