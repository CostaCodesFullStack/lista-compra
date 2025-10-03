const User = require('../models/User');
const Movie = require('../models/Movie');
const { asyncHandler } = require('../middlewares/validation');

// @desc    Obter watchlist do usuário
// @route   GET /api/watchlist
// @access  Private
const getWatchlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate({
      path: 'watchlist.movie',
      populate: {
        path: 'category',
        select: 'name color'
      }
    })
    .select('watchlist');

  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  // Ordenar por data de adição (mais recentes primeiro)
  const sortedWatchlist = user.watchlist.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));

  res.json({
    watchlist: sortedWatchlist,
    total: sortedWatchlist.length
  });
});

// @desc    Adicionar filme à watchlist
// @route   POST /api/watchlist/:movieId
// @access  Private
const addToWatchlist = asyncHandler(async (req, res) => {
  const { movieId } = req.params;
  const userId = req.user._id;

  // Verificar se o filme existe
  const movie = await Movie.findById(movieId);
  if (!movie) {
    return res.status(404).json({ message: 'Filme não encontrado' });
  }

  // Verificar se o usuário existe
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  // Verificar se o filme já está na watchlist
  if (user.isInWatchlist(movieId)) {
    return res.status(400).json({ message: 'Filme já está na sua lista para assistir' });
  }

  // Adicionar à watchlist
  await user.addToWatchlist(movieId);

  res.json({ 
    message: 'Filme adicionado à sua lista para assistir',
    movie: {
      _id: movie._id,
      title: movie.title,
      thumbnail: movie.thumbnail
    }
  });
});

// @desc    Remover filme da watchlist
// @route   DELETE /api/watchlist/:movieId
// @access  Private
const removeFromWatchlist = asyncHandler(async (req, res) => {
  const { movieId } = req.params;
  const userId = req.user._id;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  // Verificar se o filme está na watchlist
  if (!user.isInWatchlist(movieId)) {
    return res.status(400).json({ message: 'Filme não está na sua lista para assistir' });
  }

  // Remover da watchlist
  await user.removeFromWatchlist(movieId);

  res.json({ message: 'Filme removido da sua lista para assistir' });
});

// @desc    Verificar se filme está na watchlist
// @route   GET /api/watchlist/:movieId/status
// @access  Private
const checkWatchlistStatus = asyncHandler(async (req, res) => {
  const { movieId } = req.params;
  const userId = req.user._id;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  const isInWatchlist = user.isInWatchlist(movieId);

  res.json({ 
    isInWatchlist,
    movieId 
  });
});

// @desc    Mover filme da watchlist para histórico (marcar como assistido)
// @route   POST /api/watchlist/:movieId/watched
// @access  Private
const markAsWatched = asyncHandler(async (req, res) => {
  const { movieId } = req.params;
  const { progress = 100 } = req.body; // Progresso padrão de 100% (assistido completamente)
  const userId = req.user._id;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  // Verificar se o filme está na watchlist
  if (!user.isInWatchlist(movieId)) {
    return res.status(400).json({ message: 'Filme não está na sua lista para assistir' });
  }

  // Remover da watchlist e adicionar ao histórico
  await user.removeFromWatchlist(movieId);
  await user.addToWatchHistory(movieId, progress);

  res.json({ 
    message: 'Filme marcado como assistido',
    progress 
  });
});

// @desc    Obter estatísticas da watchlist
// @route   GET /api/watchlist/stats
// @access  Private
const getWatchlistStats = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId)
    .populate('watchlist.movie', 'genres year')
    .populate('watchHistory.movie', 'genres year');

  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  // Estatísticas básicas
  const totalWatchlist = user.watchlist.length;
  const totalWatched = user.watchHistory.length;

  // Análise de gêneros na watchlist
  const genreCount = {};
  user.watchlist.forEach(item => {
    if (item.movie && item.movie.genres) {
      item.movie.genres.forEach(genre => {
        genreCount[genre] = (genreCount[genre] || 0) + 1;
      });
    }
  });

  // Gênero mais comum na watchlist
  const mostCommonGenre = Object.keys(genreCount).reduce((a, b) => 
    genreCount[a] > genreCount[b] ? a : b, null
  );

  // Análise por ano
  const yearCount = {};
  user.watchlist.forEach(item => {
    if (item.movie && item.movie.year) {
      yearCount[item.movie.year] = (yearCount[item.movie.year] || 0) + 1;
    }
  });

  res.json({
    totalWatchlist,
    totalWatched,
    genreAnalysis: {
      mostCommonGenre,
      genreCount
    },
    yearAnalysis: yearCount
  });
});

module.exports = {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  checkWatchlistStatus,
  markAsWatched,
  getWatchlistStats
};
