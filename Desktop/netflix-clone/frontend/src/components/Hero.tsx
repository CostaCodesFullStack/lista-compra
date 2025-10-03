import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';
import { Movie } from '../types';

const HeroContainer = styled.div<{ $backgroundImage: string }>`
  position: relative;
  height: 100vh;
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(0, 0, 0, 0.7) 100%
    ),
    url(${props => props.$backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 4%;
`;

const HeroContent = styled.div`
  max-width: 600px;
  color: white;
  z-index: 2;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  line-height: 1.1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const HeroDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.4;
  margin-bottom: 30px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }
`;

const PlayButton = styled(Link)`
  background: white;
  color: black;
  padding: 12px 24px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.8);
    transform: scale(1.05);
  }

  @media (max-width: 480px) {
    justify-content: center;
    padding: 15px 24px;
  }
`;

const InfoButton = styled(Link)`
  background: rgba(109, 109, 110, 0.7);
  color: white;
  padding: 12px 24px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(109, 109, 110, 0.9);
    transform: scale(1.05);
  }

  @media (max-width: 480px) {
    justify-content: center;
    padding: 15px 24px;
  }
`;

const MovieMeta = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  font-size: 14px;
  color: #ccc;

  @media (max-width: 480px) {
    flex-wrap: wrap;
    gap: 10px;
  }
`;

const MetaItem = styled.span`
  background: rgba(0, 0, 0, 0.5);
  padding: 4px 8px;
  border-radius: 4px;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: #ffd700;
  margin-bottom: 20px;
`;

interface HeroProps {
  movies: Movie[];
}

const Hero: React.FC<HeroProps> = ({ movies }) => {
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (movies && movies.length > 0) {
      // Encontrar filme em destaque ou usar o primeiro
      const featuredMovie = movies.find(movie => movie.isFeatured) || movies[0];
      setCurrentMovie(featuredMovie);
    }
  }, [movies]);

  if (!currentMovie) {
    return null;
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <HeroContainer $backgroundImage={currentMovie.thumbnail}>
      <HeroContent>
        <HeroTitle>{currentMovie.title}</HeroTitle>
        
        <MovieMeta>
          <MetaItem>{currentMovie.year}</MetaItem>
          <MetaItem>{formatDuration(currentMovie.duration)}</MetaItem>
          <MetaItem>{currentMovie.ageRating}</MetaItem>
          <MetaItem>{currentMovie.genres.join(', ')}</MetaItem>
        </MovieMeta>

        <Rating>
          <span>⭐ {currentMovie.rating.toFixed(1)}</span>
          <span>•</span>
          <span>{currentMovie.views.toLocaleString()} visualizações</span>
        </Rating>

        <HeroDescription>{currentMovie.description}</HeroDescription>

        <HeroButtons>
          <PlayButton to={`/movie/${currentMovie._id}`}>
            <FaPlay size={16} />
            Assistir Agora
          </PlayButton>
          
          <InfoButton to={`/movie/${currentMovie._id}`}>
            <FaInfoCircle size={16} />
            Mais Informações
          </InfoButton>
        </HeroButtons>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;
