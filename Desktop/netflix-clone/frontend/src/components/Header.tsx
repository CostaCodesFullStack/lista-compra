import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaSearch, FaBell, FaUser, FaCaretDown } from 'react-icons/fa';

const HeaderContainer = styled.header<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${props => props.$scrolled ? 'rgba(0, 0, 0, 0.9)' : 'transparent'};
  transition: background-color 0.3s ease;
  padding: 0 4%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(Link)`
  color: #e50914;
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  font-family: 'Netflix Sans', sans-serif;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #e50914;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input<{ $isOpen: boolean }>`
  background: rgba(0, 0, 0, 0.75);
  border: 1px solid #333;
  color: white;
  padding: 8px 12px 8px 35px;
  border-radius: 4px;
  font-size: 14px;
  width: ${props => props.$isOpen ? '200px' : '0'};
  opacity: ${props => props.$isOpen ? '1' : '0'};
  transition: all 0.3s ease;
  outline: none;

  &:focus {
    border-color: #e50914;
  }

  @media (max-width: 768px) {
    width: ${props => props.$isOpen ? '150px' : '0'};
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 10px;
  color: white;
  cursor: pointer;
  z-index: 1;
`;

const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const DropdownMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background: rgba(0, 0, 0, 0.9);
  border: 1px solid #333;
  border-radius: 4px;
  min-width: 200px;
  opacity: ${props => props.$isOpen ? '1' : '0'};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.$isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  transition: all 0.3s ease;
  z-index: 1001;
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 12px 16px;
  color: white;
  text-decoration: none;
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &:first-child {
    border-radius: 4px 4px 0 0;
  }

  &:last-child {
    border-radius: 0 0 4px 4px;
  }
`;

const LogoutButton = styled.button`
  display: block;
  width: 100%;
  padding: 12px 16px;
  background: none;
  border: none;
  color: white;
  text-align: left;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setUserMenuOpen(false);
  };

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
  };

  const handleUserMenuToggle = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  return (
    <HeaderContainer $scrolled={scrolled}>
      <Logo to="/">NETFLIX</Logo>
      
      <Nav>
        <NavLink to="/">Início</NavLink>
        <NavLink to="/movies">Filmes</NavLink>
        <NavLink to="/series">Séries</NavLink>
        <NavLink to="/categories">Categorias</NavLink>
        
        <SearchContainer>
          <SearchIcon onClick={handleSearchToggle} />
          <SearchInput
            type="text"
            placeholder="Buscar filmes..."
            $isOpen={searchOpen}
          />
        </SearchContainer>

        {user ? (
          <UserMenu>
            <FaBell style={{ color: 'white', cursor: 'pointer' }} />
            <UserButton onClick={handleUserMenuToggle}>
              <FaUser />
              <span>{user.name}</span>
              <FaCaretDown />
            </UserButton>
            
            <DropdownMenu $isOpen={userMenuOpen}>
              <DropdownItem to="/profile">Meu Perfil</DropdownItem>
              <DropdownItem to="/watchlist">Minha Lista</DropdownItem>
              <DropdownItem to="/favorites">Favoritos</DropdownItem>
              <DropdownItem to="/history">Histórico</DropdownItem>
              <LogoutButton onClick={handleLogout}>
                Sair
              </LogoutButton>
            </DropdownMenu>
          </UserMenu>
        ) : (
          <NavLink to="/login">Entrar</NavLink>
        )}
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
