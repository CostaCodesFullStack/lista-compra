# 🎬 Netflix Clone - Comandos de Desenvolvimento

## 🚀 Iniciar Frontend e Backend Juntos

### Opção 1: Comando NPM (Recomendado)
```bash
npm run dev
```

### Opção 2: Script Batch - Janelas Separadas (Windows)
```bash
start-separate.bat
```

### Opção 3: Script PowerShell (Windows)
```powershell
.\start-powershell.ps1
```

### Opção 4: Manual (Se as outras não funcionarem)
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm start
```

## 📋 Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia frontend e backend em modo desenvolvimento |
| `npm run start` | Inicia frontend e backend (produção) |
| `npm run backend` | Inicia apenas o backend |
| `npm run frontend` | Inicia apenas o frontend |
| `npm run backend:prod` | Inicia backend em modo produção |
| `npm run frontend:build` | Faz build do frontend |
| `npm run install:all` | Instala dependências de todos os projetos |
| `npm run test` | Executa testes de backend e frontend |

## 🌐 URLs dos Serviços

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **API Test**: http://localhost:5000/api/test

## 📁 Estrutura do Projeto

```
netflix-clone/
├── frontend/          # React + TypeScript
├── backend/           # Node.js + Express + MongoDB
├── package.json       # Scripts principais
├── start-dev.bat     # Script Windows
├── start-dev.ps1      # Script PowerShell
└── README.md          # Este arquivo
```

## 🔧 Pré-requisitos

1. Node.js (versão 16 ou superior)
2. NPM ou Yarn
3. MongoDB (opcional - funciona com dados mockados)

## 📦 Instalação Inicial

```bash
# Instalar dependências de todos os projetos
npm run install:all

# Ou instalar manualmente:
npm install
cd backend && npm install
cd ../frontend && npm install
```

## 🎯 Funcionalidades Implementadas

- ✅ Sistema de autenticação
- ✅ Lista de filmes para assistir (Watchlist)
- ✅ Sistema de favoritos
- ✅ Histórico de visualização
- ✅ Interface responsiva
- ✅ Dados mockados (funciona sem MongoDB)

## 🛠️ Desenvolvimento

Para desenvolvimento, use:
```bash
npm run dev
```

Isso iniciará:
- Backend em modo desenvolvimento (nodemon)
- Frontend em modo desenvolvimento (hot reload)

## 🚀 Produção

Para produção:
```bash
npm run build
npm run start
```

## 📝 Notas

- O frontend tem proxy configurado para o backend (porta 5000)
- O sistema funciona com dados mockados se o MongoDB não estiver disponível
- Todos os logs aparecem no mesmo terminal quando usando `npm run dev`
