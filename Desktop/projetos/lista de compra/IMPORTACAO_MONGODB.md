# 🗄️ Importação Direta para MongoDB

Este guia explica como usar o script de importação direta para popular o banco de dados MongoDB da aplicação Lista de Compras.

## 📋 Pré-requisitos

1. **MongoDB instalado e rodando** (veja `MONGODB_SETUP.md`)
2. **Node.js instalado** (versão 14 ou superior)
3. **Dependências instaladas**: `npm install`

## 🚀 Como Usar

### 1. **Importação com Dados de Exemplo**
```bash
# Importa produtos pré-definidos no script
node importar-mongodb.js
```

### 2. **Importação de Arquivo JSON**
```bash
# Importa produtos de um arquivo JSON específico
node importar-mongodb.js --arquivo produtos-exemplo.json
```

### 3. **Criar Arquivo de Exemplo**
```bash
# Cria um arquivo JSON com produtos de exemplo
node importar-mongodb.js --criar-exemplo
```

### 4. **Importação Explícita de Exemplo**
```bash
# Força importação de produtos de exemplo
node importar-mongodb.js --exemplo
```

## 📁 Arquivos Criados

- **`importar-mongodb.js`** - Script principal de importação
- **`produtos-exemplo.json`** - Arquivo JSON com produtos de exemplo
- **`IMPORTACAO_MONGODB.md`** - Esta documentação

## 🔧 Funcionalidades do Script

### ✅ **Conexão Automática**
- Conecta automaticamente ao MongoDB usando as configurações do `.env`
- Fallback para `mongodb://localhost:27017/lista-compras`

### 🗑️ **Limpeza Automática**
- Remove todos os produtos existentes antes da importação
- Evita duplicatas e dados antigos

### 📊 **Validação de Dados**
- Verifica se o arquivo JSON contém um array válido
- Adiciona campos padrão se não existirem:
  - `dataCriacao`: Data atual
  - `comprado`: `false`
  - `quantidade`: `1`

### 📋 **Relatório de Importação**
- Mostra quantos produtos foram importados
- Lista todos os produtos importados
- Exibe status final da coleção

## 📝 Estrutura do Arquivo JSON

O arquivo JSON deve conter um array de objetos com a seguinte estrutura:

```json
[
  {
    "nome": "Nome do Produto",
    "quantidade": 1,
    "comprado": false,
    "dataCriacao": "2024-01-15T10:00:00.000Z"
  }
]
```

### **Campos Obrigatórios:**
- `nome` (string) - Nome do produto

### **Campos Opcionais:**
- `quantidade` (number) - Quantidade (padrão: 1)
- `comprado` (boolean) - Status de compra (padrão: false)
- `dataCriacao` (string ISO) - Data de criação (padrão: data atual)

## 🎯 Exemplos de Uso

### **Importação Rápida para Testes**
```bash
# Importa produtos de exemplo rapidamente
node importar-mongodb.js
```

### **Importação de Dados Personalizados**
```bash
# 1. Crie seu arquivo JSON
# 2. Execute a importação
node importar-mongodb.js --arquivo meus-produtos.json
```

### **Criação de Arquivo de Exemplo**
```bash
# 1. Cria o arquivo de exemplo
node importar-mongodb.js --criar-exemplo

# 2. Edite o arquivo produtos-exemplo.json
# 3. Execute a importação
node importar-mongodb.js --arquivo produtos-exemplo.json
```

## 🔍 Verificação da Importação

Após a importação, o script exibe:

1. **Status da conexão** com MongoDB
2. **Quantidade de produtos** removidos (limpeza)
3. **Quantidade de produtos** importados
4. **Lista dos produtos** importados
5. **Total de produtos** na coleção
6. **Status de cada produto** (Comprado/Pendente)

## 🚨 Solução de Problemas

### **Erro: "MongoDB connection failed"**
- Verifique se o MongoDB está rodando
- Confirme a string de conexão no `.env`
- Teste: `mongosh` ou `mongo`

### **Erro: "Arquivo não encontrado"**
- Verifique o caminho do arquivo
- Use caminhos relativos ou absolutos
- Confirme se o arquivo existe

### **Erro: "O arquivo deve conter um array de produtos"**
- Verifique se o JSON tem a estrutura correta
- Confirme se é um array `[]` e não um objeto `{}`

### **Erro: "Access denied"**
- Execute o PowerShell como Administrador
- Verifique permissões da pasta do projeto

## 📊 Produtos de Exemplo Incluídos

O script inclui 15 produtos de exemplo:

1. **Grãos**: Arroz Integral, Feijão Preto
2. **Verduras**: Tomate, Cebola, Batata, Cenoura, Alho
3. **Pães**: Pão de Forma
4. **Laticínios**: Leite Integral, Queijo Minas
5. **Frutas**: Banana, Maçã
6. **Carnes**: Carne Bovina
7. **Condimentos**: Azeite de Oliva, Sal

## 🔄 Reimportação

Para reimportar dados:

```bash
# O script limpa automaticamente a coleção
node importar-mongodb.js

# Ou importe de um arquivo específico
node importar-mongodb.js --arquivo novos-produtos.json
```

## 💡 Dicas de Uso

### **Para Desenvolvimento**
- Use `node importar-mongodb.js` para resetar dados rapidamente
- Ideal para testes e demonstrações

### **Para Produção**
- Crie arquivos JSON com dados reais
- Use `--arquivo` para importações específicas
- Mantenha backups antes de importações

### **Para Equipes**
- Compartilhe arquivos JSON com a equipe
- Padronize a estrutura dos dados
- Use controle de versão para os arquivos de dados

## 📚 Comandos Úteis

### **Verificar Status do MongoDB**
```bash
# Windows
sc query MongoDB

# Ou
net start MongoDB
```

### **Conectar ao MongoDB**
```bash
mongosh
# ou
mongo
```

### **Verificar Dados**
```bash
# No MongoDB Shell
use lista-compras
show collections
db.produtos.find().pretty()
```

---

**🎉 Agora você pode importar dados diretamente no MongoDB de forma rápida e eficiente!**
