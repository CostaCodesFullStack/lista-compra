const express = require('express');
const { body } = require('express-validator');
const { 
  getUsers, 
  getUserById, 
  updateUser, 
  deleteUser,
  addToFavorites,
  removeFromFavorites,
  getFavorites,
  addToWatchHistory,
  getWatchHistory
} = require('../controllers/userController');
const { auth, adminAuth } = require('../middlewares/auth');
const { validateResults } = require('../middlewares/validation');

const router = express.Router();

// Validações
const updateUserValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Nome deve ter entre 2 e 50 caracteres'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Email inválido')
    .normalizeEmail(),
  body('isAdmin')
    .optional()
    .isBoolean()
    .withMessage('isAdmin deve ser um booleano'),
  body('subscription.type')
    .optional()
    .isIn(['basic', 'premium', 'ultra'])
    .withMessage('Tipo de assinatura inválido')
];

const watchHistoryValidation = [
  body('movieId')
    .isMongoId()
    .withMessage('ID do filme inválido'),
  body('progress')
    .isInt({ min: 0, max: 100 })
    .withMessage('Progresso deve ser entre 0 e 100')
];

// Rotas de administração
router.get('/', auth, adminAuth, getUsers);
router.get('/:id', auth, adminAuth, getUserById);
router.put('/:id', auth, adminAuth, updateUserValidation, validateResults, updateUser);
router.delete('/:id', auth, adminAuth, deleteUser);

// Rotas de usuário
router.post('/favorites/:movieId', auth, addToFavorites);
router.delete('/favorites/:movieId', auth, removeFromFavorites);
router.get('/favorites', auth, getFavorites);
router.post('/watch-history', auth, watchHistoryValidation, validateResults, addToWatchHistory);
router.get('/watch-history', auth, getWatchHistory);

module.exports = router;
