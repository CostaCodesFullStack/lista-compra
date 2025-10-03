// Configuração da API para diferentes ambientes
const getApiUrl = () => {
  // Se estiver definida uma URL específica, usar ela
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // Para produção, usar a URL da Vercel
  if (process.env.NODE_ENV === 'production') {
    return 'https://netflix-clone-11epgtai1-costacodes-projects.vercel.app/api';
  }
  
  // Para desenvolvimento local
  return 'http://localhost:5000/api';
};

export const API_CONFIG = {
  baseURL: getApiUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// URLs específicas para diferentes serviços
export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    profile: '/auth/profile',
    changePassword: '/auth/password',
  },
  movies: {
    list: '/movies',
    detail: (id: string) => `/movies/${id}`,
    recommended: '/movies/recommended',
    rate: (id: string) => `/movies/${id}/rate`,
  },
  categories: {
    list: '/categories',
    detail: (id: string) => `/categories/${id}`,
  },
  users: {
    favorites: '/users/favorites',
    watchlist: '/users/watchlist',
    watchHistory: '/users/watch-history',
  },
};

export default API_CONFIG;
