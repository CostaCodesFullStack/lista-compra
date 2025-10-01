# ☁️ Configuração do MongoDB Atlas

Este guia explica como configurar o MongoDB Atlas (nuvem) para a aplicação Lista de Compras, permitindo que o projeto seja executado diretamente do GitHub.

## 🎯 Vantagens do MongoDB Atlas

- ✅ **Gratuito** - Cluster gratuito com 512MB
- ✅ **Sem instalação** - Funciona direto na nuvem
- ✅ **Acessível de qualquer lugar** - Não precisa de MongoDB local
- ✅ **Backup automático** - Dados seguros na nuvem
- ✅ **Escalável** - Pode crescer conforme necessário

## 🚀 Passo a Passo - Configuração Completa

### 1. **Criar Conta no MongoDB Atlas**

1. Acesse: https://cloud.mongodb.com/
2. Clique em **"Try Free"**
3. Preencha o formulário de cadastro
4. Confirme seu email

### 2. **Criar Cluster**

1. **Escolha o tipo de cluster:**
   - Selecione **"M0 Sandbox"** (gratuito)
   - Escolha a região mais próxima (ex: São Paulo)

2. **Configure o cluster:**
   - Nome: `lista-compras-cluster` (ou qualquer nome)
   - Versão: Mantenha a mais recente
   - Clique em **"Create Cluster"**

3. **Aguarde a criação** (2-3 minutos)

### 3. **Configurar Acesso ao Banco**

1. **Criar usuário de banco:**
   - Vá em **"Database Access"** no menu lateral
   - Clique em **"Add New Database User"**
   - Username: `lista-compras-user`
   - Password: Gere uma senha forte (salve em local seguro)
   - Database User Privileges: **"Read and write to any database"**
   - Clique em **"Add User"**

2. **Configurar acesso de rede:**
   - Vá em **"Network Access"** no menu lateral
   - Clique em **"Add IP Address"**
   - Selecione **"Allow access from anywhere"** (0.0.0.0/0)
   - Clique em **"Confirm"**

### 4. **Obter String de Conexão**

1. **Conectar ao cluster:**
   - Vá em **"Database"** no menu lateral
   - Clique em **"Connect"** no seu cluster
   - Selecione **"Connect your application"**

2. **Copiar string de conexão:**
   - Driver: **Node.js**
   - Version: **4.1 or later**
   - Copie a string que aparece (algo como):
   ```
   mongodb+srv://lista-compras-user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### 5. **Configurar o Projeto**

1. **Criar arquivo .env:**
   ```bash
   # Copie o arquivo de exemplo
   copy env.example .env
   ```

2. **Editar o arquivo .env:**
   ```env
   # Substitua pela sua string de conexão
   MONGODB_URI=mongodb+srv://lista-compras-user:SUA_SENHA@cluster0.xxxxx.mongodb.net/lista-compras?retryWrites=true&w=majority
   PORT=5000
   ```

3. **Substituir valores:**
   - `SUA_SENHA` → Senha que você criou
   - `cluster0.xxxxx` → Nome do seu cluster
   - `lista-compras` → Nome do banco (pode manter)

## 🧪 Testando a Configuração

### 1. **Testar Conexão**
```bash
# Instalar dependências
npm install

# Testar conexão
npm run server
```

### 2. **Verificar Logs**
Você deve ver:
```
✅ Conectado ao MongoDB com sucesso!
🚀 Servidor rodando na porta 5000
```

### 3. **Importar Dados de Exemplo**
```bash
# Importar produtos de exemplo
node importar-mongodb.js
```

### 4. **Testar Aplicação Completa**
```bash
# Executar frontend + backend
npm run dev
```

## 🌐 Acessar no Navegador

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

## 🔧 Configurações Avançadas

### **String de Conexão Personalizada**
```env
# Com autenticação específica
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/lista-compras?retryWrites=true&w=majority&authSource=admin

# Com timeout personalizado
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/lista-compras?retryWrites=true&w=majority&connectTimeoutMS=30000&socketTimeoutMS=30000
```

### **Múltiplos Ambientes**
```env
# Desenvolvimento
MONGODB_URI_DEV=mongodb+srv://usuario:senha@cluster-dev.mongodb.net/lista-compras-dev

# Produção
MONGODB_URI_PROD=mongodb+srv://usuario:senha@cluster-prod.mongodb.net/lista-compras-prod
```

## 🚨 Solução de Problemas

### **Erro: "Authentication failed"**
- Verifique se o usuário e senha estão corretos
- Confirme se o usuário tem permissões de leitura/escrita

### **Erro: "Network is unreachable"**
- Verifique se o IP está liberado no Network Access
- Use "Allow access from anywhere" (0.0.0.0/0)

### **Erro: "Invalid connection string"**
- Verifique se a string está completa
- Confirme se não há espaços extras
- Teste a conexão no MongoDB Compass

### **Erro: "Database not found"**
- O banco será criado automaticamente na primeira inserção
- Verifique se o nome do banco está correto na string

## 📊 Monitoramento

### **MongoDB Atlas Dashboard**
- Acesse seu cluster no Atlas
- Monitore uso de dados, conexões e performance
- Configure alertas se necessário

### **Logs da Aplicação**
```bash
# Ver logs detalhados
DEBUG=* npm run server

# Ou com nodemon
DEBUG=* npm run dev
```

## 🔒 Segurança

### **Boas Práticas**
1. **Nunca commite o arquivo .env**
2. **Use senhas fortes** para usuários do banco
3. **Limite acesso por IP** em produção
4. **Monitore conexões** no Atlas
5. **Faça backups regulares**

### **Para Produção**
- Use clusters pagos para melhor performance
- Configure backup automático
- Implemente autenticação adicional
- Use SSL/TLS obrigatório

## 📱 Usando no GitHub

### **1. Configurar Secrets do Repositório**
1. Vá em **Settings** do seu repositório
2. Clique em **Secrets and variables** → **Actions**
3. Adicione nova secret:
   - Name: `MONGODB_URI`
   - Value: Sua string de conexão completa

### **2. Atualizar GitHub Actions (se usar)**
```yaml
# .github/workflows/deploy.yml
env:
  MONGODB_URI: ${{ secrets.MONGODB_URI }}
```

### **3. Deploy em Plataformas**
- **Vercel**: Configure a variável de ambiente
- **Netlify**: Adicione no painel de variáveis
- **Heroku**: Use `heroku config:set MONGODB_URI=...`

## 💡 Dicas Importantes

### **Cluster Gratuito - Limitações**
- **512MB** de armazenamento
- **100 conexões** simultâneas
- **Sem backup automático** (apenas manual)
- **Ideal para desenvolvimento** e testes

### **Quando Atualizar para Pago**
- Mais de 100 usuários simultâneos
- Necessidade de backup automático
- Requisitos de performance específicos
- Dados críticos de produção

### **Backup Manual**
```bash
# Exportar dados
mongodump --uri="mongodb+srv://usuario:senha@cluster.mongodb.net/lista-compras" --out=backup

# Importar dados
mongorestore --uri="mongodb+srv://usuario:senha@cluster.mongodb.net/lista-compras" backup/lista-compras
```

## 🎉 Pronto!

Agora seu projeto está configurado para usar MongoDB Atlas e pode ser executado diretamente do GitHub! 

### **Próximos Passos:**
1. ✅ Configure o MongoDB Atlas
2. ✅ Atualize o arquivo .env
3. ✅ Teste a aplicação
4. ✅ Faça commit das mudanças
5. ✅ Compartilhe o repositório

---

**🚀 Sua aplicação agora funciona na nuvem!**
