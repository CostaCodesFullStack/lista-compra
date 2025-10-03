# Netflix Clone - Guia de Instalação Rápida

## 🚀 Instalação em 5 Passos

### 1. Clone o Repositório
```bash
git clone <url-do-repositorio>
cd netflix-clone
```

### 2. Instale as Dependências do Backend
```bash
cd backend
npm install
```

### 3. Configure o Backend
```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite o arquivo .env com suas configurações:
# MONGODB_URI=mongodb://localhost:27017/netflix-clone
# JWT_SECRET=sua-chave-secreta-aqui
# PORT=5000
```

### 4. Instale as Dependências do Frontend
```bash
cd ../frontend
npm install
```

### 5. Execute o Projeto
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

## 🌐 Acesse a Aplicação
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 📝 Primeiros Passos

1. **Crie uma conta** na página de login
2. **Explore os filmes** na página inicial
3. **Assista aos trailers** clicando nos filmes
4. **Adicione aos favoritos** usando o botão de coração

## 🔧 Configurações Importantes

### MongoDB
- Instale o MongoDB localmente ou use MongoDB Atlas
- Configure a URL no arquivo `.env` do backend

### Variáveis de Ambiente
- **Backend**: Configure no arquivo `backend/.env`
- **Frontend**: Configure no arquivo `frontend/.env`

## ❓ Problemas Comuns

### Erro de Conexão com MongoDB
- Verifique se o MongoDB está rodando
- Confirme a URL no arquivo `.env`

### Erro de CORS
- Verifique se o backend está rodando na porta 5000
- Confirme a URL da API no frontend

### Erro de Build
- Execute `npm install` novamente
- Verifique a versão do Node.js (v16+)

## 🆘 Suporte

Se encontrar problemas:
1. Verifique os logs do console
2. Confirme as configurações
3. Reinicie os servidores
4. Abra uma issue no GitHub
