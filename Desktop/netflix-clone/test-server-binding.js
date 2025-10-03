const http = require('http');

// Teste de conectividade do servidor
function testServerBinding() {
  console.log('🧪 Testando configuração de rede do servidor...\n');
  
  const testUrls = [
    'http://localhost:5000/api/test',
    'http://127.0.0.1:5000/api/test',
    'http://0.0.0.0:5000/api/test'
  ];
  
  testUrls.forEach((url, index) => {
    console.log(`📡 Teste ${index + 1}: ${url}`);
    
    const req = http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log(`   ✅ Status: ${res.statusCode} - OK`);
          try {
            const jsonData = JSON.parse(data);
            console.log(`   📊 Resposta: ${jsonData.message || 'Sucesso'}`);
          } catch (e) {
            console.log(`   📊 Resposta: ${data.substring(0, 100)}...`);
          }
        } else {
          console.log(`   ❌ Status: ${res.statusCode} - ERRO`);
        }
        console.log('');
      });
    });
    
    req.on('error', (err) => {
      console.log(`   ❌ Erro: ${err.message}`);
      console.log('');
    });
    
    req.setTimeout(5000, () => {
      console.log(`   ⏰ Timeout: Servidor não respondeu em 5s`);
      console.log('');
      req.destroy();
    });
  });
}

// Executar teste
testServerBinding();
