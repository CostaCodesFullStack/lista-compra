# 🛒 Lista de Compras

Uma aplicação completa de Lista de Compras desenvolvida com React no frontend e Express + MongoDB no backend.

## ✨ Funcionalidades

- ✅ **Cadastrar produtos** com nome e quantidade
- ✅ **Marcar como comprado** com checkbox interativo
- ✅ **Remover produtos** da lista
- ✅ **Interface responsiva** com Bootstrap
- ✅ **Persistência de dados** com MongoDB
- ✅ **API RESTful** completa
- ✅ **Validação de formulários**
- ✅ **Estatísticas em tempo real**

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **CORS** - Middleware para requisições cross-origin

### Frontend
- **React** - Biblioteca JavaScript para UI
- **Bootstrap** - Framework CSS responsivo
- **React Bootstrap** - Componentes Bootstrap para React
- **Axios** - Cliente HTTP para requisições à API

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- **MongoDB Atlas** (recomendado) ou MongoDB local

## 🛠️ Instalação

### **Opção 1: MongoDB Atlas (Recomendado) ☁️**

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd lista-de-compras
   ```

2. **Instale as dependências**
   ```bash
   npm run install-all
   ```

3. **Configure MongoDB Atlas**
   - Siga o guia completo: [MONGODB_ATLAS_SETUP.md](./MONGODB_ATLAS_SETUP.md)
   - Crie conta gratuita em https://cloud.mongodb.com/
   - Configure cluster e usuário de banco

4. **Configure as variáveis de ambiente**
   ```bash
   # Copie o arquivo de exemplo
   copy env.example .env
   ```
   - Edite `.env` com sua string de conexão do Atlas
   - Exemplo: `MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/lista-compras`

### **Opção 2: MongoDB Local 🖥️**

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd lista-de-compras
   ```

2. **Instale as dependências**
   ```bash
   npm run install-all
   ```

3. **Configure as variáveis de ambiente**
   - Copie o arquivo `env.example` para `.env`
   - Descomente a linha do MongoDB local

4. **Instale e inicie o MongoDB**
   - Siga o guia: [MONGODB_SETUP.md](./MONGODB_SETUP.md)
   - Inicie: `mongod`

## 🚀 Como Executar

### **Execução Rápida (MongoDB Atlas) ⚡**
```bash
# 1. Clone o repositório
git clone <url-do-repositorio>
cd lista-de-compras

# 2. Instale dependências
npm run install-all

# 3. Configure MongoDB Atlas (veja MONGODB_ATLAS_SETUP.md)
# 4. Copie e configure .env
copy env.example .env

# 5. Execute a aplicação
npm run dev
```

### **Desenvolvimento (Frontend + Backend simultaneamente)**
```bash
npm run dev
```

### **Apenas o Backend**
```bash
npm run server
```

### **Apenas o Frontend**
```bash
npm run client
```

### **Produção**
```bash
npm run build
npm start
```

### **Importar Dados de Exemplo**
```bash
# Após configurar o MongoDB Atlas
node importar-mongodb.js
```

## 🌐 Endpoints da API

### Produtos
- `GET /api/produtos` - Lista todos os produtos
- `POST /api/produtos` - Cadastra novo produto
- `PUT /api/produtos/:id` - Atualiza produto (marca como comprado)
- `DELETE /api/produtos/:id` - Remove produto

### Estrutura do Produto
```json
{
  "_id": "ObjectId",
  "nome": "String",
  "quantidade": "Number",
  "comprado": "Boolean",
  "dataCriacao": "Date"
}
```

## 📱 Interface do Usuário

- **Formulário de Adição**: Campo para nome e quantidade do produto
- **Lista de Produtos**: Separada entre pendentes e comprados
- **Checkbox Interativo**: Marca produtos como comprados
- **Botão de Remoção**: Remove produtos com confirmação
- **Estatísticas**: Contadores de total, pendentes e comprados
- **Design Responsivo**: Funciona em dispositivos móveis e desktop

## 🔧 Estrutura do Projeto

```
lista-de-compras/
├── client/                 # Frontend React
│   ├── public/
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── App.js         # Componente principal
│   │   └── index.js       # Ponto de entrada
│   └── package.json
├── server.js              # Servidor Express
├── package.json           # Dependências do backend
└── README.md
```

## 🌐 Execução Direta do GitHub

### **Para Desenvolvedores**
1. **Clone o repositório**
2. **Configure MongoDB Atlas** (recomendado)
3. **Execute a aplicação**

### **Para Deploy em Produção**
- **Vercel**: Configure `MONGODB_URI` nas variáveis de ambiente
- **Netlify**: Adicione a variável no painel de configuração
- **Heroku**: Use `heroku config:set MONGODB_URI=...`
- **Railway**: Configure no painel de variáveis

### **Vantagens do MongoDB Atlas**
- ✅ **Sem instalação local** do MongoDB
- ✅ **Funciona em qualquer sistema operacional**
- ✅ **Acessível de qualquer lugar**
- ✅ **Backup automático** (planos pagos)
- ✅ **Escalável** conforme necessário

## 🎨 Personalização

### Cores e Estilos
- Edite o arquivo `client/src/index.css` para personalizar cores e animações
- Modifique os componentes Bootstrap para ajustar o visual

### Funcionalidades
- Adicione novos campos ao modelo de produto em `server.js`
- Implemente filtros e busca na lista de produtos
- Adicione categorias para organizar os produtos

## 🐛 Solução de Problemas

### Erro de Conexão com MongoDB
- Verifique se o MongoDB está rodando
- Confirme a string de conexão no arquivo `.env`
- Teste a conexão: `mongo` ou `mongosh`

### Erro no Frontend
- Verifique se o backend está rodando na porta 5000
- Confirme se as dependências foram instaladas
- Limpe o cache: `npm run build`

### Erro no Backend
- Verifique os logs do servidor
- Confirme se as dependências estão instaladas
- Teste a API com Postman ou similar

## 📝 Licença

Este projeto está sob a licença MIT.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Se você encontrar algum problema ou tiver dúvidas, abra uma issue no repositório.

---

**Desenvolvido com ❤️ usando React, Express e MongoDB**
