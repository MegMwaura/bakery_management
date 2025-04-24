const express = require('express');
const router = express.Router();
const controller = require('../controllers/wasteController');
const { authenticate, adminOnly } = require('../middleware/authMiddleware');

// Staff and Admin can record waste
router.post('/', authenticate, controller.recordWaste);

// Admins only can see waste reports
router.get('/', authenticate, adminOnly, controller.getAll);

module.exports = router;

