# 🔧 Variáveis de Ambiente - Frontend

## Variáveis Necessárias para Deploy na Vercel:

### API URL
```
REACT_APP_API_URL=https://netflix-clone-backend.vercel.app/api
```

## 📋 Instruções para Configurar na Vercel:

1. Acesse o painel do projeto frontend na Vercel
2. Vá em Settings > Environment Variables
3. Adicione a variável `REACT_APP_API_URL` com o valor da URL do backend
4. Certifique-se de que está marcada para "Production"
5. Faça um novo deploy após adicionar a variável

## 🔄 Atualização Automática:

Após o deploy do backend, você precisará:
1. Obter a URL do backend da Vercel
2. Atualizar a variável `REACT_APP_API_URL` no frontend
3. Fazer um novo deploy do frontend
