import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaPlay, FaHeart, FaRegHeart, FaPlus, FaCheck } from 'react-icons/fa';
import { Movie } from '../types';
import { movieService, watchlistService } from '../services';
import toast from 'react-hot-toast';

const MovieCardContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
    z-index: 10;
  }

  @media (max-width: 768px) {
    height: 150px;
  }
`;

const MovieImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MovieOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    transparent 50%,
    rgba(0, 0, 0, 0.8) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;

  ${MovieCardContainer}:hover & {
    opacity: 1;
  }
`;

const MovieInfo = styled.div`
  color: white;
`;

const MovieTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
  line-height: 1.2;
`;

const MovieMeta = styled.div`
  font-size: 12px;
  color: #ccc;
  margin-bottom: 10px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  background: ${props => props.variant === 'primary' ? '#e50914' : 'rgba(255, 255, 255, 0.2)'};
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.variant === 'primary' ? '#f40612' : 'rgba(255, 255, 255, 0.3)'};
    transform: scale(1.1);
  }
`;

const PlayButton = styled(Link)`
  background: #e50914;
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: #f40612;
    transform: scale(1.1);
  }
`;

const Rating = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
`;

const AgeRating = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
`;

interface MovieCardProps {
  movie: Movie;
  isFavorite?: boolean;
  isInWatchlist?: boolean;
  onToggleFavorite?: (movieId: string) => void;
  onToggleWatchlist?: (movieId: string) => void;
  onSelect?: (movieId: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ 
  movie, 
  isFavorite = false, 
  isInWatchlist = false,
  onToggleFavorite,
  onToggleWatchlist,
  onSelect
}) => {
  const [favorite, setFavorite] = useState(isFavorite);
  const [inWatchlist, setInWatchlist] = useState(isInWatchlist);
  const [loading, setLoading] = useState(false);
  const [watchlistLoading, setWatchlistLoading] = useState(false);

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      setLoading(true);
      
      if (favorite) {
        await movieService.removeFromFavorites(movie._id);
        setFavorite(false);
        toast.success('Removido dos favoritos');
      } else {
        await movieService.addToFavorites(movie._id);
        setFavorite(true);
        toast.success('Adicionado aos favoritos');
      }
      
      if (onToggleFavorite) {
        onToggleFavorite(movie._id);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao atualizar favoritos');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleWatchlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      setWatchlistLoading(true);
      
      if (inWatchlist) {
        await watchlistService.removeFromWatchlist(movie._id);
        setInWatchlist(false);
        toast.success('Removido da lista para assistir');
      } else {
        await watchlistService.addToWatchlist(movie._id);
        setInWatchlist(true);
        toast.success('Adicionado à lista para assistir');
      }
      
      if (onToggleWatchlist) {
        onToggleWatchlist(movie._id);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao atualizar lista para assistir');
    } finally {
      setWatchlistLoading(false);
    }
  };

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(movie._id);
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <MovieCardContainer onClick={handleCardClick}>
      <MovieImage src={movie.thumbnail} alt={movie.title} />
      
      <AgeRating>{movie.ageRating}</AgeRating>
      
      <Rating>{movie.rating.toFixed(1)} ⭐</Rating>
      
      <MovieOverlay>
        <MovieInfo>
          <MovieTitle>{movie.title}</MovieTitle>
          <MovieMeta>
            {movie.year} • {formatDuration(movie.duration)} • {movie.genres.join(', ')}
          </MovieMeta>
          
          <ActionButtons>
            <PlayButton to={`/movie/${movie._id}`}>
              <FaPlay size={12} />
            </PlayButton>
            
            <ActionButton
              onClick={handleToggleFavorite}
              disabled={loading}
              title={favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            >
              {loading ? (
                <div className="loading-spinner" />
              ) : favorite ? (
                <FaHeart size={14} />
              ) : (
                <FaRegHeart size={14} />
              )}
            </ActionButton>
            
            <ActionButton
              onClick={handleToggleWatchlist}
              disabled={watchlistLoading}
              title={inWatchlist ? 'Remover da lista para assistir' : 'Adicionar à lista para assistir'}
            >
              {watchlistLoading ? (
                <div className="loading-spinner" />
              ) : inWatchlist ? (
                <FaCheck size={14} />
              ) : (
                <FaPlus size={14} />
              )}
            </ActionButton>
          </ActionButtons>
        </MovieInfo>
      </MovieOverlay>
    </MovieCardContainer>
  );
};

export default MovieCard;
