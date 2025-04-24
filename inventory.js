const express = require('express');
const router = express.Router();
const controller = require('../controllers/inventoryController');
const { authenticate, adminOnly } = require('../middleware/authMiddleware');

// Staff and Admin can view inventory
router.get('/', authenticate, controller.getAll);

// Staff and Admin can update inventory (e.g., restocking, consuming)
router.post('/', authenticate, controller.updateInventory);

// Only Admins can delete or modify inventory
router.delete('/:id', authenticate, adminOnly, controller.deleteInventoryItem);
router.put('/:id', authenticate, adminOnly, controller.updateInventoryItem);

module.exports = router;




