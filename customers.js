const express = require('express');
const router = express.Router();
const controller = require('../controllers/customersController');
const { authenticate, adminOnly } = require('../middleware/authMiddleware');

// Staff and Admin can view and create customers
router.get('/', authenticate, controller.getAll);
router.post('/', authenticate, controller.create);

// Only Admin can delete customers
router.delete('/:id', authenticate, adminOnly, controller.deleteCustomer);

module.exports = router;


