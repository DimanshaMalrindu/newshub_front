import React from 'react';

function TabSelector({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'news', label: '📰 News' },
    { id: 'youtube', label: '▶️ YouTube' },
    { id: 'weather', label: '🌤️ Weather' }
  ];

  return (
    <div className="flex border-b border-gray-200 mb-6">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === tab.id
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default TabSelector;
