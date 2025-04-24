const express = require('express');
const router = express.Router();
const controller = require('../controllers/productionController');
const { authenticate, adminOnly } = require('../middleware/authMiddleware');

// Admin can view all production
router.get('/', authenticate, adminOnly, controller.getAll);

// Staff can log production
router.post('/', authenticate, (req, res) => {
  const { Product_name, Quantity, Production_date, Produced_by, Batch_no, Ingredients_used, Notes } = req.body;

  // Validate required fields
  if (!Product_name || !Quantity || !Production_date || !Produced_by || !Batch_no) {
    return res.status(400).json({ error: 'Missing required fields: Product_name, Quantity, Production_date, Produced_by, Batch_no' });
  }

  // Optionally, validate the Quantity to be a positive integer
  if (Quantity <= 0) {
    return res.status(400).json({ error: 'Quantity must be a positive integer' });
  }

  // Optionally, validate the Production_date format if needed

  // Call the controller to log the production
  controller.logProduction(req, res);
});

// Admin can delete production
router.delete('/:id', authenticate, adminOnly, controller.deleteProductionItem);

module.exports = router;


