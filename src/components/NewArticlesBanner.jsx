import React from 'react';

function NewArticlesBanner({ count, onRefresh, onDismiss }) {
  if (!count || count <= 0) return null;

  return (
    <div className="mb-4 flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 shadow-sm animate-slide-down">
      <div className="flex items-center gap-2">
        <span className="flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
        </span>
        <p className="text-sm text-blue-800 font-medium">
          {count} new {count === 1 ? 'article' : 'articles'} available
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onRefresh}
          className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
        >
          Load new articles
        </button>
        <button
          onClick={onDismiss}
          className="text-blue-400 hover:text-blue-600 transition-colors"
          aria-label="Dismiss"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default NewArticlesBanner;
