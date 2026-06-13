import React from 'react';

// Weather code to icon mapping based on WMO codes
const weatherIcons = {
  clear: (size = 32) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="12" fill="#FBBF24" />
      <g stroke="#FBBF24" strokeWidth="3" strokeLinecap="round">
        <line x1="32" y1="8" x2="32" y2="14" />
        <line x1="32" y1="50" x2="32" y2="56" />
        <line x1="8" y1="32" x2="14" y2="32" />
        <line x1="50" y1="32" x2="56" y2="32" />
        <line x1="15" y1="15" x2="19.2" y2="19.2" />
        <line x1="44.8" y1="44.8" x2="49" y2="49" />
        <line x1="15" y1="49" x2="19.2" y2="44.8" />
        <line x1="44.8" y1="19.2" x2="49" y2="15" />
      </g>
    </svg>
  ),
  partlyCloudy: (size = 32) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="24" cy="24" r="9" fill="#FBBF24" />
      <g stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round">
        <line x1="24" y1="8" x2="24" y2="12" />
        <line x1="24" y1="36" x2="24" y2="40" />
        <line x1="8" y1="24" x2="12" y2="24" />
        <line x1="36" y1="24" x2="40" y2="24" />
      </g>
      <path d="M22 44c0-6.627 5.373-12 12-12 5.523 0 10.162 3.735 11.563 8.82C49.482 41.28 53 45.04 53 49.6c0 4.856-3.95 8.4-8.8 8.4H26.8C22.392 58 18 54.856 18 49.6c0-3.2 1.6-5.6 4-5.6z" fill="#94A3B8" />
    </svg>
  ),
  cloudy: (size = 32) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path d="M16 42c0-7.732 6.268-14 14-14 6.445 0 11.867 4.36 13.497 10.29C47.81 38.74 52 43.11 52 48.4c0 5.67-4.613 9.6-10.267 9.6H20.267C15.386 58 10 54.07 10 48.4c0-3.733 1.867-6.4 6-6.4z" fill="#94A3B8" />
      <path d="M28 32c0-5.523 4.477-10 10-10 4.603 0 8.478 3.113 9.64 7.35C50.92 29.67 54 32.79 54 36.57c0 4.047-3.293 6.857-7.333 6.857" fill="#CBD5E1" />
    </svg>
  ),
  rainy: (size = 32) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path d="M14 34c0-7.18 5.82-13 13-13 5.986 0 11.02 4.05 12.533 9.56C43.595 31.01 47.5 35.07 47.5 39.98c0 5.265-4.283 8.92-9.533 8.92H18.533C14.1 48.9 9 45.26 9 39.98c0-3.467 1.733-5.98 5-5.98z" fill="#64748B" />
      <line x1="20" y1="52" x2="18" y2="60" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="30" y1="52" x2="28" y2="60" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="40" y1="52" x2="38" y2="60" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  heavyRain: (size = 32) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path d="M14 30c0-7.18 5.82-13 13-13 5.986 0 11.02 4.05 12.533 9.56C43.595 27.01 47.5 31.07 47.5 35.98c0 5.265-4.283 8.92-9.533 8.92H18.533C14.1 44.9 9 41.26 9 35.98c0-3.467 1.733-5.98 5-5.98z" fill="#475569" />
      <line x1="17" y1="48" x2="14" y2="58" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="25" y1="48" x2="22" y2="58" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="33" y1="48" x2="30" y2="58" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="41" y1="48" x2="38" y2="58" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  thunderstorm: (size = 32) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path d="M14 28c0-7.18 5.82-13 13-13 5.986 0 11.02 4.05 12.533 9.56C43.595 25.01 47.5 29.07 47.5 33.98c0 5.265-4.283 8.92-9.533 8.92H18.533C14.1 42.9 9 39.26 9 33.98c0-3.467 1.733-5.98 5-5.98z" fill="#374151" />
      <polygon points="32,44 27,53 31,53 28,62 37,51 33,51 36,44" fill="#FBBF24" />
    </svg>
  ),
  snow: (size = 32) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path d="M14 32c0-7.18 5.82-13 13-13 5.986 0 11.02 4.05 12.533 9.56C43.595 29.01 47.5 33.07 47.5 37.98c0 5.265-4.283 8.92-9.533 8.92H18.533C14.1 46.9 9 43.26 9 37.98c0-3.467 1.733-5.98 5-5.98z" fill="#94A3B8" />
      <circle cx="20" cy="54" r="2" fill="#E2E8F0" />
      <circle cx="30" cy="56" r="2" fill="#E2E8F0" />
      <circle cx="40" cy="53" r="2" fill="#E2E8F0" />
      <circle cx="25" cy="60" r="1.5" fill="#E2E8F0" />
      <circle cx="35" cy="61" r="1.5" fill="#E2E8F0" />
    </svg>
  ),
  fog: (size = 32) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <line x1="12" y1="30" x2="52" y2="30" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
      <line x1="16" y1="38" x2="48" y2="38" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
      <line x1="12" y1="46" x2="52" y2="46" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
      <line x1="18" y1="54" x2="46" y2="54" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
};

// Map WMO weather codes to icon types
function getIconType(code) {
  if (code === 0) return 'clear';
  if (code === 1 || code === 2) return 'partlyCloudy';
  if (code === 3) return 'cloudy';
  if (code >= 45 && code <= 48) return 'fog';
  if (code >= 51 && code <= 55) return 'rainy';
  if (code >= 56 && code <= 57) return 'rainy';
  if (code >= 61 && code <= 65) return 'rainy';
  if (code >= 66 && code <= 67) return 'heavyRain';
  if (code >= 71 && code <= 77) return 'snow';
  if (code >= 80 && code <= 82) return 'heavyRain';
  if (code >= 85 && code <= 86) return 'snow';
  if (code >= 95 && code <= 99) return 'thunderstorm';
  return 'cloudy';
}

// Get weather description from WMO code
export function getWeatherDescription(code) {
  const descriptions = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    77: 'Snow grains',
    80: 'Slight showers',
    81: 'Moderate showers',
    82: 'Violent showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with hail',
    99: 'Severe thunderstorm'
  };
  return descriptions[code] || 'Unknown';
}

function WeatherIcon({ code, size = 32 }) {
  const iconType = getIconType(code);
  const iconRenderer = weatherIcons[iconType];
  return iconRenderer ? iconRenderer(size) : null;
}

export default WeatherIcon;
