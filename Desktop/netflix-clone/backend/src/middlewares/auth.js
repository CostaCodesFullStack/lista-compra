const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware para verificar token JWT
const auth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Formato de token inválido' });
    }

    const token = authHeader.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'netflix-clone-secret-key-2024-production');
    
    if (!decoded.id) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Erro na autenticação:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token inválido' });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado' });
    }
    
    res.status(401).json({ message: 'Erro de autenticação' });
  }
};

// Middleware para verificar se é admin
const adminAuth = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Acesso negado. Apenas administradores.' });
    }
    next();
  } catch (error) {
    console.error('Erro na autorização:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// Middleware para verificar assinatura ativa
const subscriptionAuth = async (req, res, next) => {
  try {
    const user = req.user;
    const now = new Date();
    
    if (user.subscription.endDate < now) {
      return res.status(403).json({ 
        message: 'Assinatura expirada. Renove sua assinatura para continuar assistindo.' 
      });
    }
    
    next();
  } catch (error) {
    console.error('Erro na verificação de assinatura:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

module.exports = {
  auth,
  adminAuth,
  subscriptionAuth
};
