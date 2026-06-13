import React from 'react';

const languageLabels = { en: 'English', si: 'සිංහල', ta: 'தமிழ்' };
const categoryColors = {
  politics: 'bg-red-100 text-red-800',
  sports: 'bg-green-100 text-green-800',
  business: 'bg-yellow-100 text-yellow-800',
  technology: 'bg-purple-100 text-purple-800',
  entertainment: 'bg-pink-100 text-pink-800',
  international: 'bg-blue-100 text-blue-800',
  general: 'bg-gray-100 text-gray-800'
};

function NewsCard({ article }) {
  const timeAgo = getTimeAgo(article.pub_date);

  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden"
    >
      {article.image_url && (
        <img
          src={article.image_url}
          alt=""
          className="w-full h-40 object-cover"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[article.category] || categoryColors.general}`}>
            {article.category}
          </span>
          <span className="text-xs text-gray-400">
            {languageLabels[article.language] || article.language}
          </span>
        </div>

        <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-2 line-clamp-2">
          {article.title}
        </h3>

        {article.description && (
          <p className="text-gray-600 text-xs line-clamp-2 mb-3">
            {article.description}
          </p>
        )}

        <div className="flex items-center justify-between text-xs text-gray-400">
          <span className="font-medium text-gray-500">{article.source}</span>
          <span>{timeAgo}</span>
        </div>
      </div>
    </a>
  );
}

function getTimeAgo(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

export default NewsCard;
