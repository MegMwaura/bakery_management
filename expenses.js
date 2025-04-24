const express = require('express');
const router = express.Router();
const controller = require('../controllers/expensesController');
const { authenticate, adminOnly } = require('../middleware/authMiddleware');

// Staff can create expense
router.post('/', authenticate, controller.create);

// Admin can view all expenses
router.get('/', authenticate, adminOnly, controller.getAll);

module.exports = router;


