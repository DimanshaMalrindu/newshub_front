import React from 'react';
import NewsCard from './NewsCard';

function NewsList({ articles, loading, pagination, onPageChange }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading news...</span>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">No articles found</p>
        <p className="text-sm mt-2">Try changing your filters or wait for the next fetch cycle</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        {articles.map(article => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={pagination.page <= 1}
            className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
          >
            Previous
          </button>
          <span className="text-gray-600 px-4">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={pagination.page >= pagination.totalPages}
            className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default NewsList;
