const express = require('express');
const router = express.Router();
const controller = require('../controllers/paymentsController');
const { authenticate, adminOnly } = require('../middleware/authMiddleware');

// Staff can record payment
router.post('/', authenticate, (req, res) => {
  const { Order_id, Amount_paid, Payment_method } = req.body;

  // Validate required fields
  if (!Order_id || !Amount_paid || !Payment_method) {
    return res.status(400).json({ error: 'Missing required fields: Order_id, Amount_paid, Payment_method' });
  }

  // Validate payment method (ensure it's one of the allowed methods)
  const validMethods = ['Cash', 'M-pesa'];
  if (!validMethods.includes(Payment_method)) {
    return res.status(400).json({ error: 'Invalid payment method. Only Cash and M-pesa are allowed.' });
  }

  // Call the controller to record the payment
  controller.recordPayment(req, res);
});

// Admin can view all payments or reports
router.get('/', authenticate, adminOnly, controller.getAll);

// Admin can view pending payments
router.get('/pending', authenticate, adminOnly, (req, res) => {
  db.query('SELECT * FROM payments WHERE Payment_status = "Unpaid"', (err, results) => {
    if (err) {
      console.error('Error fetching pending payments:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

module.exports = router;


