import React, { useState, useEffect } from 'react';
import SriLankaMap from './SriLankaMap';
import WeatherDetail from './WeatherDetail';
import WeatherDetailGrid from './WeatherDetailGrid';
import HourlyChart from './HourlyChart';
import DailyForecast from './DailyForecast';
import WeatherIcon from './WeatherIcon';

function WeatherSection() {
  const [weatherData, setWeatherData] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hourlyData, setHourlyData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch('/api/weather');
        const data = await res.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 600000);
    return () => clearInterval(interval);
  }, []);

  // Fetch hourly and daily data when district changes
  useEffect(() => {
    if (!selectedDistrict) {
      setHourlyData([]);
      setDailyData([]);
      return;
    }

    const fetchForecast = async () => {
      try {
        const [hourlyRes, dailyRes] = await Promise.all([
          fetch(`/api/weather/${encodeURIComponent(selectedDistrict)}/hourly`),
          fetch(`/api/weather/${encodeURIComponent(selectedDistrict)}/forecast`)
        ]);
        const hourly = await hourlyRes.json();
        const daily = await dailyRes.json();
        setHourlyData(Array.isArray(hourly) ? hourly : []);
        setDailyData(Array.isArray(daily) ? daily : []);
      } catch (error) {
        console.error('Error fetching forecast:', error);
      }
    };

    fetchForecast();
  }, [selectedDistrict]);

  const selectedWeather = weatherData.find(w => w.district === selectedDistrict) || null;

  const filteredDistricts = weatherData.filter(w =>
    w.district.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-3 text-gray-500 text-sm">Loading weather data...</p>
      </div>
    );
  }

  if (weatherData.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>Weather data is not available yet. It will appear after the first fetch.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left: Map + District Grid */}
      <div className="flex-1 lg:w-3/5">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
            Sri Lanka Weather
          </h2>
          <SriLankaMap
            weatherData={weatherData}
            selectedDistrict={selectedDistrict}
            onDistrictClick={setSelectedDistrict}
          />
        </div>

        {/* District quick-select grid */}
        <div className="mt-4">
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="Search districts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            />
            <svg className="w-4 h-4 absolute left-2.5 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 max-h-64 overflow-y-auto">
            {filteredDistricts.map(w => (
              <button
                key={w.district}
                onClick={() => setSelectedDistrict(w.district)}
                className={`p-2 rounded-lg text-center text-xs border transition-all ${
                  selectedDistrict === w.district
                    ? 'border-blue-500 bg-blue-50 shadow-sm ring-1 ring-blue-200'
                    : 'border-gray-100 bg-white hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center justify-center gap-1 mb-0.5">
                  <WeatherIcon code={w.weather_code} size={16} />
                  <span className="text-lg font-bold text-gray-900">{Math.round(w.temperature)}°</span>
                </div>
                <p className="font-medium text-gray-600 truncate">{w.district}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Detail Panel */}
      <div className="lg:w-2/5 space-y-4">
        <WeatherDetail weather={selectedWeather} />
        {selectedWeather && <WeatherDetailGrid weather={selectedWeather} />}
        {selectedDistrict && <HourlyChart hourlyData={hourlyData} />}
        {selectedDistrict && <DailyForecast dailyData={dailyData} />}
      </div>
    </div>
  );
}

export default WeatherSection;
