const express = require('express');
const router = express.Router();
const controller = require('../controllers/ordersController');
const { authenticate, adminOnly } = require('../middleware/authMiddleware');

// Staff can create orders
router.post('/', authenticate, controller.createOrder);

// Admin can view all orders
router.get('/', authenticate, adminOnly, controller.getAll);

// Admin can view order by ID
router.get('/:id', authenticate, adminOnly, controller.getOrderById);

//Get pending orders
router.get('/pending', (req, res) => {
    db.query("SELECT * FROM orders WHERE Status = 'Pending'", (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json(results);
    });
  });

// Get all orders
router.get('/', (req, res) => {
    db.query('SELECT * FROM orders', (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json(results);
    });
  });
module.exports = router;

