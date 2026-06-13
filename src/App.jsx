import React, { useState, useEffect, useCallback, useRef } from 'react';
import { io } from 'socket.io-client';
import Header from './components/Header';
import CurrencyTicker from './components/CurrencyTicker';
import TabSelector from './components/TabSelector';
import NewsList from './components/NewsList';
import CategoryFilter from './components/CategoryFilter';
import SourceFilter from './components/SourceFilter';
import NewArticlesBanner from './components/NewArticlesBanner';
import YouTubeSection from './components/YouTubeSection';
import WeatherSection from './components/WeatherSection';

function App() {
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [filters, setFilters] = useState({ language: null, category: null, source: null, search: null });
  const [sources, setSources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [activeUsers, setActiveUsers] = useState(0);
  const [newArticlesCount, setNewArticlesCount] = useState(0);
  const [activeTab, setActiveTab] = useState('news');
  const lastKnownTotal = useRef(null);

  // Socket.IO connection for active users
  useEffect(() => {
    const socket = io();
    socket.on('activeUsers', (count) => setActiveUsers(count));
    return () => socket.disconnect();
  }, []);

  const fetchNews = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      params.set('page', page);
      params.set('limit', '20');
      if (filters.language) params.set('language', filters.language);
      if (filters.category) params.set('category', filters.category);
      if (filters.source) params.set('source', filters.source);
      if (filters.search) params.set('search', filters.search);

      const res = await fetch(`/api/news?${params}`);
      const data = await res.json();
      setArticles(data.articles);
      setPagination(data.pagination);
      lastKnownTotal.current = data.pagination.total;
      setNewArticlesCount(0);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  }, [page, filters]);

  const fetchMetadata = async () => {
    try {
      const [sourcesRes, categoriesRes, statsRes] = await Promise.all([
        fetch('/api/sources'),
        fetch('/api/categories'),
        fetch('/api/stats')
      ]);
      setSources(await sourcesRes.json());
      setCategories(await categoriesRes.json());
      setStats(await statsRes.json());
    } catch (error) {
      console.error('Error fetching metadata:', error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  useEffect(() => {
    fetchMetadata();
  }, []);

  // Silent check for new articles every 30 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const statsRes = await fetch('/api/stats');
        const latestStats = await statsRes.json();
        setStats(latestStats);

        if (lastKnownTotal.current !== null && latestStats.totalArticles > lastKnownTotal.current) {
          setNewArticlesCount(latestStats.totalArticles - lastKnownTotal.current);
        }
      } catch (error) {
        console.error('Error checking for new articles:', error);
      }
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleLoadNewArticles = () => {
    fetchNews();
    fetchMetadata();
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        stats={stats}
        language={filters.language}
        onLanguageChange={(lang) => handleFilterChange('language', lang)}
        activeUsers={activeUsers}
        onSearch={(search) => handleFilterChange('search', search)}
      />
      <CurrencyTicker />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'news' ? (
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar Filters */}
            <aside className="w-full md:w-64 shrink-0 space-y-4">
              <CategoryFilter
                categories={categories}
                selected={filters.category}
                onSelect={(cat) => handleFilterChange('category', cat)}
              />
              <SourceFilter
                sources={sources}
                selected={filters.source}
                onSelect={(src) => handleFilterChange('source', src)}
              />
            </aside>

            {/* News Content */}
            <div className="flex-1">
              <NewArticlesBanner
                count={newArticlesCount}
                onRefresh={handleLoadNewArticles}
                onDismiss={() => setNewArticlesCount(0)}
              />
              <NewsList
                articles={articles}
                loading={loading}
                pagination={pagination}
                onPageChange={setPage}
              />
            </div>
          </div>
        ) : activeTab === 'youtube' ? (
          <YouTubeSection />
        ) : (
          <WeatherSection />
        )}
      </main>
    </div>
  );
}

export default App;
