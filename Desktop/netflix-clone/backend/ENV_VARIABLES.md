# 🔧 Variáveis de Ambiente - Backend

## Variáveis Necessárias para Deploy na Vercel:

### MongoDB
```
MONGODB_URI=mongodb+srv://cauadevcosta_db_user:caua123costa@netflixclone.fcajxx6.mongodb.net/?retryWrites=true&w=majority&appName=netflixclone
```

### JWT
```
JWT_SECRET=netflix-clone-secret-key-2024-production
JWT_EXPIRE=7d
```

### Servidor
```
NODE_ENV=production
PORT=5000
HOST=0.0.0.0
```

## 📋 Instruções para Configurar na Vercel:

1. Acesse o painel do projeto backend na Vercel
2. Vá em Settings > Environment Variables
3. Adicione cada variável acima com seus respectivos valores
4. Certifique-se de que todas estão marcadas para "Production"
5. Faça um novo deploy após adicionar as variáveis
