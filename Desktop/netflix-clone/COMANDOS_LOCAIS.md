# 🏠 Comandos para Execução Local

## 🚀 **Backend Local**

```bash
# Navegar para a pasta do backend
cd backend

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# OU iniciar servidor de produção
npm start
```

**Backend estará disponível em**: `http://localhost:5000`

---

## 🎨 **Frontend Local**

```bash
# Navegar para a pasta do frontend
cd frontend

# Instalar dependências
npm install

# Iniciar aplicação React
npm start
```

**Frontend estará disponível em**: `http://localhost:3000`

---

## 🔄 **Execução Simultânea**

### Opção 1: Terminais Separados
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend  
cd frontend && npm start
```

### Opção 2: Script Automatizado
```bash
# Executar ambos simultaneamente
npm run dev
```

---

## 🧪 **Testes Locais**

### Teste da API
```bash
# Teste básico
curl http://localhost:5000/api/test

# Teste de categorias
curl http://localhost:5000/api/categories

# Teste de filmes
curl http://localhost:5000/api/movies
```

### Teste do Frontend
1. Acesse `http://localhost:3000`
2. Teste registro de usuário
3. Teste login
4. Verifique listagem de filmes

---

## 🔧 **Variáveis de Ambiente Locais**

### Backend (.env)
```
MONGODB_URI=mongodb+srv://cauadevcosta_db_user:caua123costa@netflixclone.fcajxx6.mongodb.net/?retryWrites=true&w=majority&appName=netflixclone
JWT_SECRET=netflix-clone-secret-key-2024-production
JWT_EXPIRE=7d
NODE_ENV=development
PORT=5000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 📊 **Logs e Debug**

### Backend
```bash
# Ver logs detalhados
DEBUG=* npm run dev

# Ver apenas logs de erro
npm run dev 2>&1 | grep ERROR
```

### Frontend
```bash
# Ver logs de build
npm run build

# Ver logs de desenvolvimento
npm start
```

---

## 🛠️ **Comandos Úteis**

### Limpar Cache
```bash
# Backend
rm -rf node_modules package-lock.json
npm install

# Frontend
rm -rf node_modules package-lock.json
npm install
```

### Verificar Portas
```bash
# Verificar se as portas estão em uso
netstat -tulpn | grep :5000  # Backend
netstat -tulpn | grep :3000  # Frontend
```

### Testar Conectividade
```bash
# Testar se o backend está respondendo
curl -I http://localhost:5000/api/test

# Testar se o frontend está respondendo
curl -I http://localhost:3000
```
