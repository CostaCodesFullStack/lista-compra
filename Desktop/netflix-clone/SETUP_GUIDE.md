# 🚀 GUIA DE CONFIGURAÇÃO - NETFLIX CLONE

## 📋 CONFIGURAÇÃO RÁPIDA

### 1. **Configuração do Backend**

Crie um arquivo `.env` na pasta `backend/`:

```env
# Configurações do MongoDB
MONGODB_URI=mongodb://localhost:27017/netflix-clone

# Configurações JWT
JWT_SECRET=seu-jwt-secret-super-seguro-aqui
JWT_EXPIRE=7d

# Configurações do Servidor
NODE_ENV=development
PORT=5000

# URL do Frontend (para CORS)
FRONTEND_URL=http://localhost:3000
```

### 2. **Configuração do Frontend**

Crie um arquivo `.env` na pasta `frontend/`:

```env
# URL da API
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. **Instalação e Execução**

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (em outro terminal)
cd frontend
npm install
npm start
```

---

## 🔧 COMANDOS DE DESENVOLVIMENTO

### Backend:
```bash
npm start          # Produção
npm run dev        # Desenvolvimento com nodemon
npm test           # Testes
```

### Frontend:
```bash
npm start          # Desenvolvimento
npm run build      # Build para produção
npm test           # Testes
```

---

## 🛡️ CONFIGURAÇÕES DE SEGURANÇA

### Para Produção:

1. **Nunca commite** arquivos `.env`
2. **Use chaves JWT fortes** (mínimo 32 caracteres)
3. **Configure CORS** com domínios específicos
4. **Use HTTPS** em produção
5. **Configure rate limiting** adequado

### Variáveis de Ambiente Obrigatórias:

- `MONGODB_URI` - URI do banco de dados
- `JWT_SECRET` - Chave secreta para JWT
- `NODE_ENV` - Ambiente (development/production)

---

## 🐛 SOLUÇÃO DE PROBLEMAS COMUNS

### 1. **Erro de Conexão com MongoDB**
- Verifique se o MongoDB está rodando
- Confirme a URI no arquivo `.env`
- Teste a conexão com MongoDB Compass

### 2. **Erro de CORS**
- Verifique se `FRONTEND_URL` está correto
- Confirme se o frontend está rodando na porta 3000
- Teste com diferentes navegadores

### 3. **Erro de Autenticação**
- Verifique se `JWT_SECRET` está definido
- Confirme se o token está sendo enviado corretamente
- Verifique os logs do servidor

### 4. **Erro 404 na API**
- Confirme se o backend está rodando na porta 5000
- Verifique se as rotas estão configuradas corretamente
- Teste com Postman ou curl

---

## 📊 MONITORAMENTO

### Logs Importantes:
- Conexão com MongoDB
- Erros de autenticação
- Requests com status 4xx/5xx
- Performance de queries

### Métricas a Acompanhar:
- Tempo de resposta da API
- Taxa de erro de autenticação
- Uso de memória do servidor
- Conexões ativas com MongoDB

---

## 🔄 DEPLOY

### Vercel (Recomendado):

1. **Backend:**
   - Conecte o repositório ao Vercel
   - Configure as variáveis de ambiente
   - Deploy automático

2. **Frontend:**
   - Conecte o repositório ao Vercel
   - Configure `REACT_APP_API_URL` com a URL do backend
   - Deploy automático

### Variáveis de Ambiente para Produção:

```env
# Backend
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/netflix-clone
JWT_SECRET=jwt-secret-super-seguro-para-producao
JWT_EXPIRE=7d
NODE_ENV=production
FRONTEND_URL=https://seu-frontend.vercel.app

# Frontend
REACT_APP_API_URL=https://seu-backend.vercel.app/api
```

---

## ✅ CHECKLIST DE CONFIGURAÇÃO

- [ ] Arquivo `.env` criado no backend
- [ ] Arquivo `.env` criado no frontend
- [ ] MongoDB configurado e rodando
- [ ] Backend rodando na porta 5000
- [ ] Frontend rodando na porta 3000
- [ ] Teste de conexão entre frontend e backend
- [ ] Teste de autenticação funcionando
- [ ] Teste de carregamento de filmes
- [ ] Configuração de CORS funcionando
- [ ] Logs de erro configurados

---

**Status:** ✅ Configuração Completa
**Última Atualização:** $(date)
