import React from 'react';

function VideoCard({ video }) {
  const publishedDate = video.published_at
    ? new Date(video.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : '';

  return (
    <a
      href={video.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100"
    >
      <div className="relative">
        <img
          src={video.thumbnail_url}
          alt={video.title}
          className="w-full aspect-video object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/30">
          <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-snug">
          {video.title}
        </h3>
        <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
          <span className="font-medium text-gray-700">{video.channel_name}</span>
          <span>{publishedDate}</span>
        </div>
      </div>
    </a>
  );
}

export default VideoCard;
