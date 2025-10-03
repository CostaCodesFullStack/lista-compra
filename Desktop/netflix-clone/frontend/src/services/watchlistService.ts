import api from './api';
import { 
  WatchlistResponse, 
  WatchlistStatusResponse, 
  WatchlistStatsResponse,
  ApiResponse 
} from '../types';

export const watchlistService = {
  // Obter watchlist do usuário
  getWatchlist: async (): Promise<WatchlistResponse> => {
    const response = await api.get('/watchlist');
    return response.data;
  },

  // Adicionar filme à watchlist
  addToWatchlist: async (movieId: string): Promise<ApiResponse<any>> => {
    const response = await api.post(`/watchlist/${movieId}`);
    return response.data;
  },

  // Remover filme da watchlist
  removeFromWatchlist: async (movieId: string): Promise<ApiResponse<any>> => {
    const response = await api.delete(`/watchlist/${movieId}`);
    return response.data;
  },

  // Verificar se filme está na watchlist
  checkWatchlistStatus: async (movieId: string): Promise<WatchlistStatusResponse> => {
    const response = await api.get(`/watchlist/${movieId}/status`);
    return response.data;
  },

  // Marcar filme como assistido
  markAsWatched: async (movieId: string, progress: number = 100): Promise<ApiResponse<any>> => {
    const response = await api.post(`/watchlist/${movieId}/watched`, { progress });
    return response.data;
  },

  // Obter estatísticas da watchlist
  getWatchlistStats: async (): Promise<WatchlistStatsResponse> => {
    const response = await api.get('/watchlist/stats');
    return response.data;
  }
};
