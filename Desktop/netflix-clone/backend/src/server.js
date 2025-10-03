const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Carregar variáveis de ambiente
require('dotenv').config();

// String de conexão MongoDB (já existente no projeto)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://cauadevcosta_db_user:caua123costa@netflixclone.fcajxx6.mongodb.net/?retryWrites=true&w=majority&appName=netflixclone';

// Configurações JWT
const JWT_SECRET = process.env.JWT_SECRET || 'netflix-clone-secret-key-2024-production';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';

// Configurações do servidor
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';
const NODE_ENV = process.env.NODE_ENV || 'development';

console.log('🔧 Configurações carregadas:');
console.log('NODE_ENV:', NODE_ENV);
console.log('PORT:', PORT);
console.log('HOST:', HOST);
console.log('MongoDB URI configurada:', MONGODB_URI ? '✅' : '❌');

console.log('🔧 Variáveis de ambiente carregadas:');
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('NODE_ENV:', process.env.NODE_ENV);

const app = express();

// Middleware de segurança
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // limite de 100 requests por IP
  message: 'Muitas requisições deste IP, tente novamente em 15 minutos.'
});
app.use(limiter);

// CORS - Configurado para produção
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://netflix-clone-frontend.vercel.app',
    'https://netflix-clone-k7n2vcflr-costacodes-projects.vercel.app',
    'https://netflix-clone-frontend-*.vercel.app',
    'https://*.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Middleware para parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos
app.use('/images', express.static('public/images'));

// Dados mockados para quando o MongoDB não estiver disponível
const mockCategories = [
  {
    _id: '1',
    name: 'Ação',
    description: 'Filmes de ação e aventura',
    color: '#E50914',
    isActive: true,
    sortOrder: 1
  },
  {
    _id: '2',
    name: 'Comédia',
    description: 'Filmes de comédia',
    color: '#FFD700',
    isActive: true,
    sortOrder: 2
  },
  {
    _id: '3',
    name: 'Drama',
    description: 'Filmes dramáticos',
    color: '#8B0000',
    isActive: true,
    sortOrder: 3
  },
  {
    _id: '4',
    name: 'Terror',
    description: 'Filmes de terror',
    color: '#000000',
    isActive: true,
    sortOrder: 4
  },
  {
    _id: '5',
    name: 'Ficção Científica',
    description: 'Filmes de ficção científica',
    color: '#00CED1',
    isActive: true,
    sortOrder: 5
  }
];

