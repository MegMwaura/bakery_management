const db = require('../db');

// Admin view all payments
const getAll = (req, res) => {
  db.query('SELECT * FROM payments', (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
};

// Staff record payment
// Staff record payment
const recordPayment = (req, res) => {
  const { order_id, amount_paid, payment_method, payment_status, reference_no } = req.body;

  if (!order_id || !amount_paid || !payment_method) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const payment_date = new Date(); // current timestamp

  db.query(
    'INSERT INTO payments (Order_id, Payment_date, Amount_paid, Payment_method, Payment_status, Reference_no) VALUES (?, ?, ?, ?, ?, ?)',
    [order_id, payment_date, amount_paid, payment_method, payment_status || 'Unpaid', reference_no || null],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.status(201).json({ message: 'Payment recorded successfully', paymentId: result.insertId });
    }
  );
};


// Admin view pending payments
const getPendingPayments = (req, res) => {
  db.query('SELECT * FROM payments WHERE status = "pending"', (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
};

module.exports = { getAll, recordPayment, getPendingPayments };
