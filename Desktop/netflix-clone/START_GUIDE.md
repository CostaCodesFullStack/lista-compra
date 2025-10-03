# 🚀 Guia de Inicialização - Netflix Clone

## ⚠️ IMPORTANTE: Pré-requisitos

Antes de iniciar, você precisa ter instalado:

1. **Node.js** (versão 16 ou superior)
2. **MongoDB** (local ou MongoDB Atlas)
3. **Git** (para clonar o repositório)

## 📋 Passo a Passo para Iniciar

### 1. Verificar Instalações
```bash
# Verificar Node.js
node --version

# Verificar npm
npm --version

# Verificar MongoDB (se instalado localmente)
mongod --version
```

### 2. Instalar MongoDB (se necessário)
Se você não tem MongoDB instalado:

**Opção A - MongoDB Local:**
- Baixe em: https://www.mongodb.com/try/download/community
- Instale e inicie o serviço

**Opção B - MongoDB Atlas (Recomendado):**
- Acesse: https://www.mongodb.com/atlas
- Crie uma conta gratuita
- Crie um cluster
- Obtenha a string de conexão

### 3. Configurar o Backend
```bash
# Navegar para o backend
cd backend

# Instalar dependências
npm install

# Configurar variáveis de ambiente
# Copie o arquivo .env.example para .env
copy .env.example .env

# Edite o arquivo .env com suas configurações:
# MONGODB_URI=mongodb://localhost:27017/netflix-clone
# JWT_SECRET=sua-chave-secreta-aqui
# PORT=5000
```

### 4. Configurar o Frontend
```bash
# Navegar para o frontend
cd ../frontend

# Instalar dependências
npm install

# Criar arquivo .env
echo REACT_APP_API_URL=http://localhost:5000/api > .env
```

### 5. Iniciar os Servidores

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### 6. Acessar a Aplicação
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 🔧 Configurações Importantes

### Arquivo .env do Backend
```env
MONGODB_URI=mongodb://localhost:27017/netflix-clone
JWT_SECRET=netflix-clone-super-secret-jwt-key-2024
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=demo
CLOUDINARY_API_KEY=demo
CLOUDINARY_API_SECRET=demo
FRONTEND_URL=http://localhost:3000
```

### Arquivo .env do Frontend
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## ❓ Problemas Comuns e Soluções

### 1. Erro de Conexão com MongoDB
**Problema:** `MongoServerError: connect ECONNREFUSED`
**Solução:** 
- Verifique se o MongoDB está rodando
- Confirme a URL no arquivo .env
- Para MongoDB Atlas, verifique a string de conexão

### 2. Erro de CORS
**Problema:** `Access to fetch at 'http://localhost:5000' from origin 'http://localhost:3000' has been blocked by CORS policy`
**Solução:**
- Verifique se o backend está rodando na porta 5000
- Confirme a URL da API no frontend

### 3. Erro de Build do Frontend
**Problema:** `Module not found` ou erros de TypeScript
**Solução:**
- Execute `npm install` novamente
- Verifique a versão do Node.js (v16+)
- Limpe o cache: `npm cache clean --force`

### 4. Porta já em uso
**Problema:** `EADDRINUSE: address already in use :::5000`
**Solução:**
- Pare outros processos na porta 5000
- Ou mude a porta no arquivo .env

## 🎯 Primeiros Passos Após Iniciar

1. **Acesse** http://localhost:3000
2. **Crie uma conta** clicando em "Criar nova conta"
3. **Faça login** com suas credenciais
4. **Explore** os filmes na página inicial
5. **Clique em um filme** para ver os detalhes
6. **Adicione aos favoritos** usando o botão de coração

## 🆘 Ainda com Problemas?

1. **Verifique os logs** no console dos terminais
2. **Confirme as configurações** nos arquivos .env
3. **Reinicie os servidores** (Ctrl+C para parar, depois inicie novamente)
4. **Verifique se as portas** 3000 e 5000 estão livres
5. **Consulte a documentação** nos READMEs das pastas backend e frontend

## 📞 Suporte

Se ainda tiver problemas:
- Verifique se todas as dependências foram instaladas
- Confirme se o MongoDB está funcionando
- Teste a API diretamente em http://localhost:5000/api/test
- Verifique se não há erros nos logs dos terminais
