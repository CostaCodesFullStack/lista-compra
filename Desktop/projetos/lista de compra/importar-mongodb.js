#!/usr/bin/env node

/**
 * 🗄️ Script de Importação Direta para MongoDB
 * 
 * Este script permite importar dados diretamente no MongoDB para a aplicação Lista de Compras
 * Suporta tanto MongoDB Atlas (nuvem) quanto MongoDB local
 * 
 * Uso:
 * node importar-mongodb.js
 * node importar-mongodb.js --arquivo dados.json
 * node importar-mongodb.js --exemplo
 * 
 * Configuração:
 * - MongoDB Atlas: Configure MONGODB_URI no arquivo .env
 * - MongoDB Local: Instale o MongoDB e configure a string de conexão
 * 
 * Veja MONGODB_ATLAS_SETUP.md para configuração completa do Atlas
 */

// Carregar variáveis de ambiente
require('dotenv').config();

const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// Configurações
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lista-compras';
const DB_NAME = 'lista-compras';
const COLLECTION_NAME = 'produtos';

// Verificar se está usando MongoDB Atlas
const isAtlas = MONGODB_URI.includes('mongodb+srv://');

// Dados de exemplo para importação
const produtosExemplo = [
  {
    nome: "Arroz Integral",
    quantidade: 2,
    comprado: false,
    dataCriacao: new Date()
  },
  {
    nome: "Feijão Preto",
    quantidade: 1,
    comprado: false,
    dataCriacao: new Date()
  },
  {
    nome: "Tomate",
    quantidade: 6,
    comprado: false,
    dataCriacao: new Date()
  },
  {
    nome: "Cebola",
    quantidade: 4,
    comprado: false,
    dataCriacao: new Date()
  },
  {
    nome: "Pão de Forma",
    quantidade: 2,
    comprado: false,
    dataCriacao: new Date()
  },
  {
    nome: "Leite Integral",
    quantidade: 3,
    comprado: false,
    dataCriacao: new Date()
  },
  {
    nome: "Queijo Minas",
    quantidade: 1,
    comprado: false,
    dataCriacao: new Date()
  },
  {
    nome: "Banana",
    quantidade: 12,
    comprado: false,
    dataCriacao: new Date()
  },
  {
    nome: "Maçã",
    quantidade: 8,
    comprado: false,
    dataCriacao: new Date()
  },
  {
    nome: "Carne Bovina",
    quantidade: 2,
    comprado: false,
    dataCriacao: new Date()
  }
];

/**
 * Conecta ao MongoDB
 */
async function conectarMongoDB() {
  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    
    if (isAtlas) {
      console.log('✅ Conectado ao MongoDB Atlas com sucesso!');
      console.log('☁️  Usando banco de dados na nuvem');
    } else {
      console.log('✅ Conectado ao MongoDB local com sucesso!');
      console.log('🖥️  Usando banco de dados local');
    }
    
    return client;
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:', error.message);
    
    if (isAtlas) {
      console.log('\n💡 Dicas para MongoDB Atlas:');
      console.log('   - Verifique se a string de conexão está correta');
      console.log('   - Confirme se o usuário tem permissões de leitura/escrita');
      console.log('   - Verifique se o IP está liberado no Network Access');
      console.log('   - Teste a conexão no MongoDB Compass');
    } else {
      console.log('\n💡 Dicas para MongoDB local:');
      console.log('   - Verifique se o MongoDB está rodando: mongod');
      console.log('   - Confirme se a porta 27017 está disponível');
      console.log('   - Teste: mongosh ou mongo');
    }
    
    process.exit(1);
  }
}

/**
 * Limpa a coleção de produtos
 */
async function limparColecao(db) {
  try {
    const result = await db.collection(COLLECTION_NAME).deleteMany({});
    console.log(`🗑️  Coleção limpa: ${result.deletedCount} produtos removidos`);
    return true;
  } catch (error) {
    console.error('❌ Erro ao limpar coleção:', error.message);
    return false;
  }
}

/**
 * Importa produtos de exemplo
 */
async function importarExemplo(db) {
  try {
    const result = await db.collection(COLLECTION_NAME).insertMany(produtosExemplo);
    console.log(`✅ ${result.insertedCount} produtos de exemplo importados com sucesso!`);
    
    // Lista os produtos importados
    console.log('\n📋 Produtos importados:');
    produtosExemplo.forEach((produto, index) => {
      console.log(`  ${index + 1}. ${produto.nome} (Qtd: ${produto.quantidade})`);
    });
    
    return true;
  } catch (error) {
    console.error('❌ Erro ao importar produtos de exemplo:', error.message);
    return false;
  }
}

/**
 * Importa produtos de um arquivo JSON
 */
