export interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  isAdmin: boolean;
  subscription: {
    type: 'basic' | 'premium' | 'ultra';
    startDate: string;
    endDate: string;
  };
  favoriteMovies: string[];
  watchlist: WatchlistItem[];
  watchHistory: WatchHistory[];
}

export interface WatchlistItem {
  movie: Movie;
  addedAt: string;
}

export interface WatchHistory {
  movie: Movie;
  watchedAt: string;
  progress: number;
}

export interface Movie {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  trailer: string;
  video: string;
  duration: number;
  year: number;
  rating: number;
  genres: string[];
  category: Category;
  ageRating: 'L' | '10' | '12' | '14' | '16' | '18';
  isFeatured: boolean;
  isTrending: boolean;
  views: number;
  likes: number;
  dislikes: number;
  cast: Cast[];
  director: string;
  country: string;
  language: string;
  subtitles: string[];
  audioLanguages: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
  description: string;
  image: string;
  color: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface Cast {
  name: string;
  character: string;
  image: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  errors?: any[];
}

export interface PaginationResponse<T> {
  data: T[];
  pagination: {
    current: number;
    pages: number;
    total: number;
  };
}

export interface WatchlistResponse {
  watchlist: WatchlistItem[];
  total: number;
}

export interface WatchlistStatusResponse {
  isInWatchlist: boolean;
  movieId: string;
}

export interface WatchlistStatsResponse {
  totalWatchlist: number;
  totalWatched: number;
  genreAnalysis: {
    mostCommonGenre: string | null;
    genreCount: Record<string, number>;
  };
  yearAnalysis: Record<string, number>;
}
