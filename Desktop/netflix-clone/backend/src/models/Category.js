const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome da categoria é obrigatório'],
    unique: true,
    trim: true,
    maxlength: [50, 'Nome da categoria não pode ter mais de 50 caracteres']
  },
  description: {
    type: String,
    maxlength: [200, 'Descrição não pode ter mais de 200 caracteres']
  },
  image: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: '#E50914' // Cor padrão Netflix
  },
  isActive: {
    type: Boolean,
    default: true
  },
  sortOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Índice para ordenação
categorySchema.index({ sortOrder: 1, name: 1 });

module.exports = mongoose.model('Category', categorySchema);