async function importarArquivo(db, caminhoArquivo) {
  try {
    // Verifica se o arquivo existe
    if (!fs.existsSync(caminhoArquivo)) {
      console.error(`❌ Arquivo não encontrado: ${caminhoArquivo}`);
      return false;
    }

    // Lê o arquivo JSON
    const conteudo = fs.readFileSync(caminhoArquivo, 'utf8');
    const produtos = JSON.parse(conteudo);

    // Valida se é um array
    if (!Array.isArray(produtos)) {
      console.error('❌ O arquivo deve conter um array de produtos');
      return false;
    }

    // Adiciona data de criação se não existir
    const produtosProcessados = produtos.map(produto => ({
      ...produto,
      dataCriacao: produto.dataCriacao ? new Date(produto.dataCriacao) : new Date(),
      comprado: produto.comprado || false,
      quantidade: produto.quantidade || 1
    }));

    const result = await db.collection(COLLECTION_NAME).insertMany(produtosProcessados);
    console.log(`✅ ${result.insertedCount} produtos do arquivo importados com sucesso!`);
    
    return true;
  } catch (error) {
    console.error('❌ Erro ao importar arquivo:', error.message);
    return false;
  }
}

/**
 * Lista todos os produtos na coleção
 */
async function listarProdutos(db) {
  try {
    const produtos = await db.collection(COLLECTION_NAME).find({}).toArray();
    console.log(`\n📊 Total de produtos na coleção: ${produtos.length}`);
    
    if (produtos.length > 0) {
      console.log('\n📋 Produtos na coleção:');
      produtos.forEach((produto, index) => {
        const status = produto.comprado ? '✅ Comprado' : '⏳ Pendente';
        console.log(`  ${index + 1}. ${produto.nome} (Qtd: ${produto.quantidade}) - ${status}`);
      });
    }
    
    return true;
  } catch (error) {
    console.error('❌ Erro ao listar produtos:', error.message);
    return false;
  }
}

/**
 * Cria um arquivo de exemplo
 */
function criarArquivoExemplo() {
  const arquivoExemplo = 'produtos-exemplo.json';
  const conteudo = JSON.stringify(produtosExemplo, null, 2);
  
  try {
    fs.writeFileSync(arquivoExemplo, conteudo, 'utf8');
    console.log(`📄 Arquivo de exemplo criado: ${arquivoExemplo}`);
    console.log('💡 Você pode editar este arquivo e usar: node importar-mongodb.js --arquivo produtos-exemplo.json');
  } catch (error) {
    console.error('❌ Erro ao criar arquivo de exemplo:', error.message);
  }
}

/**
 * Função principal
 */
async function main() {
  if (isAtlas) {
    console.log('☁️  Iniciando importação para MongoDB Atlas...\n');
  } else {
    console.log('🚀 Iniciando importação para MongoDB local...\n');
  }
  
  // Verifica argumentos da linha de comando
  const args = process.argv.slice(2);
  const modoArquivo = args.includes('--arquivo');
  const modoExemplo = args.includes('--exemplo');
  const modoCriarExemplo = args.includes('--criar-exemplo');
  
  // Se for apenas para criar arquivo de exemplo
  if (modoCriarExemplo) {
    criarArquivoExemplo();
    return;
  }
  
  // Conecta ao MongoDB
  const client = await conectarMongoDB();
  const db = client.db(DB_NAME);
  
  try {
    // Limpa a coleção
    await limparColecao(db);
    
    // Importa dados baseado no modo
    if (modoArquivo) {
      const indiceArquivo = args.indexOf('--arquivo');
      if (indiceArquivo !== -1 && args[indiceArquivo + 1]) {
        const caminhoArquivo = args[indiceArquivo + 1];
        await importarArquivo(db, caminhoArquivo);
      } else {
        console.log('❌ Uso correto: node importar-mongodb.js --arquivo caminho/arquivo.json');
        return;
      }
    } else {
      // Modo padrão: importa exemplo
      await importarExemplo(db);
    }
    
    // Lista produtos para confirmação
    await listarProdutos(db);
    
    console.log('\n🎉 Importação concluída com sucesso!');
    
    if (isAtlas) {
      console.log('\n☁️  Dados salvos no MongoDB Atlas');
      console.log('💡 Acesse https://cloud.mongodb.com/ para visualizar os dados');
    } else {
      console.log('\n🖥️  Dados salvos no MongoDB local');
    }
    
  } catch (error) {
    console.error('❌ Erro durante a importação:', error.message);
  } finally {
    // Fecha a conexão
    await client.close();
    if (isAtlas) {
      console.log('\n🔌 Conexão com MongoDB Atlas fechada');
    } else {
      console.log('\n🔌 Conexão com MongoDB local fechada');
    }
  }
}

/**
 * Tratamento de erros não capturados
 */
process.on('unhandledRejection', (error) => {
  console.error('❌ Erro não tratado:', error);
  process.exit(1);
});

// Executa o script se for chamado diretamente
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  conectarMongoDB,
  importarExemplo,
  importarArquivo,
  limparColecao,
  listarProdutos
};
