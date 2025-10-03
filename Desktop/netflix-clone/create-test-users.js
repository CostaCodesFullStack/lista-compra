const mongoose = require('mongoose');
const User = require('./backend/src/models/User');

// Conectar ao MongoDB
const mongoUri = 'mongodb+srv://cauadevcosta_db_user:caua123costa@netflixclone.fcajxx6.mongodb.net/?retryWrites=true&w=majority&appName=netflixclone';

console.log('🔗 Conectando ao MongoDB...');

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado ao MongoDB'))
.catch(err => {
  console.log('❌ Erro ao conectar MongoDB:', err.message);
  process.exit(1);
});

const createTestUsers = async () => {
  try {
    // Criar usuários de teste
    const testUsers = [
      {
        name: 'Usuário Teste',
        email: 'teste@netflix.com',
        password: '123456',
        isAdmin: false
      },
      {
        name: 'Admin Teste',
        email: 'admin@netflix.com',
        password: '123456',
        isAdmin: true
      },
      {
        name: 'João Silva',
        email: 'joao@teste.com',
        password: '123456',
        isAdmin: false
      }
    ];

    for (const userData of testUsers) {
      // Verificar se usuário já existe
      const existingUser = await User.findOne({ email: userData.email });
      
      if (existingUser) {
        console.log(`⚠️ Usuário ${userData.email} já existe`);
        continue;
      }

      // Criar usuário
      const user = await User.create(userData);
      console.log(`✅ Usuário criado: ${user.email}`);
    }

    console.log('🎉 Usuários de teste criados com sucesso!');
    console.log('\n📋 Credenciais de Teste:');
    console.log('┌─────────────────────────────────────────┐');
    console.log('│  EMAIL                │  SENHA          │');
    console.log('├─────────────────────────────────────────┤');
    console.log('│  teste@netflix.com    │  123456         │');
    console.log('│  admin@netflix.com    │  123456         │');
    console.log('│  joao@teste.com       │  123456         │');
    console.log('└─────────────────────────────────────────┘');
    
  } catch (error) {
    console.error('❌ Erro ao criar usuários:', error);
  } finally {
    mongoose.connection.close();
    console.log('🔌 Conexão com MongoDB fechada');
  }
};

createTestUsers();
