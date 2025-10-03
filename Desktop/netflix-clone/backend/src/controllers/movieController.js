const Movie = require('../models/Movie');
const Category = require('../models/Category');
const { asyncHandler } = require('../middlewares/validation');

// @desc    Obter todos os filmes
// @route   GET /api/movies
// @access  Public
const getMovies = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  
  const { category, genre, year, search, featured, trending } = req.query;
  
  // Construir filtros
  let filters = {};
  
  if (category) {
    const categoryDoc = await Category.findOne({ name: category });
    if (categoryDoc) {
      filters.category = categoryDoc._id;
    }
  }
  
  if (genre) {
    filters.genres = { $in: [genre] };
  }
  
  if (year) {
    filters.year = parseInt(year);
  }
  
  if (search) {
    filters.$text = { $search: search };
  }
  
  if (featured === 'true') {
    filters.isFeatured = true;
  }
  
  if (trending === 'true') {
    filters.isTrending = true;
  }
  
  const movies = await Movie.find(filters)
    .populate('category', 'name color')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  
  const total = await Movie.countDocuments(filters);
  
  res.json({
    movies,
    pagination: {
      current: page,
      pages: Math.ceil(total / limit),
      total
    }
  });
});

// @desc    Obter filme por ID
// @route   GET /api/movies/:id
// @access  Public
const getMovieById = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id)
    .populate('category', 'name color');
  
  if (!movie) {
    return res.status(404).json({ message: 'Filme não encontrado' });
  }
  
  // Incrementar visualizações
  await movie.incrementViews();
  
  res.json(movie);
});

// @desc    Criar novo filme
// @route   POST /api/movies
// @access  Private/Admin
const createMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.create(req.body);
  
  res.status(201).json(movie);
});

// @desc    Atualizar filme
// @route   PUT /api/movies/:id
// @access  Private/Admin
const updateMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  
  if (!movie) {
    return res.status(404).json({ message: 'Filme não encontrado' });
  }
  
  res.json(movie);
});

// @desc    Deletar filme
// @route   DELETE /api/movies/:id
// @access  Private/Admin
const deleteMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  
  if (!movie) {
    return res.status(404).json({ message: 'Filme não encontrado' });
  }
  
  res.json({ message: 'Filme removido com sucesso' });
});

// @desc    Avaliar filme
// @route   POST /api/movies/:id/rate
// @access  Private
const rateMovie = asyncHandler(async (req, res) => {
  const { rating } = req.body; // 1 para like, -1 para dislike
  
  const movie = await Movie.findById(req.params.id);
  
  if (!movie) {
    return res.status(404).json({ message: 'Filme não encontrado' });
  }
  
  await movie.rateMovie(rating);
  
  res.json({ message: 'Avaliação registrada com sucesso' });
});

// @desc    Obter filmes recomendados
// @route   GET /api/movies/recommended
// @access  Private
const getRecommendedMovies = asyncHandler(async (req, res) => {
  const user = req.user;
  
  // Buscar filmes baseados no histórico do usuário
  const watchedGenres = [];
  user.watchHistory.forEach(history => {
    if (history.movie && history.movie.genres) {
      watchedGenres.push(...history.movie.genres);
    }
  });
  
  // Filmes recomendados baseados nos gêneros assistidos
  const recommendedMovies = await Movie.find({
    genres: { $in: watchedGenres },
    _id: { $nin: user.watchHistory.map(h => h.movie) }
  })
  .populate('category', 'name color')
  .limit(10)
  .sort({ rating: -1 });
  
  res.json(recommendedMovies);
});

module.exports = {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  rateMovie,
  getRecommendedMovies
};
