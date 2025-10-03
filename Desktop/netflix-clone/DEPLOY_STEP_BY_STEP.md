# 🚀 DEPLOY COMPLETO NA VERCEL - PASSO A PASSO

## 📋 INSTRUÇÕES DETALHADAS PARA DEPLOY

### **1️⃣ DEPLOY DO BACKEND**

#### **Passo 1: Conectar Repositório**
1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Conecte seu repositório GitHub
4. Selecione o repositório do Netflix Clone

#### **Passo 2: Configurar Backend**
1. **Framework Preset:** Other
2. **Root Directory:** `backend`
3. **Build Command:** (deixe vazio)
4. **Output Directory:** (deixe vazio)
5. **Install Command:** `npm install`

#### **Passo 3: Configurar Variáveis de Ambiente**
Clique em "Environment Variables" e adicione:

```env
MONGODB_URI=mongodb+srv://cauadevcosta_db_user:caua123costa@netflixclone.fcajxx6.mongodb.net/?retryWrites=true&w=majority&appName=netflixclone
JWT_SECRET=netflix-clone-secret-key-2024-production
JWT_EXPIRE=7d
NODE_ENV=production
PORT=5000
```

#### **Passo 4: Deploy**
1. Clique em "Deploy"
2. Aguarde o processo de build
3. **ANOTE A URL GERADA** (ex: `https://netflix-clone-backend.vercel.app`)

---

### **2️⃣ DEPLOY DO FRONTEND**

#### **Passo 1: Criar Novo Projeto**
1. Na dashboard da Vercel, clique em "New Project"
2. Conecte o mesmo repositório
3. Selecione o repositório do Netflix Clone

#### **Passo 2: Configurar Frontend**
1. **Framework Preset:** Create React App
2. **Root Directory:** `frontend`
3. **Build Command:** `npm run build`
4. **Output Directory:** `build`
5. **Install Command:** `npm install`

#### **Passo 3: Configurar Variável de Ambiente**
Clique em "Environment Variables" e adicione:

```env
REACT_APP_API_URL=https://netflix-clone-backend.vercel.app/api
```

**⚠️ IMPORTANTE:** Substitua `netflix-clone-backend` pela URL real do seu backend.

#### **Passo 4: Deploy**
1. Clique em "Deploy"
2. Aguarde o processo de build
3. **ANOTE A URL GERADA** (ex: `https://netflix-clone-frontend.vercel.app`)

---

### **3️⃣ TESTES PÓS-DEPLOY**

#### **Teste 1: API Backend**
```bash
curl https://netflix-clone-backend.vercel.app/api/test
```

**Resposta esperada:**
```json
{
  "message": "🎬 Netflix Clone API funcionando!",
  "mongoConnected": true,
  "mode": "MongoDB"
}
```

#### **Teste 2: Frontend**
1. Acesse a URL do frontend
2. Teste o registro de usuário
3. Teste o login
4. Verifique se os filmes carregam

#### **Teste 3: Integração**
- Frontend chamando backend ✅
- CORS funcionando ✅
- MongoDB conectado ✅
- Autenticação JWT ✅

---

### **4️⃣ RESULTADO FINAL**

Após o deploy completo, você terá:

- **Backend:** `https://netflix-clone-backend.vercel.app`
- **Frontend:** `https://netflix-clone-frontend.vercel.app`
- **API:** `https://netflix-clone-backend.vercel.app/api`

---

## 🔧 EXECUÇÃO LOCAL

### **Backend:**
```bash
cd backend
npm install
npm start
# Servidor rodará em http://localhost:5000
```

### **Frontend:**
```bash
cd frontend
npm install
npm start
# Aplicação rodará em http://localhost:3000
```

---

## ✅ CHECKLIST DE DEPLOY

- [ ] Repositório conectado na Vercel
- [ ] Backend deployado com sucesso
- [ ] Variáveis de ambiente configuradas no backend
- [ ] Frontend deployado com sucesso
- [ ] REACT_APP_API_URL configurada no frontend
- [ ] Teste da API funcionando
- [ ] Teste do frontend funcionando
- [ ] Integração completa validada

---

**Status:** ✅ Guia Completo de Deploy
**Última Atualização:** $(date)
