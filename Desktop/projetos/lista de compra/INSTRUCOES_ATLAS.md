# ⚡ Instruções Rápidas - MongoDB Atlas

## 🚀 Execução Super Rápida (5 minutos)

### 1. **Clone e Instale**
```bash
git clone <url-do-repositorio>
cd lista-de-compras
npm run install-all
```

### 2. **Configure MongoDB Atlas**
1. Acesse: https://cloud.mongodb.com/
2. Crie conta gratuita
3. Crie cluster M0 (gratuito)
4. Configure usuário de banco
5. Libere acesso de rede (0.0.0.0/0)
6. Copie a string de conexão

### 3. **Configure o Projeto**
```bash
# Copie o arquivo de configuração
copy env.example .env

# Edite o .env com sua string do Atlas
# Exemplo: MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/lista-compras
```

### 4. **Execute a Aplicação**
```bash
# Importe dados de exemplo
node importar-mongodb.js

# Execute a aplicação
npm run dev
```

### 5. **Acesse**
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

## ✅ Pronto!

Sua aplicação está rodando com MongoDB Atlas! 

### **Vantagens:**
- ☁️ **Sem instalação** do MongoDB local
- 🌐 **Acessível de qualquer lugar**
- 💾 **Dados seguros na nuvem**
- 🔄 **Backup automático** (planos pagos)

### **Próximos Passos:**
- Personalize a interface
- Adicione novas funcionalidades
- Faça deploy em produção

---

**🎉 Agora você pode executar o projeto diretamente do GitHub!**
