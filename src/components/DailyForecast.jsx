import React from 'react';
import WeatherIcon from './WeatherIcon';

function DailyForecast({ dailyData }) {
  if (!dailyData || dailyData.length === 0) {
    return null;
  }

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <h4 className="text-sm font-semibold text-gray-700 mb-3">7-Day Forecast</h4>
      <div className="space-y-2">
        {dailyData.map((day, i) => {
          const date = new Date(day.forecast_date + 'T00:00:00');
          const dayName = i === 0 ? 'Today' : days[date.getDay()];

          return (
            <div key={i} className="flex items-center gap-3 py-1.5 border-b border-gray-50 last:border-0">
              <span className="text-xs font-medium text-gray-600 w-10">{dayName}</span>
              <div className="w-6 h-6 flex items-center justify-center">
                <WeatherIcon code={day.weather_code} size={20} />
              </div>
              {day.precipitation_probability !== null && (
                <span className="text-[10px] text-blue-500 w-8">
                  {day.precipitation_probability > 0 ? `${day.precipitation_probability}%` : ''}
                </span>
              )}
              <div className="flex-1 flex items-center gap-2">
                <span className="text-xs text-gray-400 w-8 text-right">
                  {day.temp_min !== null ? `${Math.round(day.temp_min)}°` : '—'}
                </span>
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden relative">
                  <div
                    className="absolute h-full rounded-full bg-gradient-to-r from-blue-300 via-yellow-300 to-orange-400"
                    style={{
                      left: `${((day.temp_min - 18) / 22) * 100}%`,
                      right: `${100 - ((day.temp_max - 18) / 22) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-xs font-semibold text-gray-800 w-8">
                  {day.temp_max !== null ? `${Math.round(day.temp_max)}°` : '—'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DailyForecast;
