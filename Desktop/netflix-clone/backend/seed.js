const mongoose = require('mongoose');
const Movie = require('./src/models/Movie');
const Category = require('./src/models/Category');

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/netflix-clone', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado ao MongoDB'))
.catch(err => console.error('❌ Erro ao conectar MongoDB:', err));

const seedData = async () => {
  try {
    // Limpar dados existentes
    await Movie.deleteMany({});
    await Category.deleteMany({});
    console.log('🗑️ Dados existentes removidos');

    // Criar categorias
    const categories = await Category.insertMany([
      {
        name: 'Ação',
        description: 'Filmes de ação e aventura',
        color: '#E50914',
        sortOrder: 1
      },
      {
        name: 'Comédia',
        description: 'Filmes de comédia',
        color: '#FFD700',
        sortOrder: 2
      },
      {
        name: 'Drama',
        description: 'Filmes dramáticos',
        color: '#8B0000',
        sortOrder: 3
      },
      {
        name: 'Terror',
        description: 'Filmes de terror',
        color: '#000000',
        sortOrder: 4
      },
      {
        name: 'Ficção Científica',
        description: 'Filmes de ficção científica',
        color: '#00CED1',
        sortOrder: 5
      }
    ]);
    console.log('📁 Categorias criadas');

    // Criar filmes
    const movies = await Movie.insertMany([
      {
        title: 'Stranger Things',
        description: 'Um grupo de crianças em Hawkins, Indiana, enfrenta forças sobrenaturais e experimentos governamentais secretos.',
        thumbnail: 'https://via.placeholder.com/300x450/000000/FFFFFF?text=Stranger+Things',
        video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        duration: 50,
        year: 2016,
        rating: 8.7,
        genres: ['Drama', 'Ficção Científica', 'Terror'],
        category: categories[4]._id, // Ficção Científica
        ageRating: '14',
        isFeatured: true,
        isTrending: true,
        director: 'Matt Duffer',
        cast: [
          { name: 'Millie Bobby Brown', character: 'Eleven' },
          { name: 'Finn Wolfhard', character: 'Mike Wheeler' }
        ]
      },
      {
        title: 'The Crown',
        description: 'A história da rainha Elizabeth II e os eventos políticos que moldaram a segunda metade do século XX.',
        thumbnail: 'https://via.placeholder.com/300x450/000000/FFFFFF?text=The+Crown',
        video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        duration: 60,
        year: 2016,
        rating: 8.6,
        genres: ['Drama', 'História'],
        category: categories[2]._id, // Drama
        ageRating: '16',
        isFeatured: true,
        director: 'Peter Morgan',
        cast: [
          { name: 'Claire Foy', character: 'Rainha Elizabeth II' },
          { name: 'Matt Smith', character: 'Príncipe Philip' }
        ]
      },
      {
        title: 'Money Heist',
        description: 'Um criminoso conhecido como "O Professor" planeja o maior assalto da história para imprimir bilhões de euros.',
        thumbnail: 'https://via.placeholder.com/300x450/000000/FFFFFF?text=Money+Heist',
        video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        duration: 70,
        year: 2017,
        rating: 8.3,
        genres: ['Ação', 'Crime', 'Drama'],
        category: categories[0]._id, // Ação
        ageRating: '16',
        isTrending: true,
        director: 'Álex Pina',
        cast: [
          { name: 'Úrsula Corberó', character: 'Tokyo' },
          { name: 'Álvaro Morte', character: 'O Professor' }
        ]
      },
      {
        title: 'The Witcher',
        description: 'Geralt de Rivia, um caçador de monstros solitário, luta para encontrar seu lugar em um mundo onde as pessoas são mais perversas que as bestas.',
        thumbnail: 'https://via.placeholder.com/300x450/000000/FFFFFF?text=The+Witcher',
        video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        duration: 60,
        year: 2019,
        rating: 8.2,
        genres: ['Ação', 'Aventura', 'Drama'],
        category: categories[0]._id, // Ação
        ageRating: '16',
        isFeatured: true,
        director: 'Lauren Schmidt Hissrich',
        cast: [
          { name: 'Henry Cavill', character: 'Geralt de Rivia' },
          { name: 'Anya Chalotra', character: 'Yennefer' }
        ]
      },
      {
        title: 'Ozark',
        description: 'Um consultor financeiro arrasta sua família de Chicago para os Ozarks de Missouri, onde deve lavar dinheiro para apaziguar um cartel de drogas.',
        thumbnail: 'https://via.placeholder.com/300x450/000000/FFFFFF?text=Ozark',
        video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        duration: 60,
        year: 2017,
        rating: 8.1,
        genres: ['Crime', 'Drama', 'Thriller'],
        category: categories[2]._id, // Drama
        ageRating: '16',
        isTrending: true,
        director: 'Bill Dubuque',
        cast: [
          { name: 'Jason Bateman', character: 'Marty Byrde' },
          { name: 'Laura Linney', character: 'Wendy Byrde' }
        ]
      },
      {
        title: 'Bridgerton',
        description: 'A história dos oito irmãos Bridgerton enquanto buscam amor e felicidade na alta sociedade de Londres.',
        thumbnail: 'https://via.placeholder.com/300x450/000000/FFFFFF?text=Bridgerton',
        video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        duration: 60,
        year: 2020,
        rating: 7.3,
        genres: ['Drama', 'Romance'],
        category: categories[2]._id, // Drama
        ageRating: '14',
        isFeatured: true,
        director: 'Chris Van Dusen',
        cast: [
          { name: 'Phoebe Dynevor', character: 'Daphne Bridgerton' },
          { name: 'Regé-Jean Page', character: 'Simon Basset' }
        ]
      },
      {
        title: 'The Queen\'s Gambit',
        description: 'Uma jovem órfã se torna uma jogadora de xadrez de classe mundial enquanto luta contra vícios emocionais.',
        thumbnail: 'https://via.placeholder.com/300x450/000000/FFFFFF?text=The+Queens+Gambit',
        video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        duration: 60,
        year: 2020,
        rating: 8.5,
        genres: ['Drama'],
        category: categories[2]._id, // Drama
        ageRating: '14',
        isTrending: true,
        director: 'Scott Frank',
        cast: [
          { name: 'Anya Taylor-Joy', character: 'Beth Harmon' },
          { name: 'Thomas Brodie-Sangster', character: 'Benny Watts' }
        ]
      },
      {
        title: 'Squid Game',
        description: 'Centenas de jogadores endividados arriscam suas vidas em um misterioso jogo de sobrevivência com prêmio de 45,6 bilhões de won.',
        thumbnail: 'https://via.placeholder.com/300x450/000000/FFFFFF?text=Squid+Game',
        video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        duration: 60,
        year: 2021,
        rating: 8.0,
        genres: ['Drama', 'Thriller'],
        category: categories[2]._id, // Drama
        ageRating: '16',
        isFeatured: true,
        isTrending: true,
        director: 'Hwang Dong-hyuk',
        cast: [
          { name: 'Lee Jung-jae', character: 'Seong Gi-hun' },
          { name: 'Park Hae-soo', character: 'Cho Sang-woo' }
        ]
      }
    ]);
    console.log('🎬 Filmes criados');

    console.log('✅ Dados de exemplo inseridos com sucesso!');
    console.log(`📊 Criados: ${categories.length} categorias e ${movies.length} filmes`);
    
  } catch (error) {
    console.error('❌ Erro ao inserir dados:', error);
  } finally {
    mongoose.connection.close();
    console.log('🔌 Conexão com MongoDB fechada');
  }
};

seedData();
