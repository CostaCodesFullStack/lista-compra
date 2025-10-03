import React from 'react';
import { useNavigate } from 'react-router-dom';
import Watchlist from '../components/Watchlist';

const WatchlistPage: React.FC = () => {
  const navigate = useNavigate();

  const handleMovieSelect = (movieId: string) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Minha Lista para Assistir</h1>
          <p className="text-gray-400">
            Filmes que você adicionou para assistir mais tarde
          </p>
        </div>
        
        <Watchlist onMovieSelect={handleMovieSelect} />
      </div>
    </div>
  );
};

export default WatchlistPage;
