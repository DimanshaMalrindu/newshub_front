import React, { useState, useEffect, useRef } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const debounceRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onSearch(query.trim() || null);
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [query, onSearch]);

  return (
    <div className="relative w-full md:w-72">
      {/* Magnifying glass icon */}
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search articles..."
        className="w-full pl-9 pr-8 py-1.5 rounded-full bg-blue-700/50 text-white placeholder-blue-300 text-sm border border-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-blue-700/70"
      />
      {/* Clear button */}
      {query && (
        <button
          onClick={() => setQuery('')}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-blue-300 hover:text-white"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default SearchBar;