const mockMovies = [
  {
    _id: '1',
    title: 'Stranger Things',
    description: 'Um grupo de crianças em Hawkins, Indiana, enfrenta forças sobrenaturais e experimentos governamentais secretos.',
    thumbnail: 'https://netflix-clone.vercel.app/images/stranger-things.svg',
    video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    duration: 50,
    year: 2016,
    rating: 8.7,
    genres: ['Drama', 'Ficção Científica', 'Terror'],
    category: { _id: '5', name: 'Ficção Científica', color: '#00CED1' },
    ageRating: '14',
    isFeatured: true,
    isTrending: true,
    views: 1000,
    likes: 500,
    dislikes: 50,
    director: 'Matt Duffer',
    cast: [
      { name: 'Millie Bobby Brown', character: 'Eleven' },
      { name: 'Finn Wolfhard', character: 'Mike Wheeler' }
    ]
  },
  {
    _id: '2',
    title: 'The Crown',
    description: 'A história da rainha Elizabeth II e os eventos políticos que moldaram a segunda metade do século XX.',
    thumbnail: 'https://netflix-clone.vercel.app/images/the-crown.svg',
    video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    duration: 60,
    year: 2016,
    rating: 8.6,
    genres: ['Drama', 'História'],
    category: { _id: '3', name: 'Drama', color: '#8B0000' },
    ageRating: '16',
    isFeatured: true,
    views: 800,
    likes: 400,
    dislikes: 30,
    director: 'Peter Morgan',
    cast: [
      { name: 'Claire Foy', character: 'Rainha Elizabeth II' },
      { name: 'Matt Smith', character: 'Príncipe Philip' }
    ]
  },
  {
    _id: '3',
    title: 'Money Heist',
    description: 'Um criminoso conhecido como "O Professor" planeja o maior assalto da história para imprimir bilhões de euros.',
    thumbnail: 'https://netflix-clone.vercel.app/images/money-heist.svg',
    video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    duration: 70,
    year: 2017,
    rating: 8.3,
    genres: ['Ação', 'Crime', 'Drama'],
    category: { _id: '1', name: 'Ação', color: '#E50914' },
    ageRating: '16',
    isTrending: true,
    views: 1200,
    likes: 600,
    dislikes: 40,
    director: 'Álex Pina',
    cast: [
      { name: 'Úrsula Corberó', character: 'Tokyo' },
      { name: 'Álvaro Morte', character: 'O Professor' }
    ]
  },
  {
    _id: '4',
    title: 'The Witcher',
    description: 'Geralt de Rivia, um caçador de monstros solitário, luta para encontrar seu lugar em um mundo onde as pessoas são mais perversas que as bestas.',
    thumbnail: 'https://netflix-clone.vercel.app/images/the-witcher.svg',
    video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    duration: 60,
    year: 2019,
    rating: 8.2,
    genres: ['Ação', 'Aventura', 'Drama'],
    category: { _id: '1', name: 'Ação', color: '#E50914' },
    ageRating: '16',
    isFeatured: true,
    views: 900,
    likes: 450,
    dislikes: 25,
    director: 'Lauren Schmidt Hissrich',
    cast: [
      { name: 'Henry Cavill', character: 'Geralt de Rivia' },
      { name: 'Anya Chalotra', character: 'Yennefer' }
    ]
  },
  {
    _id: '5',
    title: 'Ozark',
    description: 'Um consultor financeiro arrasta sua família de Chicago para os Ozarks de Missouri, onde deve lavar dinheiro para apaziguar um cartel de drogas.',
    thumbnail: 'https://netflix-clone.vercel.app/images/ozark.svg',
    video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    duration: 60,
    year: 2017,
    rating: 8.1,
    genres: ['Crime', 'Drama', 'Thriller'],
    category: { _id: '3', name: 'Drama', color: '#8B0000' },
    ageRating: '16',
    isTrending: true,
    views: 700,
    likes: 350,
    dislikes: 20,
    director: 'Bill Dubuque',
    cast: [
      { name: 'Jason Bateman', character: 'Marty Byrde' },
      { name: 'Laura Linney', character: 'Wendy Byrde' }
    ]
  },
  {
    _id: '6',
    title: 'Bridgerton',
    description: 'A história dos oito irmãos Bridgerton enquanto buscam amor e felicidade na alta sociedade de Londres.',
    thumbnail: 'https://netflix-clone.vercel.app/images/bridgerton.svg',
    video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    duration: 60,
    year: 2020,
    rating: 7.3,
    genres: ['Drama', 'Romance'],
    category: { _id: '3', name: 'Drama', color: '#8B0000' },
    ageRating: '14',
    isFeatured: true,
    views: 600,
    likes: 300,
    dislikes: 15,
    director: 'Chris Van Dusen',
    cast: [
      { name: 'Phoebe Dynevor', character: 'Daphne Bridgerton' },
      { name: 'Regé-Jean Page', character: 'Simon Basset' }
    ]
  },
  {
    _id: '7',
    title: 'The Queen\'s Gambit',
    description: 'Uma jovem órfã se torna uma jogadora de xadrez de classe mundial enquanto luta contra vícios emocionais.',
    thumbnail: 'https://netflix-clone.vercel.app/images/queens-gambit.svg',
    video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    duration: 60,
    year: 2020,
    rating: 8.5,
    genres: ['Drama'],
    category: { _id: '3', name: 'Drama', color: '#8B0000' },
    ageRating: '14',
    isTrending: true,
    views: 850,
    likes: 425,
    dislikes: 35,
    director: 'Scott Frank',
    cast: [
      { name: 'Anya Taylor-Joy', character: 'Beth Harmon' },
      { name: 'Thomas Brodie-Sangster', character: 'Benny Watts' }
    ]
  },
  {
    _id: '8',
    title: 'Squid Game',
    description: 'Centenas de jogadores endividados arriscam suas vidas em um misterioso jogo de sobrevivência com prêmio de 45,6 bilhões de won.',
    thumbnail: 'https://netflix-clone.vercel.app/images/squid-game.svg',
    video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    duration: 60,
    year: 2021,
    rating: 8.0,
    genres: ['Drama', 'Thriller'],
    category: { _id: '3', name: 'Drama', color: '#8B0000' },
    ageRating: '16',
    isFeatured: true,
    isTrending: true,
    views: 1500,
    likes: 750,
    dislikes: 60,
    director: 'Hwang Dong-hyuk',
    cast: [
      { name: 'Lee Jung-jae', character: 'Seong Gi-hun' },
      { name: 'Park Hae-soo', character: 'Cho Sang-woo' }
    ]
  }
];

let isMongoConnected = false;

