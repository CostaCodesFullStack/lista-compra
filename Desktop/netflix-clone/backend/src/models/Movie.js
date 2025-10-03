const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Título é obrigatório'],
    trim: true,
    maxlength: [100, 'Título não pode ter mais de 100 caracteres']
  },
  description: {
    type: String,
    required: [true, 'Descrição é obrigatória'],
    maxlength: [1000, 'Descrição não pode ter mais de 1000 caracteres']
  },
  thumbnail: {
    type: String,
    required: [true, 'Thumbnail é obrigatória']
  },
  trailer: {
    type: String,
    default: ''
  },
  video: {
    type: String,
    required: [true, 'Vídeo é obrigatório']
  },
  duration: {
    type: Number, // em minutos
    required: [true, 'Duração é obrigatória']
  },
  year: {
    type: Number,
    required: [true, 'Ano é obrigatório'],
    min: [1900, 'Ano deve ser maior que 1900'],
    max: [new Date().getFullYear() + 2, 'Ano não pode ser muito futuro']
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 10
  },
  genres: [{
    type: String,
    required: true
  }],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  ageRating: {
    type: String,
    enum: ['L', '10', '12', '14', '16', '18'],
    default: 'L'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isTrending: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  },
  cast: [{
    name: String,
    character: String,
    image: String
  }],
  director: {
    type: String,
    required: true
  },
  country: {
    type: String,
    default: 'Brasil'
  },
  language: {
    type: String,
    default: 'Português'
  },
  subtitles: [{
    type: String
  }],
  audioLanguages: [{
    type: String
  }]
}, {
  timestamps: true
});

// Índices para busca
movieSchema.index({ title: 'text', description: 'text' });
movieSchema.index({ genres: 1 });
movieSchema.index({ year: 1 });
movieSchema.index({ rating: -1 });
movieSchema.index({ views: -1 });

// Método para incrementar visualizações
movieSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Método para avaliar filme
movieSchema.methods.rateMovie = function(rating) {
  const totalRatings = this.likes + this.dislikes;
  const currentRating = this.rating * totalRatings;
  
  if (rating > 0) {
    this.likes += 1;
  } else {
    this.dislikes += 1;
  }
  
  const newTotalRatings = this.likes + this.dislikes;
  this.rating = newTotalRatings > 0 ? (currentRating + rating) / newTotalRatings : 0;
  
  return this.save();
};

module.exports = mongoose.model('Movie', movieSchema);
