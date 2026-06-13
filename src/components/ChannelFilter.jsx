import React from 'react';

function ChannelFilter({ channels, selected, onSelect }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      <h3 className="font-semibold text-gray-800 mb-3 text-sm">Channels</h3>
      <div className="space-y-1">
        <button
          onClick={() => onSelect(null)}
          className={`w-full text-left px-3 py-1.5 rounded text-sm transition-colors ${
            !selected ? 'bg-red-50 text-red-700 font-medium' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          All Channels
        </button>
        {channels.map(channel => (
          <button
            key={channel.id}
            onClick={() => onSelect(channel.id)}
            className={`w-full text-left px-3 py-1.5 rounded text-sm transition-colors ${
              selected === channel.id ? 'bg-red-50 text-red-700 font-medium' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {channel.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ChannelFilter;
