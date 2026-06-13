import React, { useState, useEffect, useCallback } from 'react';
import VideoCard from './VideoCard';
import ChannelFilter from './ChannelFilter';

function YouTubeSection() {
  const [videos, setVideos] = useState([]);
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchVideos = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.set('page', page);
      params.set('limit', '20');
      if (selectedChannel) params.set('channel_id', selectedChannel);

      const res = await fetch(`/api/youtube/videos?${params}`);
      const data = await res.json();
      setVideos(data.videos);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
    } finally {
      setLoading(false);
    }
  }, [page, selectedChannel]);

  const fetchChannels = async () => {
    try {
      const res = await fetch('/api/youtube/channels');
      const data = await res.json();
      setChannels(data);
    } catch (error) {
      console.error('Error fetching YouTube channels:', error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  useEffect(() => {
    fetchChannels();
  }, []);

  const handleChannelSelect = (channelId) => {
    setSelectedChannel(channelId);
    setPage(1);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Sidebar - Channel Filter */}
      <aside className="w-full md:w-64 shrink-0">
        <ChannelFilter
          channels={channels}
          selected={selectedChannel}
          onSelect={handleChannelSelect}
        />
      </aside>

      {/* Video Grid */}
      <div className="flex-1">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-3 text-gray-500 text-sm">Loading videos...</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>No videos available yet. They will appear after the first fetch.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {videos.map(video => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-6">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1.5 text-sm rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-600">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                  disabled={page === pagination.totalPages}
                  className="px-3 py-1.5 text-sm rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default YouTubeSection;
