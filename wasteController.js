const db = require('../db');

// Admin view all waste
const getAll = (req, res) => {
  db.query('SELECT * FROM waste_log', (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
};

// Staff record waste
const recordWaste = (req, res) => {
  const { product_name, quantity, waste_type, waste_reason, item_id } = req.body;

  // Ensure all required fields are provided
  if (!product_name || !quantity || !waste_type || !waste_reason) {
    return res.status(400).json({ error: 'Missing required fields: product_name, quantity, waste_type, or waste_reason' });
  }

  // Set waste_date as current date if not provided
  const waste_date = req.body.waste_date || new Date().toISOString().split('T')[0];

  db.query(
    'INSERT INTO waste_log (Product_name, Quantity, Waste_type, Waste_date, Waste_reason, Item_id) VALUES (?, ?, ?, ?, ?, ?)',
    [product_name, quantity, waste_type, waste_date, waste_reason, item_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.status(201).json({ message: 'Waste recorded successfully', wasteId: result.insertId });
    }
  );
};

module.exports = { getAll, recordWaste };

