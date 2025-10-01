# 🗄️ Configuração do MongoDB para Windows

Este guia explica como configurar o MongoDB para a aplicação Lista de Compras no Windows.

## 📥 Instalação do MongoDB

### 1. **Baixe o MongoDB Community Server**:
   - Acesse: https://www.mongodb.com/try/download/community
   - Selecione a versão mais recente
   - Escolha "Windows" e "msi"
   - Clique em "Download"

### 2. **Instale o MongoDB**:
   - Execute o arquivo .msi baixado
   - Siga o assistente de instalação
   - **Recomendado**: Instalar como serviço do Windows
   - Mantenha as configurações padrão durante a instalação

### 3. **Verifique a instalação**:
   ```cmd
   mongod --version
   ```

## 🚀 Iniciando o MongoDB

### Opção 1: Como Serviço do Windows (Recomendado)
```cmd
# Iniciar o serviço
net start MongoDB

# Parar o serviço
net stop MongoDB

# Verificar status
sc query MongoDB
```

### Opção 2: Execução Manual
```cmd
# Navegar para a pasta de instalação
cd "C:\Program Files\MongoDB\Server\6.0\bin"

# Executar o MongoDB
mongod.exe

# Ou executar diretamente
"C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe"
```

### Opção 3: Usando o MongoDB Compass
- Baixe e instale o MongoDB Compass (interface gráfica)
- Use para gerenciar bancos de dados visualmente

## 🔧 Configuração da Aplicação

1. **Crie o arquivo `.env`** na raiz do projeto:
   ```cmd
   copy env.example .env
   ```

2. **Edite o arquivo `.env`**:
   ```env
   MONGODB_URI=mongodb://localhost:27017/lista-compras
   PORT=5000
   ```

3. **String de conexão personalizada**:
   ```env
   # Para MongoDB com autenticação
   MONGODB_URI=mongodb://usuario:senha@localhost:27017/lista-compras
   
   # Para MongoDB Atlas (nuvem)
   MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/lista-compras
   ```

## 🧪 Testando a Conexão

### Usando o MongoDB Shell
```cmd
# Conectar ao MongoDB
mongosh

# Ou versão antiga (se disponível)
mongo

# Listar bancos de dados
show dbs

# Usar o banco da aplicação
use lista-compras

# Listar coleções
show collections
```

### Usando a Aplicação
1. Inicie o backend: `npm run server`
2. Verifique os logs para confirmar a conexão
3. Acesse: http://localhost:5000

## 📊 Estrutura do Banco

### Banco de Dados
- **Nome**: `lista-compras`
- **Coleção**: `produtos`

### Documento de Produto
```json
{
  "_id": "ObjectId('...')",
  "nome": "Arroz",
  "quantidade": 2,
  "comprado": false,
  "dataCriacao": "2024-01-15T10:30:00.000Z"
}
```

## 🛠️ Comandos Úteis

### Backup e Restore
```cmd
# Backup
mongodump --db lista-compras --out ./backup

# Restore
mongorestore --db lista-compras ./backup/lista-compras
```

### Limpar Banco
```cmd
# Conectar ao MongoDB
mongosh

# Usar o banco
use lista-compras

# Limpar coleção
db.produtos.deleteMany({})

# Verificar
db.produtos.countDocuments()
```

### Verificar Status do Serviço
```cmd
# Verificar se o serviço está rodando
sc query MongoDB

# Verificar logs do serviço
eventvwr.msc
# Navegue para: Windows Logs > Application > MongoDB
```

## 🚨 Solução de Problemas

### Erro: "MongoDB connection failed"
- Verifique se o MongoDB está rodando
- Confirme a porta 27017
- Teste: `telnet localhost 27017`

### Erro: "Authentication failed"
- Verifique usuário e senha no `.env`
- Confirme se o usuário tem permissões

### Erro: "Network is unreachable"
- Verifique firewall/antivírus do Windows
- Confirme se o MongoDB aceita conexões externas

### Porta 27017 em uso
```cmd
# Verificar qual processo está usando a porta
netstat -ano | findstr :27017

# Encerrar o processo (substitua <PID> pelo número do processo)
taskkill /PID <PID> /F

# Ou encerrar todos os processos do MongoDB
taskkill /IM mongod.exe /F
```

### Erro: "MongoDB service not found"
```cmd
# Verificar se o serviço está instalado
sc query MongoDB

# Se não estiver, reinstale o MongoDB marcando "Install MongoDB as a Service"
```

### Erro: "Access denied"
- Execute o PowerShell como Administrador
- Verifique as permissões da pasta de dados do MongoDB
- Confirme se o usuário tem privilégios de administrador

## 🪟 Dicas Específicas do Windows

### Configuração do Firewall
- O Windows Defender pode bloquear conexões ao MongoDB
- Adicione exceção para a porta 27017
- Ou desative temporariamente o firewall para testes

### Variáveis de Ambiente
- Adicione o MongoDB ao PATH do Windows:
  - Painel de Controle > Sistema > Configurações avançadas do sistema
  - Variáveis de Ambiente > Path > Editar
  - Adicione: `C:\Program Files\MongoDB\Server\6.0\bin`

### Pasta de Dados
- Localização padrão: `C:\Program Files\MongoDB\Server\6.0\data`
- Certifique-se de que o usuário tem permissões de escrita
- Para desenvolvimento, pode usar: `C:\data\db`

### Serviços do Windows
- Abra "Serviços" (services.msc)
- Procure por "MongoDB"
- Configure para iniciar automaticamente com o Windows

## 📚 Recursos Adicionais

- [Documentação oficial do MongoDB](https://docs.mongodb.com/)
- [MongoDB University](https://university.mongodb.com/) - Cursos gratuitos
- [MongoDB Compass](https://www.mongodb.com/products/compass) - Interface gráfica
- [MongoDB para Windows](https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials)

---

**Dica**: Para desenvolvimento no Windows, é recomendado usar o MongoDB como serviço. Para produção, considere MongoDB Atlas (nuvem).
