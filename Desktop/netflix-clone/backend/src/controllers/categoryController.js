const Category = require('../models/Category');
const { asyncHandler } = require('../middlewares/validation');

// @desc    Obter todas as categorias
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({ isActive: true })
    .sort({ sortOrder: 1, name: 1 });
  
  res.json(categories);
});

// @desc    Obter categoria por ID
// @route   GET /api/categories/:id
// @access  Public
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  
  if (!category) {
    return res.status(404).json({ message: 'Categoria não encontrada' });
  }
  
  res.json(category);
});

// @desc    Criar nova categoria
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
  const category = await Category.create(req.body);
  
  res.status(201).json(category);
});

// @desc    Atualizar categoria
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  
  if (!category) {
    return res.status(404).json({ message: 'Categoria não encontrada' });
  }
  
  res.json(category);
});

// @desc    Deletar categoria
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  
  if (!category) {
    return res.status(404).json({ message: 'Categoria não encontrada' });
  }
  
  res.json({ message: 'Categoria removida com sucesso' });
});

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};
