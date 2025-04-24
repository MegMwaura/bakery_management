const db = require('../db');

// Admin: View all expenses
const getAll = (req, res) => {
  db.query('SELECT * FROM expenses', (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
};

// Staff/Admin: Create a new expense
const create = (req, res) => {
  const { amount, category, expense_date, payment_method, description } = req.body;

  // Validate required fields
  if (!amount || !category || !expense_date || !payment_method) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query = `
    INSERT INTO expenses 
    (Amount, Category, Expense_date, Payment_method, Expense_description) 
    VALUES (?, ?, ?, ?, ?)
  `;

  const values = [amount, category, expense_date, payment_method, description];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting expense:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.status(201).json({ message: 'Expense recorded successfully', expenseId: result.insertId });
  });
};

module.exports = { getAll, create };
