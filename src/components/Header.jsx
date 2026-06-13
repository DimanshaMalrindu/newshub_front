import React from 'react';
import ActiveUsers from './ActiveUsers';
import SearchBar from './SearchBar';

const languages = [
  { code: null, label: 'All' },
  { code: 'en', label: 'English' },
  { code: 'si', label: 'සිංහල' },
  { code: 'ta', label: 'தமிழ்' }
];

function Header({ stats, language, onLanguageChange, activeUsers, onSearch }) {
  return (
    <header className="bg-gradient-to-r from-blue-800 to-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">🇱🇰 Sri Lanka News</h1>
            <p className="text-blue-200 text-sm">
              Aggregating news from all major Sri Lankan sources
            </p>
          </div>

          {/* Search Bar */}
          <SearchBar onSearch={onSearch} />

          {/* Language Selector */}
          <div className="flex items-center gap-2">
            {languages.map(lang => (
              <button
                key={lang.code || 'all'}
                onClick={() => onLanguageChange(lang.code)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  language === lang.code
                    ? 'bg-white text-blue-800'
                    : 'bg-blue-700 text-blue-100 hover:bg-blue-500'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {/* Stats & Active Users */}
          <div className="flex items-center gap-4">
            <ActiveUsers count={activeUsers} />
            {stats && (
              <div className="text-right text-sm text-blue-200">
                <p>{stats.totalArticles} articles</p>
                <p>{stats.totalSources} sources</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
