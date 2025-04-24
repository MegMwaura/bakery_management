const db = require('../db');

// Admin view all production logs
const getAll = (req, res) => {
  db.query('SELECT * FROM production_log', (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
};

// Staff log production
const logProduction = (req, res) => {
  const { product_name, quantity, produced_by, batch_no, ingredients_used, notes } = req.body;

  if (!product_name || !quantity || !produced_by || !batch_no) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const production_date = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

  db.query(
    'INSERT INTO production_log (Product_name, Quantity, Production_date, Produced_by, Batch_no, Ingredients_used, Notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [product_name, quantity, production_date, produced_by, batch_no, ingredients_used, notes],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.status(201).json({ message: 'Production logged successfully', productionId: result.insertId });
    }
  );
};

// Admin delete production log
const deleteProductionItem = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM production_log WHERE Production_id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Production item not found' });
    }

    res.json({ message: 'Production item deleted successfully' });
  });
};

module.exports = { getAll, logProduction, deleteProductionItem };
