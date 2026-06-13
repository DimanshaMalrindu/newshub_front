import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';

// District center coordinates for weather markers
const districtCenters = {
  'Colombo': [6.9271, 79.8612],
  'Gampaha': [7.0840, 80.0098],
  'Kalutara': [6.5854, 80.1142],
  'Kandy': [7.2906, 80.6337],
  'Matale': [7.4675, 80.6234],
  'Nuwara Eliya': [6.9497, 80.7891],
  'Galle': [6.0535, 80.2210],
  'Matara': [5.9549, 80.5550],
  'Hambantota': [6.1429, 81.1212],
  'Jaffna': [9.6615, 80.0255],
  'Kilinochchi': [9.3803, 80.3770],
  'Mullaitivu': [9.2671, 80.8142],
  'Vavuniya': [8.7514, 80.4971],
  'Mannar': [8.9810, 79.9044],
  'Batticaloa': [7.7310, 81.6747],
  'Ampara': [7.2955, 81.6820],
  'Trincomalee': [8.5874, 81.2152],
  'Kurunegala': [7.4863, 80.3647],
  'Puttalam': [8.0362, 79.8283],
  'Anuradhapura': [8.3114, 80.4037],
  'Polonnaruwa': [7.9403, 81.0188],
  'Badulla': [6.9934, 81.0550],
  'Monaragala': [6.8728, 81.3507],
  'Ratnapura': [6.6828, 80.3992],
  'Kegalle': [7.2513, 80.3464]
};

// Weather code to simple emoji for map pins
function getWeatherEmoji(code) {
  if (code === 0) return '☀️';
  if (code <= 2) return '⛅';
  if (code === 3) return '☁️';
  if (code >= 45 && code <= 48) return '🌫️';
  if (code >= 51 && code <= 67) return '🌧️';
  if (code >= 71 && code <= 77) return '❄️';
  if (code >= 80 && code <= 82) return '🌧️';
  if (code >= 85 && code <= 86) return '❄️';
  if (code >= 95) return '⛈️';
  return '☁️';
}

function createWeatherPin(temp, weatherCode, isSelected) {
  const emoji = weatherCode !== null ? getWeatherEmoji(weatherCode) : '';
  const tempStr = temp !== null ? `${Math.round(temp)}°` : '—';

  const selectedClass = isSelected ? 'weather-pin-selected' : '';

  return L.divIcon({
    className: `weather-pin ${selectedClass}`,
    html: `
      <div class="weather-pin-inner ${isSelected ? 'selected' : ''}">
        <span class="weather-pin-emoji">${emoji}</span>
        <span class="weather-pin-temp">${tempStr}</span>
      </div>
    `,
    iconSize: [48, 32],
    iconAnchor: [24, 16]
  });
}

function SriLankaMap({ weatherData, selectedDistrict, onDistrictClick }) {
  const weatherByDistrict = useMemo(() => {
    const map = {};
    if (weatherData) {
      weatherData.forEach(w => { map[w.district] = w; });
    }
    return map;
  }, [weatherData]);

  const markers = useMemo(() => {
    return Object.entries(districtCenters).map(([name, coords]) => {
      const weather = weatherByDistrict[name];
      const temp = weather ? weather.temperature : null;
      const weatherCode = weather ? weather.weather_code : null;
      const isSelected = name === selectedDistrict;
      return { name, coords, temp, weatherCode, isSelected };
    });
  }, [weatherByDistrict, selectedDistrict]);

  return (
    <div className="relative">
      <MapContainer
        center={[7.8731, 80.7718]}
        zoom={7}
        scrollWheelZoom={true}
        className="w-full rounded-lg z-0"
        style={{ height: '450px' }}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {markers.map(({ name, coords, temp, weatherCode, isSelected }) => (
          <Marker
            key={name}
            position={coords}
            icon={createWeatherPin(temp, weatherCode, isSelected)}
            eventHandlers={{ click: () => onDistrictClick(name) }}
          >
            <Tooltip direction="top" offset={[0, -16]}>
              <strong>{name}</strong>
              {temp !== null && <span> — {temp}°C</span>}
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default SriLankaMap;
