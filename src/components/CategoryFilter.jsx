import React from 'react';

function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">Categories</h3>
      <div className="space-y-1">
        <button
          onClick={() => onSelect(null)}
          className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
            !selected ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          All Categories
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`w-full text-left px-3 py-2 rounded text-sm capitalize transition-colors ${
              selected === cat ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
