const db = require('../db'); // this connects the database
const express = require('express');
const router = express.Router();
const controller = require('../controllers/reportsController');
const { authenticate, adminOnly } = require('../middleware/authMiddleware');

// Admin only can view reports
router.get('/monthly', authenticate, adminOnly, controller.monthlyReport);
router.get('/top-products', authenticate, adminOnly, controller.topProducts);
router.get('/profit', authenticate, adminOnly, controller.profitBreakdown);

//  Get total revenue
  router.get('/revenue', (req, res) => {
    const sql = 'SELECT SUM(Amount_paid) AS totalRevenue FROM payments';
    db.query(sql, (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error', details: err });
      res.json(results[0]);
    });
  });
module.exports = router;


