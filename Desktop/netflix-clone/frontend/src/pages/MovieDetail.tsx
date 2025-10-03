import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { FaPlay, FaHeart, FaRegHeart, FaArrowLeft, FaStar, FaClock, FaCalendarAlt, FaEye } from 'react-icons/fa';
import { movieService } from '../services';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const MovieDetailContainer = styled.div`
  min-height: 100vh;
  background-color: #141414;
  color: white;
`;

const BackButton = styled.button`
  position: fixed;
  top: 80px;
  left: 20px;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.7);
  border: none;
  color: white;
  padding: 10px 15px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.9);
    transform: scale(1.1);
  }
`;

const HeroSection = styled.div<{ backgroundImage: string }>`
  position: relative;
  height: 100vh;
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(0, 0, 0, 0.8) 100%
    ),
    url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VideoContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  padding: 0 20px;
`;

const MovieTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const MovieMeta = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
  font-size: 14px;
  color: #ccc;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  background: rgba(0, 0, 0, 0.5);
  padding: 5px 10px;
  border-radius: 4px;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
  font-size: 16px;
`;

const StarRating = styled.div`
  color: #ffd700;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 30px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const PlayButton = styled.button`
  background: #e50914;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;

  &:hover {
    background: #f40612;
    transform: scale(1.05);
  }
`;

const FavoriteButton = styled.button<{ isFavorite: boolean }>`
  background: ${props => props.isFavorite ? '#e50914' : 'rgba(255, 255, 255, 0.2)'};
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 15px 30px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.isFavorite ? '#f40612' : 'rgba(255, 255, 255, 0.3)'};
    transform: scale(1.05);
  }
`;

const DetailsSection = styled.div`
  padding: 40px 4%;
  max-width: 1200px;
  margin: 0 auto;
`;

const CastSection = styled.div`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  color: white;
`;

const CastGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
`;

const CastMember = styled.div`
  text-align: center;
`;

const CastImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const CastName = styled.h4`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 5px;
`;

const CastCharacter = styled.p`
  font-size: 12px;
  color: #ccc;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: white;
  font-size: 18px;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: #e50914;
  text-align: center;
`;

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const { data: movie, isLoading, error } = useQuery(
    ['movie', id],
    () => movieService.getMovieById(id!),
    {
      enabled: !!id,
      onSuccess: (data) => {
        if (user && user.favoriteMovies.includes(data._id)) {
          setIsFavorite(true);
        }
      },
    }
  );

  const handleToggleFavorite = async () => {
    if (!user) {
      toast.error('Faça login para adicionar aos favoritos');
      return;
    }

    try {
      if (isFavorite) {
        await movieService.removeFromFavorites(movie._id);
        setIsFavorite(false);
        toast.success('Removido dos favoritos');
      } else {
        await movieService.addToFavorites(movie._id);
        setIsFavorite(true);
        toast.success('Adicionado aos favoritos');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao atualizar favoritos');
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  if (isLoading) {
    return (
      <MovieDetailContainer>
        <LoadingContainer>
          <div className="loading-spinner" />
          <span style={{ marginLeft: '10px' }}>Carregando filme...</span>
        </LoadingContainer>
      </MovieDetailContainer>
    );
  }

  if (error || !movie) {
    return (
      <MovieDetailContainer>
        <ErrorContainer>
          <div>
            <h2>❌ Filme não encontrado</h2>
            <p>O filme que você está procurando não existe ou foi removido.</p>
          </div>
        </ErrorContainer>
      </MovieDetailContainer>
    );
  }

  return (
    <MovieDetailContainer>
      <BackButton onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </BackButton>

      <HeroSection backgroundImage={movie.thumbnail}>
        {isPlaying && movie.video ? (
          <VideoContainer>
            <ReactPlayer
              url={movie.video}
              playing={isPlaying}
              controls={true}
              width="100%"
              height="100%"
              onEnded={() => setIsPlaying(false)}
            />
          </VideoContainer>
        ) : (
          <Content>
            <MovieTitle>{movie.title}</MovieTitle>

            <MovieMeta>
              <MetaItem>
                <FaCalendarAlt />
                {movie.year}
              </MetaItem>
              <MetaItem>
                <FaClock />
                {formatDuration(movie.duration)}
              </MetaItem>
              <MetaItem>
                <FaEye />
                {movie.views.toLocaleString()} visualizações
              </MetaItem>
              <MetaItem>{movie.ageRating}</MetaItem>
            </MovieMeta>

            <Rating>
              <StarRating>
                <FaStar />
                {movie.rating.toFixed(1)}
              </StarRating>
              <span>•</span>
              <span>{movie.genres.join(', ')}</span>
            </Rating>

            <Description>{movie.description}</Description>

            <ActionButtons>
              <PlayButton onClick={handlePlay}>
                <FaPlay />
                {movie.video ? 'Assistir' : 'Trailer'}
              </PlayButton>
              
              <FavoriteButton
                isFavorite={isFavorite}
                onClick={handleToggleFavorite}
              >
                {isFavorite ? <FaHeart /> : <FaRegHeart />}
                {isFavorite ? 'Favorito' : 'Favoritar'}
              </FavoriteButton>
            </ActionButtons>
          </Content>
        )}
      </HeroSection>

      <DetailsSection>
        <CastSection>
          <SectionTitle>Elenco</SectionTitle>
          <CastGrid>
            {movie.cast.map((member: any, index: number) => (
              <CastMember key={index}>
                <CastImage
                  src={member.image || '/placeholder-actor.jpg'}
                  alt={member.name}
                />
                <CastName>{member.name}</CastName>
                <CastCharacter>{member.character}</CastCharacter>
              </CastMember>
            ))}
          </CastGrid>
        </CastSection>

        <CastSection>
          <SectionTitle>Informações</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <div>
              <h4>Diretor</h4>
              <p>{movie.director}</p>
            </div>
            <div>
              <h4>País</h4>
              <p>{movie.country}</p>
            </div>
            <div>
              <h4>Idioma</h4>
              <p>{movie.language}</p>
            </div>
            <div>
              <h4>Categoria</h4>
              <p>{movie.category?.name}</p>
            </div>
          </div>
        </CastSection>
      </DetailsSection>
    </MovieDetailContainer>
  );
};

export default MovieDetail;
