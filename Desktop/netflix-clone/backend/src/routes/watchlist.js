const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  checkWatchlistStatus,
  markAsWatched,
  getWatchlistStats
} = require('../controllers/watchlistController');

// Todas as rotas requerem autenticação
router.use(auth);

// @route   GET /api/watchlist
// @desc    Obter watchlist do usuário
// @access  Private
router.get('/', getWatchlist);

// @route   POST /api/watchlist/:movieId
// @desc    Adicionar filme à watchlist
// @access  Private
router.post('/:movieId', addToWatchlist);

// @route   DELETE /api/watchlist/:movieId
// @desc    Remover filme da watchlist
// @access  Private
router.delete('/:movieId', removeFromWatchlist);

// @route   GET /api/watchlist/:movieId/status
// @desc    Verificar se filme está na watchlist
// @access  Private
router.get('/:movieId/status', checkWatchlistStatus);

// @route   POST /api/watchlist/:movieId/watched
// @desc    Marcar filme como assistido (mover da watchlist para histórico)
// @access  Private
router.post('/:movieId/watched', markAsWatched);

// @route   GET /api/watchlist/stats
// @desc    Obter estatísticas da watchlist
// @access  Private
router.get('/stats', getWatchlistStats);

module.exports = router;
