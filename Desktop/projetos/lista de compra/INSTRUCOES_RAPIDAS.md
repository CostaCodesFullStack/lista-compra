# 🚀 Instruções Rápidas - Lista de Compras

## ⚡ Início Rápido (Windows)

1. **Execute o arquivo `start.bat`** - Ele fará tudo automaticamente!

## 🔧 Instalação Manual

### 1. Instalar Dependências
```bash
npm run install-all
```

### 2. Configurar MongoDB
- Copie `env.example` para `.env`
- Inicie o MongoDB: `mongod`

### 3. Executar Aplicação
```bash
npm run dev
```

## 🌐 Acessos
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

## 📱 Funcionalidades
- ➕ **Adicionar** produtos com nome e quantidade
- ✅ **Marcar** como comprado (checkbox)
- 🗑️ **Remover** produtos da lista
- 📊 **Estatísticas** em tempo real

## 🛠️ Comandos Úteis
```bash
npm run dev          # Frontend + Backend
npm run server       # Apenas Backend
npm run client       # Apenas Frontend
npm run build        # Build de produção
```

## 🚨 Problemas Comuns
- **MongoDB não conecta**: Verifique se está rodando
- **Porta em uso**: Feche outros serviços na porta 5000
- **Dependências**: Execute `npm run install-all`

---
**🎯 Dica**: Use `start.bat` para configuração automática!
