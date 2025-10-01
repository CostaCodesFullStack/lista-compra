const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lista-compras', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro na conexão com MongoDB:'));
db.once('open', () => {
  console.log('Conectado ao MongoDB com sucesso!');
});

// Schema do Produto
const produtoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true
  },
  quantidade: {
    type: Number,
    default: 1
  },
  comprado: {
    type: Boolean,
    default: false
  },
  dataCriacao: {
    type: Date,
    default: Date.now
  }
});

const Produto = mongoose.model('Produto', produtoSchema);

// Rotas da API

// GET - Listar todos os produtos
app.get('/api/produtos', async (req, res) => {
  try {
    const produtos = await Produto.find().sort({ dataCriacao: -1 });
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produtos', error: error.message });
  }
});

// POST - Cadastrar novo produto
app.post('/api/produtos', async (req, res) => {
  try {
    const { nome, quantidade } = req.body;
    
    if (!nome || nome.trim() === '') {
      return res.status(400).json({ message: 'Nome do produto é obrigatório' });
    }

    const novoProduto = new Produto({
      nome: nome.trim(),
      quantidade: quantidade || 1
    });

    const produtoSalvo = await novoProduto.save();
    res.status(201).json(produtoSalvo);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar produto', error: error.message });
  }
});

// PUT - Marcar produto como comprado/não comprado
app.put('/api/produtos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { comprado } = req.body;

    const produto = await Produto.findByIdAndUpdate(
      id,
      { comprado },
      { new: true }
    );

    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    res.json(produto);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar produto', error: error.message });
  }
});

// DELETE - Remover produto
app.delete('/api/produtos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await Produto.findByIdAndDelete(id);

    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    res.json({ message: 'Produto removido com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover produto', error: error.message });
  }
});

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API da Lista de Compras funcionando!' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
