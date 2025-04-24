const db = require('../db');

// Admin view monthly report
const monthlyReport = (req, res) => {
  // Correct column name for Order_date
  db.query('SELECT SUM(Total_amount) as total_sales FROM orders WHERE MONTH(Order_date) = MONTH(CURRENT_DATE())', (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results[0]);
  });
};

// Admin view top products (fixed to use `production_log` table)
const topProducts = (req, res) => {
  db.query('SELECT Product_name, SUM(Quantity) as total_quantity FROM production_log GROUP BY Product_name ORDER BY total_quantity DESC LIMIT 5', (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
};

// Admin view profit breakdown (fixed to correctly sum payments and expenses)
const profitBreakdown = (req, res) => {
  db.query('SELECT (SUM(payments.Amount_paid) - SUM(expenses.Amount)) as profit FROM payments, expenses', (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results[0]);
  });
};

module.exports = { monthlyReport, topProducts, profitBreakdown };

