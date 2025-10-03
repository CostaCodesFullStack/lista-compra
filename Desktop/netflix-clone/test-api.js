#!/usr/bin/env node

/**
 * Script de teste para verificar se as rotas da API estão funcionando
 * Execute com: node test-api.js
 */

const https = require('https');
const http = require('http');

const API_BASE_URL = 'https://netflix-clone-pmt7czfwe-costacodes-projects.vercel.app/api';

// Função para fazer requisições HTTP/HTTPS
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    
    client.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({
            status: res.statusCode,
            data: jsonData,
            headers: res.headers
          });
        } catch (error) {
          resolve({
            status: res.statusCode,
            data: data,
            headers: res.headers,
            error: 'Invalid JSON'
          });
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

// Função para testar uma rota
async function testRoute(route, description) {
  console.log(`\n🧪 Testando: ${description}`);
  console.log(`📍 Rota: ${API_BASE_URL}${route}`);
  
  try {
    const response = await makeRequest(`${API_BASE_URL}${route}`);
    
    if (response.status === 200) {
      console.log(`✅ Status: ${response.status} - OK`);
      if (response.data.movies) {
        console.log(`📊 Filmes encontrados: ${response.data.movies.length}`);
      } else if (Array.isArray(response.data)) {
        console.log(`📊 Itens encontrados: ${response.data.length}`);
      } else {
        console.log(`📊 Resposta: ${JSON.stringify(response.data).substring(0, 100)}...`);
      }
    } else {
      console.log(`❌ Status: ${response.status} - ERRO`);
      console.log(`📄 Resposta: ${JSON.stringify(response.data)}`);
    }
  } catch (error) {
    console.log(`💥 Erro: ${error.message}`);
  }
}

// Função principal de teste
async function runTests() {
  console.log('🚀 Iniciando testes da API Netflix Clone');
  console.log(`🌐 Base URL: ${API_BASE_URL}`);
  
  // Lista de rotas para testar
  const routes = [
    { route: '/test', description: 'Rota de teste' },
    { route: '/movies', description: 'Lista de filmes' },
    { route: '/movies?featured=true&limit=5', description: 'Filmes em destaque' },
    { route: '/movies?trending=true&limit=5', description: 'Filmes em alta' },
    { route: '/movies/1', description: 'Detalhes do filme 1' },
    { route: '/categories', description: 'Lista de categorias' },
    { route: '/movies/recommended', description: 'Filmes recomendados' },
    { route: '/watchlist', description: 'Watchlist (mockada)' },
    { route: '/users/favorites', description: 'Favoritos (mockados)' },
    { route: '/users/watch-history', description: 'Histórico (mockado)' }
  ];
  
  // Executar testes
  for (const route of routes) {
    await testRoute(route.route, route.description);
    // Pequena pausa entre requisições
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n🏁 Testes concluídos!');
  console.log('\n📋 Resumo:');
  console.log('- Se todas as rotas retornaram status 200, a API está funcionando corretamente');
  console.log('- Se alguma rota retornou 404, verifique a configuração do vercel.json');
  console.log('- Se alguma rota retornou erro 500, verifique os logs da Vercel');
}

// Executar testes
runTests().catch(console.error);
