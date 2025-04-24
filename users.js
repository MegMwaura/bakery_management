const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');
const { authenticate, adminOnly } = require('../middleware/authMiddleware'); // Ensure role-based checks

// Only Admin can create a new user
router.post('/', authenticate, adminOnly, controller.createUser);

// Admin can view all users
router.get('/', authenticate, adminOnly, controller.getAllUsers);

module.exports = router;