// Tentar conectar ao MongoDB
console.log('🔗 Tentando conectar ao MongoDB...');

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
.then(() => {
  console.log('✅ Conectado ao MongoDB');
  isMongoConnected = true;
})
.catch(err => {
  console.log('⚠️ MongoDB não disponível, usando dados mockados');
  console.log('❌ Erro:', err.message);
  isMongoConnected = false;
  // Não mostrar erro completo para evitar logs desnecessários
});

// Middleware para usar dados mockados quando necessário
const mockDataMiddleware = (req, res, next) => {
  // Só usar dados mockados se MongoDB não estiver conectado
  if (!isMongoConnected) {
    // Rota de categorias
    if (req.path === '/api/categories' && req.method === 'GET') {
      return res.json(mockCategories);
    }
    
    // Rota de filmes com filtros
    if (req.path === '/api/movies' && req.method === 'GET') {
      let filteredMovies = [...mockMovies];
      
      // Aplicar filtros
      if (req.query.featured === 'true') {
        filteredMovies = filteredMovies.filter(movie => movie.isFeatured);
      }
      
      if (req.query.trending === 'true') {
        filteredMovies = filteredMovies.filter(movie => movie.isTrending);
      }
      
      if (req.query.category) {
        filteredMovies = filteredMovies.filter(movie => 
          movie.category.name.toLowerCase() === req.query.category.toLowerCase()
        );
      }
      
      // Aplicar limite
      const limit = parseInt(req.query.limit) || 10;
      filteredMovies = filteredMovies.slice(0, limit);
      
      return res.json({
        movies: filteredMovies,
        pagination: {
          current: 1,
          pages: 1,
          total: filteredMovies.length
        }
      });
    }
    
    // Rota de filme específico
    if (req.path.startsWith('/api/movies/') && req.method === 'GET') {
      const movieId = req.path.split('/')[3];
      const movie = mockMovies.find(m => m._id === movieId);
      if (!movie) {
        return res.status(404).json({ message: 'Filme não encontrado' });
      }
      return res.json(movie);
    }
    
    // Rota de filmes recomendados
    if (req.path === '/api/movies/recommended' && req.method === 'GET') {
      const recommendedMovies = mockMovies.filter(movie => movie.isFeatured || movie.isTrending);
      return res.json({
        movies: recommendedMovies.slice(0, 10),
        pagination: {
          current: 1,
          pages: 1,
          total: recommendedMovies.length
        }
      });
    }
    
    // Rota de watchlist (mockada)
    if (req.path === '/api/watchlist' && req.method === 'GET') {
      return res.json({
        watchlist: [],
        total: 0
      });
    }
    
    // Rota de favoritos (mockada)
    if (req.path === '/api/users/favorites' && req.method === 'GET') {
      return res.json({
        favorites: [],
        total: 0
      });
    }
    
    // Rota de histórico de visualização (mockada)
    if (req.path === '/api/users/watch-history' && req.method === 'GET') {
      return res.json({
        history: [],
        total: 0
      });
    }
  }
  
  // Para outras rotas, continuar normalmente
  next();
};

// Aplicar middleware mockado antes das rotas normais
app.use(mockDataMiddleware);

// Middleware para verificar conexão com MongoDB antes das rotas protegidas
const mongoCheckMiddleware = (req, res, next) => {
  if (!isMongoConnected && req.path.startsWith('/api/auth')) {
    return res.status(503).json({ 
      message: 'Serviço temporariamente indisponível. Banco de dados não conectado.',
      mode: 'maintenance'
    });
  }
  next();
};

// Aplicar middleware de verificação do MongoDB
app.use(mongoCheckMiddleware);

// Rotas normais (quando MongoDB estiver disponível)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/movies', require('./routes/movies'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/watchlist', require('./routes/watchlist'));

// Rota de teste
app.get('/api/test', (req, res) => {
  res.json({ 
    message: '🎬 Netflix Clone API funcionando!',
    mongoConnected: isMongoConnected,
    mode: isMongoConnected ? 'MongoDB' : 'Mock Data'
  });
});

// Middleware de erro
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Algo deu errado!', 
    error: process.env.NODE_ENV === 'development' ? err.message : 'Erro interno do servidor'
  });
});

// Rota 404
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

app.listen(PORT, HOST, () => {
  console.log(`🚀 Servidor rodando em ${HOST}:${PORT}`);
  console.log(`📊 Modo: ${isMongoConnected ? 'MongoDB' : 'Dados Mockados'}`);
  console.log(`🌍 Ambiente: ${NODE_ENV}`);
  console.log(`🔗 MongoDB: ${isMongoConnected ? 'Conectado' : 'Usando dados mockados'}`);
});