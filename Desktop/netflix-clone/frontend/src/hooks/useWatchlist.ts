import { useState, useCallback } from 'react';
import { watchlistService } from '../services/watchlistService';
import { WatchlistItem, WatchlistStatusResponse } from '../types';

export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar watchlist
  const loadWatchlist = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await watchlistService.getWatchlist();
      setWatchlist(response.watchlist);
    } catch (err) {
      setError('Erro ao carregar lista para assistir');
      console.error('Erro ao carregar watchlist:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Adicionar à watchlist
  const addToWatchlist = useCallback(async (movieId: string) => {
    try {
      await watchlistService.addToWatchlist(movieId);
      // Recarregar a watchlist para obter os dados atualizados
      await loadWatchlist();
      return true;
    } catch (err) {
      console.error('Erro ao adicionar à watchlist:', err);
      return false;
    }
  }, [loadWatchlist]);

  // Remover da watchlist
  const removeFromWatchlist = useCallback(async (movieId: string) => {
    try {
      await watchlistService.removeFromWatchlist(movieId);
      setWatchlist(prev => prev.filter(item => item.movie._id !== movieId));
      return true;
    } catch (err) {
      console.error('Erro ao remover da watchlist:', err);
      return false;
    }
  }, []);

  // Verificar se está na watchlist
  const checkWatchlistStatus = useCallback(async (movieId: string): Promise<boolean> => {
    try {
      const response: WatchlistStatusResponse = await watchlistService.checkWatchlistStatus(movieId);
      return response.isInWatchlist;
    } catch (err) {
      console.error('Erro ao verificar status da watchlist:', err);
      return false;
    }
  }, []);

  // Marcar como assistido
  const markAsWatched = useCallback(async (movieId: string, progress: number = 100) => {
    try {
      await watchlistService.markAsWatched(movieId, progress);
      setWatchlist(prev => prev.filter(item => item.movie._id !== movieId));
      return true;
    } catch (err) {
      console.error('Erro ao marcar como assistido:', err);
      return false;
    }
  }, []);

  // Verificar se filme está na watchlist (local)
  const isInWatchlist = useCallback((movieId: string): boolean => {
    return watchlist.some(item => item.movie._id === movieId);
  }, [watchlist]);

  return {
    watchlist,
    loading,
    error,
    loadWatchlist,
    addToWatchlist,
    removeFromWatchlist,
    checkWatchlistStatus,
    markAsWatched,
    isInWatchlist
  };
};
