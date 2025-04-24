const jwt = require('jsonwebtoken');
require('dotenv').config();

// Checks if the token is present and valid
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized - token missing' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token invalid or expired' });
  }
};

// Checks if the user role is Admin
const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== 'Admin') {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }
  next();
};

// Export both middleware functions
module.exports = {
  authenticate,
  adminOnly
};






