import axios from 'axios';
import { LoginData, RegisterData, User } from '../types';

// Configuração da API baseada na variável de ambiente
const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://netflix-clone.vercel.app/api' 
    : 'http://localhost:5000/api');

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token automaticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de resposta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Evitar loop infinito verificando se já estamos na página de login
      if (window.location.pathname !== '/login') {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
    
    // Log do erro para debug
    if (process.env.NODE_ENV === 'development') {
      console.error('API Error:', error.response?.data || error.message);
    }
    
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (data: LoginData) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterData) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  getProfile: async (): Promise<User> => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await api.put('/auth/profile', data);
    return response.data;
  },

  changePassword: async (currentPassword: string, newPassword: string) => {
    const response = await api.put('/auth/password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  },
};

export const movieService = {
  getMovies: async (params?: any) => {
    const response = await api.get('/movies', { params });
    return response.data;
  },

  getMovieById: async (id: string) => {
    const response = await api.get(`/movies/${id}`);
    return response.data;
  },

  getRecommendedMovies: async () => {
    const response = await api.get('/movies/recommended');
    return response.data;
  },

  rateMovie: async (id: string, rating: number) => {
    const response = await api.post(`/movies/${id}/rate`, { rating });
    return response.data;
  },

  addToFavorites: async (movieId: string) => {
    const response = await api.post(`/users/favorites/${movieId}`);
    return response.data;
  },

  removeFromFavorites: async (movieId: string) => {
    const response = await api.delete(`/users/favorites/${movieId}`);
    return response.data;
  },

  getFavorites: async () => {
    const response = await api.get('/users/favorites');
    return response.data;
  },

  addToWatchHistory: async (movieId: string, progress: number) => {
    const response = await api.post('/users/watch-history', {
      movieId,
      progress,
    });
    return response.data;
  },

  getWatchHistory: async () => {
    const response = await api.get('/users/watch-history');
    return response.data;
  },
};

export const categoryService = {
  getCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },

  getCategoryById: async (id: string) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },
};

export default api;
