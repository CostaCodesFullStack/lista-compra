const User = require('../models/User');
const Movie = require('../models/Movie');
const { asyncHandler } = require('../middlewares/validation');

// @desc    Obter todos os usuários
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  
  const users = await User.find({})
    .select('-password')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  
  const total = await User.countDocuments();
  
  res.json({
    users,
    pagination: {
      current: page,
      pages: Math.ceil(total / limit),
      total
    }
  });
});

// @desc    Obter usuário por ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  
  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }
  
  res.json(user);
});

// @desc    Atualizar usuário
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  ).select('-password');
  
  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }
  
  res.json(user);
});

// @desc    Deletar usuário
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  
  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }
  
  res.json({ message: 'Usuário removido com sucesso' });
});

// @desc    Adicionar filme aos favoritos
// @route   POST /api/users/favorites/:movieId
// @access  Private
const addToFavorites = asyncHandler(async (req, res) => {
  const user = req.user;
  const movieId = req.params.movieId;
  
  // Verificar se o filme existe
  const movie = await Movie.findById(movieId);
  if (!movie) {
    return res.status(404).json({ message: 'Filme não encontrado' });
  }
  
  await user.addToFavorites(movieId);
  
  res.json({ message: 'Filme adicionado aos favoritos' });
});

// @desc    Remover filme dos favoritos
// @route   DELETE /api/users/favorites/:movieId
// @access  Private
const removeFromFavorites = asyncHandler(async (req, res) => {
  const user = req.user;
  const movieId = req.params.movieId;
  
  await user.removeFromFavorites(movieId);
  
  res.json({ message: 'Filme removido dos favoritos' });
});

// @desc    Obter filmes favoritos
// @route   GET /api/users/favorites
// @access  Private
const getFavorites = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate('favoriteMovies')
    .select('favoriteMovies');
  
  res.json(user.favoriteMovies);
});

// @desc    Adicionar ao histórico de visualização
// @route   POST /api/users/watch-history
// @access  Private
const addToWatchHistory = asyncHandler(async (req, res) => {
  const { movieId, progress } = req.body;
  
  const user = req.user;
  
  // Verificar se o filme existe
  const movie = await Movie.findById(movieId);
  if (!movie) {
    return res.status(404).json({ message: 'Filme não encontrado' });
  }
  
  // Verificar se já existe no histórico
  const existingHistory = user.watchHistory.find(
    h => h.movie.toString() === movieId
  );
  
  if (existingHistory) {
    // Atualizar progresso
    existingHistory.progress = progress;
    existingHistory.watchedAt = new Date();
  } else {
    // Adicionar novo ao histórico
    user.watchHistory.push({
      movie: movieId,
      progress,
      watchedAt: new Date()
    });
  }
  
  await user.save();
  
  res.json({ message: 'Histórico atualizado' });
});

// @desc    Obter histórico de visualização
// @route   GET /api/users/watch-history
// @access  Private
const getWatchHistory = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate('watchHistory.movie')
    .select('watchHistory');
  
  res.json(user.watchHistory);
});

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  addToFavorites,
  removeFromFavorites,
  getFavorites,
  addToWatchHistory,
  getWatchHistory
};
