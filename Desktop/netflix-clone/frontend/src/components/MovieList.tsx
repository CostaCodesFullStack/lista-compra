import React from 'react';
import styled from 'styled-components';
import { Movie } from '../types';
import MovieCard from './MovieCard';

const MovieListContainer = styled.div`
  margin-bottom: 40px;
`;

const ListTitle = styled.h2`
  color: white;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  padding-left: 4%;
`;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 0 4%;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 10px;
  }
`;

const HorizontalScroll = styled.div`
  display: flex;
  gap: 20px;
  padding: 0 4%;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const MovieItem = styled.div`
  flex: 0 0 200px;

  @media (max-width: 768px) {
    flex: 0 0 150px;
  }

  @media (max-width: 480px) {
    flex: 0 0 120px;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: white;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #e50914;
  text-align: center;
`;

const EmptyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #ccc;
  text-align: center;
`;

interface MovieListProps {
  title: string;
  movies: Movie[];
  loading?: boolean;
  error?: string;
  layout?: 'grid' | 'horizontal';
  showFavorites?: boolean;
  onToggleFavorite?: (movieId: string) => void;
}

const MovieList: React.FC<MovieListProps> = ({
  title,
  movies,
  loading = false,
  error,
  layout = 'horizontal',
  showFavorites = false,
  onToggleFavorite
}) => {
  if (loading) {
    return (
      <MovieListContainer>
        <ListTitle>{title}</ListTitle>
        <LoadingContainer>
          <div className="loading-spinner" />
          <span style={{ marginLeft: '10px' }}>Carregando...</span>
        </LoadingContainer>
      </MovieListContainer>
    );
  }

  if (error) {
    return (
      <MovieListContainer>
        <ListTitle>{title}</ListTitle>
        <ErrorContainer>
          <div>
            <p>❌ Erro ao carregar filmes</p>
            <p>{error}</p>
          </div>
        </ErrorContainer>
      </MovieListContainer>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <MovieListContainer>
        <ListTitle>{title}</ListTitle>
        <EmptyContainer>
          <div>
            <p>📽️ Nenhum filme encontrado</p>
            <p>Tente ajustar os filtros ou volte mais tarde</p>
          </div>
        </EmptyContainer>
      </MovieListContainer>
    );
  }

  if (layout === 'grid') {
    return (
      <MovieListContainer>
        <ListTitle>{title}</ListTitle>
        <MovieGrid>
          {movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              isFavorite={showFavorites}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </MovieGrid>
      </MovieListContainer>
    );
  }

  return (
    <MovieListContainer>
      <ListTitle>{title}</ListTitle>
      <HorizontalScroll>
        {movies.map((movie) => (
          <MovieItem key={movie._id}>
            <MovieCard
              movie={movie}
              isFavorite={showFavorites}
              onToggleFavorite={onToggleFavorite}
            />
          </MovieItem>
        ))}
      </HorizontalScroll>
    </MovieListContainer>
  );
};

export default MovieList;
