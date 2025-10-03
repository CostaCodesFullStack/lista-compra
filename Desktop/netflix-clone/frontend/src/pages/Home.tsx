import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { movieService, categoryService } from '../services';
import Hero from '../components/Hero';
import MovieList from '../components/MovieList';

const HomeContainer = styled.div`
  background-color: #141414;
  min-height: 100vh;
`;

const Content = styled.div`
  padding-top: 70px; /* Altura do header */
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  color: white;
  font-size: 18px;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  color: #e50914;
  text-align: center;
`;

const Home: React.FC = () => {
  // Buscar filmes em destaque
  const { data: featuredMovies, isLoading: featuredLoading, error: featuredError } = useQuery(
    'featured-movies',
    () => movieService.getMovies({ featured: 'true', limit: 10 }),
    {
      staleTime: 5 * 60 * 1000, // 5 minutos
    }
  );

  // Buscar filmes em alta
  const { data: trendingMovies, isLoading: trendingLoading } = useQuery(
    'trending-movies',
    () => movieService.getMovies({ trending: 'true', limit: 10 }),
    {
      staleTime: 5 * 60 * 1000,
    }
  );

  // Buscar filmes recentes
  const { data: recentMovies, isLoading: recentLoading } = useQuery(
    'recent-movies',
    () => movieService.getMovies({ limit: 10 }),
    {
      staleTime: 5 * 60 * 1000,
    }
  );

  // Buscar filmes por categoria
  const { data: categories } = useQuery(
    'categories',
    categoryService.getCategories,
    {
      staleTime: 10 * 60 * 1000, // 10 minutos
    }
  );

  if (featuredLoading || trendingLoading || recentLoading) {
    return (
      <HomeContainer>
        <Content>
          <LoadingContainer>
            <div style={{
              width: '40px',
              height: '40px',
              border: '4px solid #333',
              borderTop: '4px solid #e50914',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            <span style={{ marginLeft: '10px' }}>Carregando conteúdo...</span>
          </LoadingContainer>
        </Content>
      </HomeContainer>
    );
  }

  if (featuredError) {
    return (
      <HomeContainer>
        <Content>
          <ErrorContainer>
            <div>
              <h2>❌ Erro ao carregar conteúdo</h2>
              <p>Tente recarregar a página</p>
            </div>
          </ErrorContainer>
        </Content>
      </HomeContainer>
    );
  }

  return (
    <HomeContainer>
      <Content>
        {/* Hero Section */}
        {featuredMovies?.movies && featuredMovies.movies.length > 0 && (
          <Hero movies={featuredMovies.movies} />
        )}

        {/* Filmes em Destaque */}
        {featuredMovies?.movies && (
          <Section>
            <MovieList
              title="Em Destaque"
              movies={featuredMovies.movies}
              loading={featuredLoading}
            />
          </Section>
        )}

        {/* Filmes em Alta */}
        {trendingMovies?.movies && (
          <Section>
            <MovieList
              title="Em Alta"
              movies={trendingMovies.movies}
              loading={trendingLoading}
            />
          </Section>
        )}

        {/* Filmes Recentes */}
        {recentMovies?.movies && (
          <Section>
            <MovieList
              title="Recém Adicionados"
              movies={recentMovies.movies}
              loading={recentLoading}
            />
          </Section>
        )}

        {/* Filmes por Categoria */}
        {categories && categories.length > 0 && (
          <>
            {categories.slice(0, 3).map((category: any) => (
              <CategorySection key={category._id} category={category} />
            ))}
          </>
        )}
      </Content>
    </HomeContainer>
  );
};

// Componente para seção de categoria
const CategorySection: React.FC<{ category: any }> = ({ category }) => {
  const { data: categoryMovies, isLoading } = useQuery(
    [`category-movies-${category._id}`],
    () => movieService.getMovies({ category: category.name, limit: 10 }),
    {
      staleTime: 5 * 60 * 1000,
    }
  );

  if (!categoryMovies?.movies || categoryMovies.movies.length === 0) {
    return null;
  }

  return (
    <Section>
      <MovieList
        title={category.name}
        movies={categoryMovies.movies}
        loading={isLoading}
      />
    </Section>
  );
};

export default Home;
