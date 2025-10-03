# Netflix Clone Backend

## 📋 Descrição
Backend completo para Netflix Clone com autenticação, gerenciamento de filmes, categorias e usuários.

## 🚀 Tecnologias
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Banco de dados
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticação
- **bcryptjs** - Criptografia de senhas
- **Cloudinary** - Upload de imagens

## 📦 Instalação

1. Instalar dependências:
```bash
npm install
```

2. Configurar variáveis de ambiente:
```bash
cp .env.example .env
```

3. Configurar MongoDB (local ou Atlas)

4. Executar o servidor:
```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

## 🔧 Configuração

### Variáveis de Ambiente
- `MONGODB_URI` - URL do MongoDB
- `JWT_SECRET` - Chave secreta para JWT
- `JWT_EXPIRE` - Tempo de expiração do token
- `PORT` - Porta do servidor
- `CLOUDINARY_*` - Configurações do Cloudinary

## 📚 API Endpoints

### Autenticação
- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Obter perfil
- `PUT /api/auth/profile` - Atualizar perfil
- `PUT /api/auth/password` - Alterar senha

### Filmes
- `GET /api/movies` - Listar filmes
- `GET /api/movies/:id` - Obter filme por ID
- `POST /api/movies` - Criar filme (Admin)
- `PUT /api/movies/:id` - Atualizar filme (Admin)
- `DELETE /api/movies/:id` - Deletar filme (Admin)
- `POST /api/movies/:id/rate` - Avaliar filme
- `GET /api/movies/recommended` - Filmes recomendados

### Categorias
- `GET /api/categories` - Listar categorias
- `GET /api/categories/:id` - Obter categoria por ID
- `POST /api/categories` - Criar categoria (Admin)
- `PUT /api/categories/:id` - Atualizar categoria (Admin)
- `DELETE /api/categories/:id` - Deletar categoria (Admin)

### Usuários
- `GET /api/users` - Listar usuários (Admin)
- `GET /api/users/:id` - Obter usuário por ID (Admin)
- `PUT /api/users/:id` - Atualizar usuário (Admin)
- `DELETE /api/users/:id` - Deletar usuário (Admin)
- `POST /api/users/favorites/:movieId` - Adicionar aos favoritos
- `DELETE /api/users/favorites/:movieId` - Remover dos favoritos
- `GET /api/users/favorites` - Obter favoritos
- `POST /api/users/watch-history` - Adicionar ao histórico
- `GET /api/users/watch-history` - Obter histórico

## 🔐 Autenticação
O sistema usa JWT para autenticação. Inclua o token no header:
```
Authorization: Bearer <token>
```

## 📊 Modelos de Dados

### User
- Informações pessoais
- Favoritos
- Histórico de visualização
- Assinatura

### Movie
- Informações do filme
- Categorização
- Avaliações
- Estatísticas

### Category
- Nome e descrição
- Cor e imagem
- Ordenação

## 🛡️ Segurança
- Rate limiting
- Helmet para headers de segurança
- Validação de dados
- Criptografia de senhas
- CORS configurado
