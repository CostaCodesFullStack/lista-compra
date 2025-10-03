const express = require('express');
const { body } = require('express-validator');
const { 
  getCategories, 
  getCategoryById, 
  createCategory, 
  updateCategory, 
  deleteCategory 
} = require('../controllers/categoryController');
const { auth, adminAuth } = require('../middlewares/auth');
const { validateResults } = require('../middlewares/validation');

const router = express.Router();

// Validações
const categoryValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Nome da categoria é obrigatório')
    .isLength({ max: 50 })
    .withMessage('Nome da categoria não pode ter mais de 50 caracteres'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Descrição não pode ter mais de 200 caracteres'),
  body('color')
    .optional()
    .matches(/^#[0-9A-F]{6}$/i)
    .withMessage('Cor deve estar no formato hexadecimal (#RRGGBB)')
];

// Rotas públicas
router.get('/', getCategories);
router.get('/:id', getCategoryById);

// Rotas de administração
router.post('/', auth, adminAuth, categoryValidation, validateResults, createCategory);
router.put('/:id', auth, adminAuth, categoryValidation, validateResults, updateCategory);
router.delete('/:id', auth, adminAuth, deleteCategory);

module.exports = router;
