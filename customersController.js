const db = require('../db');

// View all customers
const getAll = (req, res) => {
  db.query('SELECT * FROM customers', (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
};

// Create new customer
const create = (req, res) => {
  const { name, phone, email, address } = req.body;  // Make sure the data is received from the client
  if (!name || !phone || !email || !address) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  db.query(
    'INSERT INTO customers (Customer_name, Phone_number, Email, Address) VALUES (?, ?, ?, ?)',
    [name, phone, email, address],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.status(201).json({ message: 'Customer created successfully', customerId: result.insertId });
    }
  );
};

// Delete a customer (Admin only)
const deleteCustomer = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM customers WHERE Customer_id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Customer not found' });
    res.json({ message: 'Customer deleted successfully' });
  });
};

module.exports = { getAll, create, deleteCustomer };

