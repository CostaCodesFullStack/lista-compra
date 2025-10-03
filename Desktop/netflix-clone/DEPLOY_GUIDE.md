# 🚀 GUIA COMPLETO DE DEPLOY - NETFLIX CLONE

## 📋 VISÃO GERAL

Este guia fornece instruções passo a passo para fazer o deploy completo do Netflix Clone na Vercel, incluindo backend e frontend.

---

## 🛠️ PRÉ-REQUISITOS

### **1. Contas Necessárias**
- [ ] Conta no [GitHub](https://github.com)
- [ ] Conta no [Vercel](https://vercel.com)
- [ ] Conta no [MongoDB Atlas](https://cloud.mongodb.com)

### **2. Ferramentas Necessárias**
- [ ] Node.js (versão 16 ou superior)
- [ ] npm ou yarn
- [ ] Git
- [ ] Vercel CLI (opcional)

---

## 🔧 CONFIGURAÇÃO INICIAL

### **1. Instalar Vercel CLI (Opcional)**
```bash
npm install -g vercel
```

### **2. Login na Vercel**
```bash
vercel login
```

### **3. Preparar o Projeto**
```bash
# Clonar o repositório
git clone <seu-repositorio>
cd netflix-clone

# Instalar dependências do backend
cd backend
npm install

# Instalar dependências do frontend
cd ../frontend
npm install
```

---

## 🗄️ CONFIGURAÇÃO DO MONGODB ATLAS

### **1. Criar Cluster**
1. Acesse [MongoDB Atlas](https://cloud.mongodb.com)
2. Clique em "New Project"
3. Digite o nome: `Netflix Clone`
4. Clique em "Create Project"
5. Clique em "Build a Database"
6. Escolha "FREE" (M0)
7. Escolha uma região próxima
8. Clique em "Create"

### **2. Configurar Acesso de Rede**
1. Clique em "Network Access" no menu lateral
2. Clique em "Add IP Address"
3. Clique em "Allow Access from Anywhere" (0.0.0.0/0)
4. Clique em "Confirm"

### **3. Criar Usuário de Banco**
1. Clique em "Database Access" no menu lateral
2. Clique em "Add New Database User"
3. Escolha "Password" como método de autenticação
4. Digite username: `netflixuser`
5. Digite uma senha forte
6. Clique em "Add User"

### **4. Obter String de Conexão**
1. Clique em "Clusters" no menu lateral
2. Clique em "Connect" no seu cluster
3. Escolha "Connect your application"
4. Copie a string de conexão
5. Substitua `<password>` pela senha do usuário
6. Substitua `<dbname>` por `netflix-clone`

**Exemplo de string final:**
```
mongodb+srv://netflixuser:senha123@cluster0.abc123.mongodb.net/netflix-clone?retryWrites=true&w=majority
```

---

## 🚀 DEPLOY DO BACKEND

### **Método 1: Via Vercel Dashboard**

1. **Conectar Repositório**
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "New Project"
   - Conecte seu repositório GitHub
   - Selecione o repositório do Netflix Clone

2. **Configurar Projeto**
   - **Framework Preset:** Other
   - **Root Directory:** `backend`
   - **Build Command:** `npm run build`
   - **Output Directory:** (deixe vazio)
   - **Install Command:** `npm install`

3. **Configurar Variáveis de Ambiente**
   - Clique em "Environment Variables"
   - Adicione as seguintes variáveis:

```env
MONGODB_URI=mongodb+srv://netflixuser:senha123@cluster0.abc123.mongodb.net/netflix-clone?retryWrites=true&w=majority
JWT_SECRET=jwt-secret-super-seguro-para-producao-2024-netflix-clone-minimo-32-caracteres
JWT_EXPIRE=7d
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://netflix-clone-frontend.vercel.app
```

4. **Deploy**
   - Clique em "Deploy"
   - Aguarde o processo de build
   - Anote a URL gerada (ex: `https://netflix-clone-backend.vercel.app`)

### **Método 2: Via CLI**

```bash
cd backend
vercel --prod
```

---

## 🎨 DEPLOY DO FRONTEND

### **Método 1: Via Vercel Dashboard**

1. **Criar Novo Projeto**
   - Na dashboard da Vercel, clique em "New Project"
   - Conecte o mesmo repositório
   - Selecione a pasta `frontend`

2. **Configurar Projeto**
   - **Framework Preset:** Create React App
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
   - **Install Command:** `npm install`

3. **Configurar Variáveis de Ambiente**
   - Clique em "Environment Variables"
   - Adicione a variável:

```env
REACT_APP_API_URL=https://netflix-clone-backend.vercel.app/api
```

4. **Deploy**
   - Clique em "Deploy"
   - Aguarde o processo de build
   - Anote a URL gerada (ex: `https://netflix-clone-frontend.vercel.app`)

### **Método 2: Via CLI**

```bash
cd frontend
vercel --prod
```

---

## 🔗 CONFIGURAÇÃO DE INTEGRAÇÃO

### **1. Atualizar URLs**
Após ambos os deploys, atualize as URLs:

1. **No Backend:**
   - Vá para Settings > Environment Variables
   - Atualize `FRONTEND_URL` com a URL real do frontend

2. **No Frontend:**
   - Vá para Settings > Environment Variables
   - Atualize `REACT_APP_API_URL` com a URL real do backend + `/api`

### **2. Redeploy**
- Faça redeploy de ambos os projetos para aplicar as mudanças

---

## ✅ TESTE DA APLICAÇÃO

### **1. Teste Básico**
1. Acesse a URL do frontend
2. Verifique se a página carrega
3. Teste o registro de usuário
4. Teste o login
5. Verifique se os filmes carregam

### **2. Teste de API**
```bash
# Teste da API do backend
curl https://netflix-clone-backend.vercel.app/api/test

# Resposta esperada:
# {"message":"🎬 Netflix Clone API funcionando!","mongoConnected":true,"mode":"MongoDB"}
```

### **3. Teste de CORS**
- Abra o DevTools do navegador
- Verifique se não há erros de CORS
- Teste as requisições para a API

---

## 🐛 SOLUÇÃO DE PROBLEMAS

### **1. Erro de Conexão com MongoDB**
- Verifique se a string de conexão está correta
- Confirme se o IP está liberado no MongoDB Atlas
- Verifique se o usuário tem permissões adequadas

### **2. Erro de CORS**
- Verifique se `FRONTEND_URL` está correto no backend
- Confirme se as URLs estão atualizadas
- Faça redeploy após mudanças

### **3. Erro 404 na API**
- Verifique se o backend foi deployado corretamente
- Confirme se a URL da API está correta
- Verifique os logs do Vercel

### **4. Erro de Build**
- Verifique se todas as dependências estão no package.json
- Confirme se não há erros de sintaxe
- Verifique os logs de build na Vercel

---

## 📊 MONITORAMENTO

### **1. Logs da Vercel**
- Acesse o dashboard do projeto
- Vá para "Functions" para ver logs do backend
- Vá para "Deployments" para ver logs de build

### **2. Métricas**
- Monitore o uso de recursos
- Acompanhe o tempo de resposta
- Verifique erros em produção

---

## 🔄 ATUALIZAÇÕES

### **1. Deploy Automático**
- Push para a branch `main` faz deploy automático
- Configure branches específicas se necessário

### **2. Deploy Manual**
```bash
# Backend
cd backend
vercel --prod

# Frontend
cd frontend
vercel --prod
```

---

## 📋 CHECKLIST FINAL

- [ ] MongoDB Atlas configurado
- [ ] Cluster criado e acessível
- [ ] Usuário de banco criado
- [ ] String de conexão obtida
- [ ] Backend deployado na Vercel
- [ ] Variáveis de ambiente configuradas no backend
- [ ] Frontend deployado na Vercel
- [ ] Variável REACT_APP_API_URL configurada
- [ ] URLs atualizadas após deploy
- [ ] Redeploy realizado
- [ ] Teste de conexão entre frontend e backend
- [ ] Teste de autenticação funcionando
- [ ] Teste de carregamento de filmes
- [ ] Verificação de logs sem erros

---

## 🎉 RESULTADO FINAL

Após seguir todos os passos, você terá:

- **Backend:** `https://netflix-clone-backend.vercel.app`
- **Frontend:** `https://netflix-clone-frontend.vercel.app`
- **API:** `https://netflix-clone-backend.vercel.app/api`

A aplicação estará funcionando completamente em produção! 🚀

---

**Status:** ✅ Guia Completo
**Última Atualização:** $(date)
