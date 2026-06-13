import React from 'react';
import WeatherIcon from './WeatherIcon';

function HourlyChart({ hourlyData }) {
  if (!hourlyData || hourlyData.length === 0) {
    return null;
  }

  // Show next 24 hours, skip past hours
  const now = new Date();
  const upcoming = hourlyData.filter(h => new Date(h.forecast_time) >= now).slice(0, 24);
  
  if (upcoming.length === 0) return null;

  const temps = upcoming.map(h => h.temperature).filter(t => t !== null);
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);
  const range = maxTemp - minTemp || 1;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <h4 className="text-sm font-semibold text-gray-700 mb-3">Hourly Forecast</h4>
      <div className="overflow-x-auto">
        <div className="flex gap-0 min-w-max">
          {upcoming.map((hour, i) => {
            const time = new Date(hour.forecast_time);
            const timeStr = time.toLocaleTimeString([], { hour: '2-digit', hour12: true });
            const barHeight = ((hour.temperature - minTemp) / range) * 40 + 16;

            return (
              <div key={i} className="flex flex-col items-center w-14 flex-shrink-0">
                <span className="text-[10px] text-gray-500 mb-1">{timeStr}</span>
                <div className="w-6 h-6 flex items-center justify-center">
                  <WeatherIcon code={hour.weather_code} size={18} />
                </div>
                <span className="text-xs font-semibold text-gray-800 mt-1">
                  {Math.round(hour.temperature)}°
                </span>
                <div className="w-full flex justify-center mt-1">
                  <div
                    className="w-5 rounded-full bg-gradient-to-t from-blue-400 to-blue-200"
                    style={{ height: `${barHeight}px` }}
                  />
                </div>
                {hour.precipitation_probability > 0 && (
                  <span className="text-[9px] text-blue-500 mt-1">
                    {hour.precipitation_probability}%
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HourlyChart;
