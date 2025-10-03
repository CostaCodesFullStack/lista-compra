# 🔧 VARIÁVEIS DE AMBIENTE PARA DEPLOY NA VERCEL

## 📋 CONFIGURAÇÃO NECESSÁRIA

### **Backend (netflix-clone-backend)**

Configure as seguintes variáveis de ambiente na Vercel:

```env
# MongoDB (string já existe no código)
MONGODB_URI=mongodb+srv://cauadevcosta_db_user:caua123costa@netflixclone.fcajxx6.mongodb.net/?retryWrites=true&w=majority&appName=netflixclone

# JWT
JWT_SECRET=netflix-clone-secret-key-2024-production
JWT_EXPIRE=7d

# Servidor
NODE_ENV=production
PORT=5000
```

### **Frontend (netflix-clone-frontend)**

Configure a seguinte variável de ambiente na Vercel:

```env
# URL da API do backend
REACT_APP_API_URL=https://netflix-clone-backend.vercel.app/api
```

---

## 🚀 PASSO A PASSO PARA DEPLOY

### **1. Deploy do Backend**

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Conecte seu repositório GitHub
4. Selecione a pasta `backend/`
5. Configure as variáveis de ambiente acima
6. Clique em "Deploy"
7. Anote a URL gerada (ex: `https://netflix-clone-backend.vercel.app`)

### **2. Deploy do Frontend**

1. Na dashboard da Vercel, clique em "New Project"
2. Conecte o mesmo repositório
3. Selecione a pasta `frontend/`
4. Configure `REACT_APP_API_URL` com a URL do backend + `/api`
5. Clique em "Deploy"
6. Anote a URL gerada (ex: `https://netflix-clone-frontend.vercel.app`)

---

## ✅ TESTE LOCAL

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

## 🔗 URLs RESULTANTES

- **Backend:** `https://netflix-clone-backend.vercel.app`
- **Frontend:** `https://netflix-clone-frontend.vercel.app`
- **API:** `https://netflix-clone-backend.vercel.app/api`

---

## 🧪 TESTE DA API

```bash
# Teste básico
curl https://netflix-clone-backend.vercel.app/api/test

# Resposta esperada:
# {"message":"🎬 Netflix Clone API funcionando!","mongoConnected":true,"mode":"MongoDB"}
```

---

**Status:** ✅ Configuração Completa
**Última Atualização:** $(date)
