# 🎬 Netflix Clone

Um clone completo do Netflix construído com tecnologias modernas, incluindo backend em Node.js e frontend em React.

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Banco de dados
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticação
- **bcryptjs** - Criptografia de senhas
- **Cloudinary** - Upload de imagens

### Frontend
- **React 18** - Biblioteca de interface
- **TypeScript** - Tipagem estática
- **React Router** - Roteamento
- **Styled Components** - CSS-in-JS
- **React Query** - Gerenciamento de estado servidor
- **Axios** - Cliente HTTP
- **React Player** - Player de vídeo

## 📋 Funcionalidades

### ✅ Implementadas
- **Sistema de autenticação completo** (Login/Registro)
- **Página inicial** com filmes em destaque
- **Detalhes do filme** com player de vídeo
- **Sistema de favoritos**
- **Gerenciamento de usuários** (Admin)
- **CRUD completo de filmes e categorias**
- **Design responsivo** com tema Netflix
- **API RESTful** completa
- **Validação de dados** no backend e frontend
- **Sistema de avaliações** de filmes
- **Histórico de visualização**

### 🔄 Em Desenvolvimento
- Sistema de busca avançada
- Player de vídeo com controles avançados
- Sistema de comentários
- Recomendações personalizadas
- Sistema de assinaturas
- Upload de vídeos

## 🏗️ Estrutura do Projeto

```
netflix-clone/
├── backend/                 # API Node.js
│   ├── src/
│   │   ├── controllers/     # Controladores
│   │   ├── models/         # Modelos MongoDB
│   │   ├── routes/         # Rotas da API
│   │   ├── middlewares/    # Middlewares
│   │   └── server.js       # Servidor principal
│   ├── package.json
│   └── README.md
├── frontend/               # App React
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── pages/         # Páginas
│   │   ├── contexts/      # Contextos
│   │   ├── services/      # Serviços de API
│   │   ├── types/         # Tipos TypeScript
│   │   └── App.tsx        # App principal
│   ├── package.json
│   └── README.md
└── README.md              # Este arquivo
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js (v16 ou superior)
- MongoDB (local ou Atlas)
- npm ou yarn

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd netflix-clone
```

### 2. Configure o Backend
```bash
cd backend
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações

# Execute o servidor
npm run dev
```

### 3. Configure o Frontend
```bash
cd frontend
npm install

# Configure as variáveis de ambiente
# Crie um arquivo .env com:
REACT_APP_API_URL=http://localhost:5000/api

# Execute o frontend
npm start
```

### 4. Acesse a aplicação
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📚 Documentação da API

### Autenticação
- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Obter perfil
- `PUT /api/auth/profile` - Atualizar perfil

### Filmes
- `GET /api/movies` - Listar filmes
- `GET /api/movies/:id` - Obter filme por ID
- `POST /api/movies` - Criar filme (Admin)
- `PUT /api/movies/:id` - Atualizar filme (Admin)
- `DELETE /api/movies/:id` - Deletar filme (Admin)
- `POST /api/movies/:id/rate` - Avaliar filme

### Usuários
- `GET /api/users` - Listar usuários (Admin)
- `POST /api/users/favorites/:movieId` - Adicionar aos favoritos
- `GET /api/users/favorites` - Obter favoritos
- `POST /api/users/watch-history` - Adicionar ao histórico

## 🔐 Autenticação

O sistema usa JWT para autenticação. Inclua o token no header:
```
Authorization: Bearer <token>
```

## 🎨 Design

O projeto segue o design system do Netflix com:
- Cores: Vermelho (#e50914), Preto (#141414), Branco (#ffffff)
- Tipografia: Netflix Sans, Helvetica Neue
- Componentes responsivos
- Animações suaves
- Tema escuro

## 📱 Responsividade

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🛡️ Segurança

- Rate limiting
- Validação de dados
- Criptografia de senhas
- CORS configurado
- Headers de segurança
- Sanitização de inputs

## 🧪 Testes

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

## 🚀 Deploy

### Backend (Heroku/Railway)
1. Conecte o repositório
2. Configure as variáveis de ambiente
3. Deploy automático

### Frontend (Netlify/Vercel)
1. Conecte o repositório
2. Configure build command: `npm run build`
3. Configure publish directory: `build`
4. Configure variáveis de ambiente

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Autores

- **Desenvolvedor** - [Seu Nome](https://github.com/seuusuario)

## 🙏 Agradecimentos

- Netflix pelo design inspirador
- Comunidade React e Node.js
- Todos os contribuidores do projeto
