import React, { useState, useEffect } from 'react';
import MiniSparkline from './MiniSparkline';
import '../styles/ticker.css';

const CURRENCY_FLAGS = {
  USD: '🇺🇸',
  EUR: '🇪🇺',
  GBP: '🇬🇧',
  AUD: '🇦🇺',
  JPY: '🇯🇵',
  INR: '🇮🇳',
  CAD: '🇨🇦',
  SGD: '🇸🇬'
};

function CurrencyTicker() {
  const [rates, setRates] = useState([]);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch('/api/currency');
        const data = await res.json();
        setRates(data);
      } catch (error) {
        console.error('Error fetching currency rates:', error);
      }
    };

    fetchRates();
    // Refresh rates every 5 minutes on the frontend
    const interval = setInterval(fetchRates, 300000);
    return () => clearInterval(interval);
  }, []);

  if (rates.length === 0) return null;

  // Duplicate items for seamless infinite scroll
  const items = [...rates, ...rates];

  return (
    <div className="bg-gray-900 text-white overflow-hidden border-b border-gray-700">
      <div className="ticker-track">
        {items.map((rate, index) => (
          <div
            key={`${rate.currency}-${index}`}
            className="flex items-center gap-2 px-5 py-1.5 whitespace-nowrap border-r border-gray-700/50"
          >
            <span className="text-sm">{CURRENCY_FLAGS[rate.currency]}</span>
            <span className="text-xs font-medium text-gray-300">
              {rate.currency}/LKR
            </span>
            <span className="text-xs font-bold text-white">
              {rate.rate.toFixed(2)}
            </span>
            <MiniSparkline data={rate.sparkline} trend={rate.trend} />
            <span className={`text-xs font-medium ${rate.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
              {rate.trend === 'up' ? '▲' : '▼'} {Math.abs(rate.changePercent).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CurrencyTicker;
