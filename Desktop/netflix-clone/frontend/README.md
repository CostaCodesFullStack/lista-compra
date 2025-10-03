# Netflix Clone Frontend

## 📋 Descrição
Frontend moderno para Netflix Clone construído com React, TypeScript e styled-components.

## 🚀 Tecnologias
- **React 18** - Biblioteca de interface
- **TypeScript** - Tipagem estática
- **React Router** - Roteamento
- **Styled Components** - CSS-in-JS
- **React Query** - Gerenciamento de estado servidor
- **Axios** - Cliente HTTP
- **React Player** - Player de vídeo
- **Framer Motion** - Animações
- **React Hot Toast** - Notificações

## 📦 Instalação

1. Instalar dependências:
```bash
npm install
```

2. Configurar variáveis de ambiente:
```bash
# Criar arquivo .env
REACT_APP_API_URL=http://localhost:5000/api
```

3. Executar o projeto:
```bash
npm start
```

## 🎨 Funcionalidades

### ✅ Implementadas
- **Autenticação completa** (Login/Registro)
- **Página inicial** com filmes em destaque
- **Detalhes do filme** com player de vídeo
- **Sistema de favoritos**
- **Design responsivo**
- **Tema Netflix**
- **Navegação intuitiva**

### 🔄 Em Desenvolvimento
- Página de perfil do usuário
- Histórico de visualização
- Sistema de busca
- Filtros por categoria
- Player de vídeo avançado
- Sistema de avaliações

## 📱 Páginas

### `/` - Home
- Hero banner com filme em destaque
- Listas de filmes por categoria
- Filmes em alta e recentes

### `/login` - Login/Registro
- Formulário de login
- Formulário de registro
- Validação de dados

### `/movie/:id` - Detalhes do Filme
- Informações completas do filme
- Player de vídeo
- Sistema de favoritos
- Elenco e informações técnicas

## 🎯 Componentes Principais

### Header
- Navegação principal
- Busca de filmes
- Menu do usuário
- Logo Netflix

### MovieCard
- Card de filme com overlay
- Botões de ação (play, favoritar)
- Informações básicas
- Design responsivo

### MovieList
- Lista horizontal de filmes
- Grid de filmes
- Estados de loading/erro
- Layout flexível

### Hero
- Banner principal
- Filme em destaque
- Botões de ação
- Informações do filme

## 🔧 Configuração

### Variáveis de Ambiente
- `REACT_APP_API_URL` - URL da API backend

### Estrutura de Pastas
```
src/
├── components/     # Componentes reutilizáveis
├── contexts/       # Contextos React
├── hooks/          # Hooks customizados
├── pages/          # Páginas da aplicação
├── services/       # Serviços de API
├── types/          # Tipos TypeScript
└── utils/          # Utilitários
```

## 🎨 Design System

### Cores
- **Primária**: #e50914 (Vermelho Netflix)
- **Background**: #141414 (Preto)
- **Texto**: #ffffff (Branco)
- **Secundário**: #333333 (Cinza escuro)

### Tipografia
- **Fonte**: Netflix Sans, Helvetica Neue, Arial
- **Tamanhos**: 12px, 14px, 16px, 18px, 24px, 32px

### Componentes
- Botões com hover effects
- Cards com overlay
- Inputs estilizados
- Loading spinners
- Toast notifications

## 📱 Responsividade

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Adaptações
- Grid responsivo para filmes
- Menu mobile
- Botões adaptáveis
- Texto escalável

## 🚀 Deploy

### Build para Produção
```bash
npm run build
```

### Servir Build Local
```bash
npx serve -s build
```

### Deploy no Netlify/Vercel
- Conectar repositório
- Configurar build command: `npm run build`
- Configurar publish directory: `build`
- Configurar variáveis de ambiente
