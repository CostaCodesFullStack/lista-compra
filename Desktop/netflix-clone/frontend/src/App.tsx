import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import MovieDetail from './pages/MovieDetail';
import WatchlistPage from './pages/WatchlistPage';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #141414;
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
        {/* Adicionar mais rotas conforme necessário */}
      </Routes>
    </AppContainer>
  );
};

export default App;
