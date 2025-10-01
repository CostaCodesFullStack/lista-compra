# 🛒 Lista de Compras Inteligente

> **Uma aplicação web moderna e completa para gerenciar suas listas de compras com interface intuitiva, persistência de dados na nuvem e funcionalidades avançadas.**

[![React](https://img.shields.io/badge/React-18.2.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-14+-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat-square&logo=mongodb)](https://www.mongodb.com/cloud/atlas)
[![Express](https://img.shields.io/badge/Express-4.18.2-black?style=flat-square&logo=express)](https://expressjs.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.0-purple?style=flat-square&logo=bootstrap)](https://getbootstrap.com/)

## 🎯 **Sobre o Projeto**

Esta é uma aplicação full-stack desenvolvida para facilitar o gerenciamento de listas de compras. Com uma interface moderna e responsiva, você pode adicionar, marcar como comprado e remover produtos de forma intuitiva. Os dados são persistidos na nuvem usando MongoDB Atlas, garantindo acesso de qualquer lugar e dispositivo.

### 🌟 **Destaques**

- **☁️ Cloud-First**: Configurado para MongoDB Atlas (nuvem)
- **📱 Responsivo**: Funciona perfeitamente em mobile e desktop
- **🎨 Interface Moderna**: Design elegante com Bootstrap e animações
- **🔒 Seguro**: Modal de confirmação para ações críticas
- **⚡ Rápido**: Carregamento otimizado e performance excelente
- **🌐 Multiplataforma**: Funciona em Windows, Mac e Linux

## ✨ **Funcionalidades Principais**

### 🛍️ **Gerenciamento de Produtos**
- ✅ **Adicionar produtos** com nome e quantidade personalizada
- ✅ **Edição em tempo real** com validação instantânea
- ✅ **Marcar como comprado** com checkbox interativo
- ✅ **Remoção segura** com modal de confirmação
- ✅ **Organização automática** (pendentes vs comprados)

### 📊 **Interface e Experiência**
- ✅ **Design responsivo** que funciona em qualquer dispositivo
- ✅ **Animações suaves** e transições elegantes
- ✅ **Estatísticas em tempo real** (total, pendentes, comprados)
- ✅ **Feedback visual** para todas as ações
- ✅ **Tema moderno** com gradientes e cores atrativas

### 🔧 **Funcionalidades Técnicas**
- ✅ **API RESTful completa** com endpoints padronizados
- ✅ **Validação robusta** de formulários e dados
- ✅ **Persistência na nuvem** com MongoDB Atlas
- ✅ **Tratamento de erros** com mensagens amigáveis
- ✅ **Carregamento otimizado** com estados de loading

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

## 🎬 **Demonstração**

### **Como Funciona**
1. **Adicione produtos** digitando o nome e quantidade
2. **Marque como comprado** clicando no checkbox
3. **Remova itens** com confirmação de segurança
4. **Acompanhe estatísticas** em tempo real
5. **Acesse de qualquer lugar** - dados na nuvem

### **Casos de Uso**
- 🏠 **Lista de compras doméstica** - Organize suas compras da semana
- 🛒 **Compras em família** - Compartilhe a lista com familiares
- 📱 **Uso móvel** - Acesse no supermercado pelo celular
- 💼 **Compras corporativas** - Gerencie itens do escritório
- 🎓 **Projeto educacional** - Aprenda React, Node.js e MongoDB

### **Screenshots**
```
🛒 Lista de Compras Inteligente
┌─────────────────────────────────────┐
│ ➕ Adicionar à Lista                │
│ ┌─────────────────────────────────┐ │
│ │ Nome: [Arroz Integral    ] [2] │ │
│ └─────────────────────────────────┘ │
│                                     │
│ 📋 Produtos Pendentes (3)           │
│ ☐ Arroz Integral (2x)              │
│ ☐ Feijão Preto (1x)                │
│ ☐ Tomate (6x)                      │
│                                     │
│ ✅ Produtos Comprados (1)           │
│ ☑ Leite Integral (3x)              │
│                                     │
│ 📊 Total: 4 | Pendentes: 3 | Comprados: 1 │
└─────────────────────────────────────┘
```

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

## 🤝 **Contribuição**

Contribuições são sempre bem-vindas! Se você tem ideias para melhorar o projeto:

1. **Fork** o repositório
2. **Crie** uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. **Abra** um Pull Request

### **Ideias para Contribuir**
- 🎨 Melhorias na interface
- 🔧 Novas funcionalidades
- 🐛 Correção de bugs
- 📚 Melhoria na documentação
- ⚡ Otimizações de performance

## 📄 **Licença**

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 **Suporte e Contato**

- **Issues**: [GitHub Issues](https://github.com/seu-usuario/lista-de-compras/issues)
- **Discussions**: [GitHub Discussions](https://github.com/seu-usuario/lista-de-compras/discussions)
- **Email**: seu-email@exemplo.com

## 🙏 **Agradecimentos**

- [React](https://reactjs.org/) - Biblioteca JavaScript para UI
- [Express.js](https://expressjs.com/) - Framework web para Node.js
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Banco de dados na nuvem
- [Bootstrap](https://getbootstrap.com/) - Framework CSS
- [React Bootstrap](https://react-bootstrap.github.io/) - Componentes Bootstrap para React

---

<div align="center">

**Desenvolvido com ❤️ usando React, Express e MongoDB**

[⬆ Voltar ao topo](#-lista-de-compras-inteligente)

</div>
