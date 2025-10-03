import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

const LoginContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    #141414 0%,
    #1a1a1a 50%,
    #141414 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const LoginCard = styled.div`
  background: rgba(0, 0, 0, 0.8);
  padding: 40px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
`;

const Logo = styled(Link)`
  color: #e50914;
  font-size: 32px;
  font-weight: bold;
  text-decoration: none;
  display: block;
  text-align: center;
  margin-bottom: 30px;
  font-family: 'Netflix Sans', sans-serif;
`;

const Title = styled.h1`
  color: white;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: white;
  font-size: 14px;
  font-weight: 500;
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  padding: 12px 16px;
  color: white;
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #e50914;
    background: rgba(255, 255, 255, 0.15);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const Button = styled.button<{ loading?: boolean }>`
  background: #e50914;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover:not(:disabled) {
    background: #f40612;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 20px 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255, 255, 255, 0.2);
  }
`;

const DividerText = styled.span`
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
`;

const LinkText = styled(Link)`
  color: #e50914;
  text-decoration: none;
  font-size: 14px;
  text-align: center;
  display: block;
  margin-top: 20px;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.div`
  background: rgba(229, 9, 20, 0.1);
  border: 1px solid #e50914;
  color: #e50914;
  padding: 12px;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
`;

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.email.split('@')[0], formData.email, formData.password);
      }
      navigate('/');
    } catch (error: any) {
      setError(error.response?.data?.message || 'Erro ao processar solicitação');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Logo to="/">NETFLIX</Logo>
        
        <Title>{isLogin ? 'Entrar' : 'Criar Conta'}</Title>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Digite seu email"
              required
            />
          </InputGroup>

          <InputGroup>
            <Label htmlFor="password">Senha</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Digite sua senha"
              required
            />
          </InputGroup>

          <Button type="submit" loading={loading} disabled={loading}>
            {loading ? (
              <>
                <div className="loading-spinner" />
                {isLogin ? 'Entrando...' : 'Criando conta...'}
              </>
            ) : (
              isLogin ? 'Entrar' : 'Criar Conta'
            )}
          </Button>
        </Form>

        <Divider>
          <DividerText>ou</DividerText>
        </Divider>

        <Button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          style={{ background: 'rgba(255, 255, 255, 0.1)' }}
        >
          {isLogin ? 'Criar nova conta' : 'Já tenho uma conta'}
        </Button>

        <LinkText to="/">Voltar ao início</LinkText>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
