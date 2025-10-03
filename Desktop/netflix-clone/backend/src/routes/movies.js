const express = require('express');
const { body } = require('express-validator');
const { 
  getMovies, 
  getMovieById, 
  createMovie, 
  updateMovie, 
  deleteMovie, 
  rateMovie,
  getRecommendedMovies 
} = require('../controllers/movieController');
const { auth, adminAuth, subscriptionAuth } = require('../middlewares/auth');
const { validateResults } = require('../middlewares/validation');

const router = express.Router();

// Validações
const movieValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Título é obrigatório')
    .isLength({ max: 100 })
    .withMessage('Título não pode ter mais de 100 caracteres'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Descrição é obrigatória')
    .isLength({ max: 1000 })
    .withMessage('Descrição não pode ter mais de 1000 caracteres'),
  body('thumbnail')
    .notEmpty()
    .withMessage('Thumbnail é obrigatória'),
  body('video')
    .notEmpty()
    .withMessage('Vídeo é obrigatório'),
  body('duration')
    .isInt({ min: 1 })
    .withMessage('Duração deve ser um número positivo'),
  body('year')
    .isInt({ min: 1900, max: new Date().getFullYear() + 2 })
    .withMessage('Ano inválido'),
  body('genres')
    .isArray({ min: 1 })
    .withMessage('Pelo menos um gênero é obrigatório'),
  body('category')
    .notEmpty()
    .withMessage('Categoria é obrigatória'),
  body('director')
    .trim()
    .notEmpty()
    .withMessage('Diretor é obrigatório')
];

const rateValidation = [
  body('rating')
    .isInt({ min: -1, max: 1 })
    .withMessage('Rating deve ser 1 (like), 0 (neutro) ou -1 (dislike)')
];

// Rotas públicas
router.get('/', getMovies);
router.get('/recommended', auth, getRecommendedMovies);
router.get('/:id', getMovieById);

// Rotas protegidas
router.post('/:id/rate', auth, rateValidation, validateResults, rateMovie);

// Rotas de administração
router.post('/', auth, adminAuth, movieValidation, validateResults, createMovie);
router.put('/:id', auth, adminAuth, movieValidation, validateResults, updateMovie);
router.delete('/:id', auth, adminAuth, deleteMovie);

module.exports = router;
