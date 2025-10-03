import React, { useState, useEffect } from 'react';
import { WatchlistItem } from '../types';
import { watchlistService } from '../services/watchlistService';
import MovieCard from './MovieCard';

interface WatchlistProps {
  onMovieSelect?: (movieId: string) => void;
}

const Watchlist: React.FC<WatchlistProps> = ({ onMovieSelect }) => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadWatchlist();
  }, []);

  const loadWatchlist = async () => {
    try {
      setLoading(true);
      const response = await watchlistService.getWatchlist();
      setWatchlist(response.watchlist);
    } catch (err) {
      setError('Erro ao carregar lista para assistir');
      console.error('Erro ao carregar watchlist:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWatchlist = async (movieId: string) => {
    try {
      await watchlistService.removeFromWatchlist(movieId);
      setWatchlist(prev => prev.filter(item => item.movie._id !== movieId));
    } catch (err) {
      console.error('Erro ao remover da watchlist:', err);
    }
  };

  const handleMarkAsWatched = async (movieId: string) => {
    try {
      await watchlistService.markAsWatched(movieId);
      setWatchlist(prev => prev.filter(item => item.movie._id !== movieId));
    } catch (err) {
      console.error('Erro ao marcar como assistido:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={loadWatchlist}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  if (watchlist.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📺</div>
        <h3 className="text-xl font-semibold text-gray-300 mb-2">
          Sua lista para assistir está vazia
        </h3>
        <p className="text-gray-500">
          Adicione filmes que você quer assistir mais tarde
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">
          Minha Lista ({watchlist.length})
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {watchlist.map((item) => (
          <div key={item.movie._id} className="relative group">
            <MovieCard 
              movie={item.movie} 
              onSelect={onMovieSelect}
            />
            
            {/* Botões de ação */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleMarkAsWatched(item.movie._id)}
                  className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors"
                  title="Marcar como assistido"
                >
                  ✓
                </button>
                <button
                  onClick={() => handleRemoveFromWatchlist(item.movie._id)}
                  className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                  title="Remover da lista"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Data de adição */}
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
              Adicionado em {new Date(item.addedAt).toLocaleDateString('pt-BR')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
