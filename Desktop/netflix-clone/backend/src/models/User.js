const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true,
    maxlength: [50, 'Nome não pode ter mais de 50 caracteres']
  },
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido']
  },
  password: {
    type: String,
    required: [true, 'Senha é obrigatória'],
    minlength: [6, 'Senha deve ter pelo menos 6 caracteres']
  },
  avatar: {
    type: String,
    default: ''
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  favoriteMovies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie'
  }],
  watchlist: [{
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie'
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  watchHistory: [{
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie'
    },
    watchedAt: {
      type: Date,
      default: Date.now
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    }
  }],
  subscription: {
    type: {
      type: String,
      enum: ['basic', 'premium', 'ultra'],
      default: 'basic'
    },
    startDate: {
      type: Date,
      default: Date.now
    },
    endDate: {
      type: Date,
      default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 dias
    }
  }
}, {
  timestamps: true
});

// Hash da senha antes de salvar
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar senhas
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Método para adicionar filme aos favoritos
userSchema.methods.addToFavorites = function(movieId) {
  if (!this.favoriteMovies.includes(movieId)) {
    this.favoriteMovies.push(movieId);
    return this.save();
  }
  return Promise.resolve(this);
};

// Método para remover filme dos favoritos
userSchema.methods.removeFromFavorites = function(movieId) {
  this.favoriteMovies = this.favoriteMovies.filter(id => !id.equals(movieId));
  return this.save();
};

// Método para adicionar filme à watchlist
userSchema.methods.addToWatchlist = function(movieId) {
  const existingItem = this.watchlist.find(item => item.movie.equals(movieId));
  if (!existingItem) {
    this.watchlist.push({ movie: movieId });
    return this.save();
  }
  return Promise.resolve(this);
};

// Método para remover filme da watchlist
userSchema.methods.removeFromWatchlist = function(movieId) {
  this.watchlist = this.watchlist.filter(item => !item.movie.equals(movieId));
  return this.save();
};

// Método para verificar se filme está na watchlist
userSchema.methods.isInWatchlist = function(movieId) {
  return this.watchlist.some(item => item.movie.equals(movieId));
};

// Método para adicionar filme ao histórico de visualização
userSchema.methods.addToWatchHistory = function(movieId, progress = 0) {
  const existingHistory = this.watchHistory.find(h => h.movie.equals(movieId));
  
  if (existingHistory) {
    existingHistory.watchedAt = new Date();
    existingHistory.progress = progress;
  } else {
    this.watchHistory.push({ movie: movieId, progress });
  }
  
  return this.save();
};

module.exports = mongoose.model('User', userSchema);
