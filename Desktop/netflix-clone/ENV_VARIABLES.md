# 🔧 VARIÁVEIS DE AMBIENTE PARA PRODUÇÃO

## 📋 CONFIGURAÇÃO NA VERCEL

### **Backend (netflix-clone-backend)**

Configure as seguintes variáveis de ambiente na Vercel:

```env
# MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/netflix-clone?retryWrites=true&w=majority

# JWT
JWT_SECRET=seu-jwt-secret-super-seguro-minimo-32-caracteres
JWT_EXPIRE=7d

# Servidor
NODE_ENV=production
PORT=5000

# CORS
FRONTEND_URL=https://netflix-clone-frontend.vercel.app
```

### **Frontend (netflix-clone-frontend)**

Configure as seguintes variáveis de ambiente na Vercel:

```env
# API URL
REACT_APP_API_URL=https://netflix-clone-backend.vercel.app/api
```

---

## 🚀 PASSO A PASSO PARA CONFIGURAR NA VERCEL

### 1. **Deploy do Backend**

1. Acesse [vercel.com](https://vercel.com)
2. Conecte seu repositório GitHub
3. Selecione a pasta `backend/`
4. Configure as variáveis de ambiente acima
5. Deploy

### 2. **Deploy do Frontend**

1. Conecte o mesmo repositório
2. Selecione a pasta `frontend/`
3. Configure a variável `REACT_APP_API_URL` com a URL do backend
4. Deploy

### 3. **URLs Resultantes**

- **Backend:** `https://netflix-clone-backend.vercel.app`
- **Frontend:** `https://netflix-clone-frontend.vercel.app`

---

## 🔐 CONFIGURAÇÃO DO MONGODB ATLAS

### 1. **Criar Cluster**
1. Acesse [MongoDB Atlas](https://cloud.mongodb.com)
2. Crie um novo cluster
3. Configure o acesso de rede (0.0.0.0/0 para desenvolvimento)
4. Crie um usuário de banco de dados

### 2. **Obter String de Conexão**
1. Clique em "Connect" no cluster
2. Selecione "Connect your application"
3. Copie a string de conexão
4. Substitua `<password>` pela senha do usuário
5. Substitua `<dbname>` por `netflix-clone`

### 3. **Exemplo de String**
```
mongodb+srv://netflixuser:senha123@cluster0.abc123.mongodb.net/netflix-clone?retryWrites=true&w=majority
```

---

## 🛡️ SEGURANÇA

### **JWT Secret**
- Use uma string aleatória de pelo menos 32 caracteres
- Exemplo: `jwt-secret-super-seguro-para-producao-2024-netflix-clone`

### **MongoDB**
- Use senhas fortes
- Configure IP whitelist adequadamente
- Use SSL/TLS

---

## ✅ CHECKLIST DE CONFIGURAÇÃO

- [ ] MongoDB Atlas configurado
- [ ] Cluster criado e acessível
- [ ] Usuário de banco criado
- [ ] String de conexão obtida
- [ ] Backend deployado na Vercel
- [ ] Variáveis de ambiente configuradas no backend
- [ ] Frontend deployado na Vercel
- [ ] Variável REACT_APP_API_URL configurada
- [ ] Teste de conexão entre frontend e backend
- [ ] Teste de autenticação funcionando
- [ ] Teste de carregamento de filmes

---

**Status:** ✅ Configuração Completa
**Última Atualização:** $(date)
