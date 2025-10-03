# Instruções de Configuração de Variáveis de Ambiente

## Frontend (React)

Crie um arquivo `.env` na pasta `frontend/` com o seguinte conteúdo:

```env
REACT_APP_API_URL=https://netflix-clone-backend.vercel.app/api
```

### Para desenvolvimento local:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Backend (Node.js)

As variáveis de ambiente do backend são configuradas automaticamente no Vercel através do arquivo `vercel.json`.

### Variáveis necessárias:
- `NODE_ENV=production`
- `PORT=5000`
- `MONGODB_URI` (já configurada no projeto)
- `JWT_SECRET` (já configurada no projeto)

## Deploy na Vercel

1. **Frontend**: Configure a variável `REACT_APP_API_URL` no painel da Vercel
2. **Backend**: As variáveis são configuradas automaticamente via `vercel.json`

## Teste das Rotas

Após o deploy, teste as seguintes rotas:

- `GET /api/test` - Rota de teste
- `GET /api/movies` - Lista de filmes
- `GET /api/categories` - Lista de categorias
- `GET /api/movies/1` - Detalhes de um filme específico
