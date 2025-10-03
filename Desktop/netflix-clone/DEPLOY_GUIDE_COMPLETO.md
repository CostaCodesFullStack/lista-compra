# 🚀 Guia Completo de Deploy - Netflix Clone

## 📋 Pré-requisitos
- Conta na Vercel
- Repositório GitHub com o projeto
- MongoDB Atlas configurado

---

## 🔧 **1️⃣ DEPLOY DO BACKEND**

### Passo 1: Conectar Repositório
1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Conecte seu repositório GitHub
4. Selecione o repositório do Netflix Clone

### Passo 2: Configurar Projeto Backend
1. **Root Directory**: `backend`
2. **Framework Preset**: `Other`
3. **Build Command**: (deixar vazio)
4. **Output Directory**: (deixar vazio)
5. **Install Command**: `npm install`

### Passo 3: Configurar Variáveis de Ambiente
Adicione as seguintes variáveis em Settings > Environment Variables:

```
MONGODB_URI=mongodb+srv://cauadevcosta_db_user:caua123costa@netflixclone.fcajxx6.mongodb.net/?retryWrites=true&w=majority&appName=netflixclone
JWT_SECRET=netflix-clone-secret-key-2024-production
JWT_EXPIRE=7d
NODE_ENV=production
PORT=5000
```

### Passo 4: Deploy
1. Clique em "Deploy"
2. Aguarde o processo de build
3. **REGISTRE A URL DO BACKEND**: `https://seu-projeto-backend.vercel.app`

---

## 🎨 **2️⃣ DEPLOY DO FRONTEND**

### Passo 1: Criar Novo Projeto
1. Na Vercel, clique em "New Project"
2. Conecte o mesmo repositório GitHub
3. Selecione o repositório do Netflix Clone

### Passo 2: Configurar Projeto Frontend
1. **Root Directory**: `frontend`
2. **Framework Preset**: `Create React App`
3. **Build Command**: `npm run build`
4. **Output Directory**: `build`
5. **Install Command**: `npm install`

### Passo 3: Configurar Variável de Ambiente
Adicione a variável em Settings > Environment Variables:

```
REACT_APP_API_URL=https://SEU-BACKEND-URL.vercel.app/api
```

**⚠️ IMPORTANTE**: Substitua `SEU-BACKEND-URL` pela URL real do backend obtida no passo anterior.

### Passo 4: Deploy
1. Clique em "Deploy"
2. Aguarde o processo de build
3. **REGISTRE A URL DO FRONTEND**: `https://seu-projeto-frontend.vercel.app`

---

## 🧪 **3️⃣ TESTES PÓS-DEPLOY**

### Teste 1: API Backend
```bash
curl https://SEU-BACKEND-URL.vercel.app/api/test
```

**Resultado esperado**:
```json
{
  "message": "🎬 Netflix Clone API funcionando!",
  "mongoConnected": true,
  "mode": "MongoDB"
}
```

### Teste 2: Frontend
1. Acesse a URL do frontend
2. Teste registro de usuário
3. Teste login
4. Verifique listagem de filmes
5. Teste funcionalidades da watchlist

### Teste 3: Integração
1. Registre um usuário no frontend
2. Faça login
3. Verifique se os dados são salvos no MongoDB
4. Teste navegação entre páginas

---

## 🏠 **4️⃣ EXECUÇÃO LOCAL**

### Backend Local
```bash
cd backend
npm install
npm start
```

### Frontend Local
```bash
cd frontend
npm install
npm start
```

---

## ✅ **5️⃣ CHECKLIST DE DEPLOY**

- [ ] Backend deployado na Vercel
- [ ] Frontend deployado na Vercel
- [ ] Variáveis de ambiente configuradas
- [ ] API respondendo corretamente
- [ ] Frontend carregando sem erros
- [ ] Integração frontend-backend funcionando
- [ ] MongoDB conectado
- [ ] CORS configurado
- [ ] JWT funcionando
- [ ] Testes de usuário passando

---

## 🔗 **URLs de Exemplo**

Após o deploy, suas URLs serão algo como:
- **Backend**: `https://netflix-clone-backend-abc123.vercel.app`
- **Frontend**: `https://netflix-clone-frontend-def456.vercel.app`

---

## 🆘 **Resolução de Problemas**

### Problema: CORS Error
**Solução**: Verifique se a URL do frontend está na lista de origins permitidas no backend

### Problema: API não responde
**Solução**: Verifique se as variáveis de ambiente estão configuradas corretamente

### Problema: Frontend não carrega
**Solução**: Verifique se a variável `REACT_APP_API_URL` está correta

### Problema: MongoDB não conecta
**Solução**: Verifique se a string de conexão está correta e se o IP está liberado no MongoDB Atlas

---

## 📞 **Suporte**

Se encontrar problemas:
1. Verifique os logs de deploy na Vercel
2. Teste a API diretamente com curl
3. Verifique as variáveis de ambiente
4. Confirme se o MongoDB está acessível
