# Instruções de Deploy - Netflix Clone

## Problemas Identificados e Corrigidos

### 1. Configuração do Vercel.json
- **Problema**: O `vercel.json` da raiz estava apontando para `backend/src/server.js` em vez de `api/index.js`
- **Solução**: Atualizado para usar `api/index.js` como ponto de entrada do backend

### 2. URLs das Imagens
- **Problema**: URLs das imagens estavam usando `localhost:5000` em vez da URL da Vercel
- **Solução**: Atualizadas para usar `https://netflix-clone-backend.vercel.app/images/`

### 3. Rotas da API
- **Problema**: Algumas rotas usadas pelo frontend não estavam implementadas
- **Solução**: Adicionadas rotas mockadas para:
  - `/api/movies/recommended`
  - `/api/watchlist`
  - `/api/users/favorites`
  - `/api/users/watch-history`

## Arquivos Modificados

### Backend
- `vercel.json` (raiz) - Configuração principal do deploy
- `backend/src/server.js` - URLs das imagens corrigidas
- `backend/vercel.json` - Rotas da API configuradas
- `api/index.js` - Rotas adicionais implementadas

### Frontend
- `frontend/vercel.json` - Já estava correto
- `frontend/src/config/api.ts` - Já estava correto
- `frontend/src/services/api.ts` - Já estava correto

## Passos para Deploy

### 1. Configurar Variáveis de Ambiente

#### Frontend (Vercel Dashboard)
```
REACT_APP_API_URL=https://netflix-clone-backend.vercel.app/api
```

#### Backend (Vercel Dashboard)
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://cauadevcosta_db_user:caua123costa@netflixclone.fcajxx6.mongodb.net/?retryWrites=true&w=majority&appName=netflixclone
JWT_SECRET=netflix-clone-secret-key-2024-production
JWT_EXPIRE=7d
```

### 2. Deploy do Backend
```bash
# Na pasta raiz do projeto
vercel --prod
```

### 3. Deploy do Frontend
```bash
# Na pasta frontend
cd frontend
vercel --prod
```

### 4. Testar as Rotas

Após o deploy, teste as seguintes rotas:

- `GET https://netflix-clone-backend.vercel.app/api/test`
- `GET https://netflix-clone-backend.vercel.app/api/movies`
- `GET https://netflix-clone-backend.vercel.app/api/categories`
- `GET https://netflix-clone-backend.vercel.app/api/movies/1`

### 5. Verificar Frontend

Acesse o frontend e verifique se:
- A página carrega sem erros 404
- Os filmes são exibidos corretamente
- As imagens carregam
- As categorias são exibidas

## Estrutura do Deploy

```
vercel.json (raiz)
├── Backend: api/index.js
├── Frontend: frontend/build/
└── Rotas:
    ├── /api/* → api/index.js
    ├── /static/* → frontend/build/static/*
    └── /* → frontend/build/index.html
```

## Troubleshooting

### Se ainda houver erro 404:
1. Verifique se a variável `REACT_APP_API_URL` está configurada corretamente
2. Verifique se o backend está deployado e funcionando
3. Verifique se as rotas estão sendo servidas corretamente
4. Verifique os logs da Vercel para erros específicos

### Se as imagens não carregarem:
1. Verifique se as URLs das imagens estão corretas
2. Verifique se os arquivos de imagem estão na pasta `backend/public/images/`
3. Verifique se a rota `/images` está configurada no servidor

## Status das Correções

✅ Configuração do vercel.json corrigida
✅ URLs das imagens corrigidas
✅ Rotas da API implementadas
✅ Variáveis de ambiente documentadas
✅ Instruções de deploy criadas
