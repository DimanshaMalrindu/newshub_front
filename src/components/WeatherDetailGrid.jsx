import React from 'react';

function getVisibilityText(vis) {
  if (vis === null || vis === undefined) return '—';
  const km = vis / 1000;
  if (km >= 10) return `${km.toFixed(0)} km (Excellent)`;
  if (km >= 5) return `${km.toFixed(1)} km (Good)`;
  if (km >= 2) return `${km.toFixed(1)} km (Moderate)`;
  return `${km.toFixed(1)} km (Poor)`;
}

function getPressureText(pressure) {
  if (pressure === null || pressure === undefined) return '—';
  if (pressure >= 1020) return 'High';
  if (pressure >= 1010) return 'Normal';
  return 'Low';
}

function WeatherDetailGrid({ weather }) {
  if (!weather) return null;

  const details = [
    {
      label: 'Humidity',
      value: weather.humidity !== null ? `${weather.humidity}%` : '—',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z" />
        </svg>
      ),
      color: 'text-blue-500'
    },
    {
      label: 'Dew Point',
      value: weather.dew_point !== null ? `${weather.dew_point}°C` : '—',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zm0 18c-3.35 0-6-2.57-6-6.2 0-2.34 1.95-5.44 6-9.14 4.05 3.7 6 6.79 6 9.14 0 3.63-2.65 6.2-6 6.2z" />
        </svg>
      ),
      color: 'text-teal-500'
    },
    {
      label: 'Pressure',
      value: weather.pressure !== null ? `${weather.pressure.toFixed(0)} hPa` : '—',
      sub: getPressureText(weather.pressure),
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
      ),
      color: 'text-purple-500'
    },
    {
      label: 'Visibility',
      value: getVisibilityText(weather.visibility),
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
        </svg>
      ),
      color: 'text-gray-500'
    },
    {
      label: 'Cloud Cover',
      value: weather.cloud_cover !== null ? `${weather.cloud_cover}%` : '—',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
        </svg>
      ),
      color: 'text-slate-400'
    },
    {
      label: 'UV Index',
      value: weather.uv_index !== null ? weather.uv_index.toString() : '—',
      sub: weather.uv_index !== null ? getUVLabel(weather.uv_index) : null,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1z" />
        </svg>
      ),
      color: 'text-yellow-500'
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <h4 className="text-sm font-semibold text-gray-700 mb-3">Weather Details</h4>
      <div className="grid grid-cols-2 gap-3">
        {details.map((item, i) => (
          <div key={i} className="flex items-start gap-2.5 p-2 rounded-lg bg-gray-50">
            <div className={`mt-0.5 ${item.color}`}>{item.icon}</div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-wide">{item.label}</p>
              <p className="text-sm font-semibold text-gray-800">{item.value}</p>
              {item.sub && <p className="text-[10px] text-gray-500">{item.sub}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getUVLabel(uv) {
  if (uv <= 2) return 'Low';
  if (uv <= 5) return 'Moderate';
  if (uv <= 7) return 'High';
  if (uv <= 10) return 'Very High';
  return 'Extreme';
}

export default WeatherDetailGrid;
