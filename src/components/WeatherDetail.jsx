import React from 'react';
import WeatherIcon, { getWeatherDescription } from './WeatherIcon';

function getWindDirection(degrees) {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}

function formatTime(isoString) {
  if (!isoString) return '—';
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
}

function WeatherDetail({ weather }) {
  if (!weather) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        <div className="text-center">
          <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
          <p className="text-sm font-medium">Select a district</p>
          <p className="text-xs mt-1">to see detailed weather</p>
        </div>
      </div>
    );
  }

  const description = getWeatherDescription(weather.weather_code);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Current conditions header */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-5 text-white">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg font-bold">{weather.district}</h3>
          <span className="text-xs text-slate-400">
            {weather.is_day ? '☀️ Day' : '🌙 Night'}
          </span>
        </div>
        <div className="flex items-center gap-4 mt-3">
          <WeatherIcon code={weather.weather_code} size={52} />
          <div>
            <p className="text-5xl font-light tracking-tight">{Math.round(weather.temperature)}°</p>
            <p className="text-slate-300 text-sm mt-0.5">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-4 text-sm text-slate-300">
          <span>Feels like {Math.round(weather.feels_like)}°C</span>
          <span className="text-slate-500">•</span>
          <span>Wind {weather.wind_speed} km/h {getWindDirection(weather.wind_direction)}</span>
        </div>
      </div>

      {/* Sunrise / Sunset bar */}
      {(weather.sunrise || weather.sunset) && (
        <div className="flex items-center justify-between px-5 py-3 bg-slate-50 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-base">🌅</span>
            <div>
              <p className="text-[10px] text-gray-500 uppercase">Sunrise</p>
              <p className="text-xs font-semibold text-gray-700">{formatTime(weather.sunrise)}</p>
            </div>
          </div>
          <div className="flex-1 mx-4 h-px bg-gradient-to-r from-yellow-200 via-yellow-400 to-orange-300 rounded"></div>
          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-[10px] text-gray-500 uppercase">Sunset</p>
              <p className="text-xs font-semibold text-gray-700">{formatTime(weather.sunset)}</p>
            </div>
            <span className="text-base">🌇</span>
          </div>
        </div>
      )}

      {/* Quick stats row */}
      <div className="grid grid-cols-3 divide-x divide-gray-100 px-2 py-3">
        <div className="text-center">
          <p className="text-[10px] text-gray-500 uppercase">Precipitation</p>
          <p className="text-sm font-bold text-gray-800">{weather.precipitation} mm</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-gray-500 uppercase">Humidity</p>
          <p className="text-sm font-bold text-gray-800">{weather.humidity}%</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-gray-500 uppercase">Wind</p>
          <p className="text-sm font-bold text-gray-800">{weather.wind_speed} km/h</p>
        </div>
      </div>

      {/* Last updated */}
      <div className="px-4 pb-3 text-[10px] text-gray-400 text-center">
        Updated {new Date(weather.fetched_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
}

export default WeatherDetail;
