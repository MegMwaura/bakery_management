const db = require('../db');

// Admin: View all orders
const getAll = (req, res) => {
  db.query('SELECT * FROM orders', (err, results) => {
    if (err) {
      console.error('Error fetching orders:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
};

// Staff/Admin: Create new order
const createOrder = (req, res) => {
  const { customer_id, total_amount, payment_method, order_status = 'Pending' } = req.body;

  if (!customer_id || total_amount == null || !payment_method) {
    return res.status(400).json({ error: 'Missing required fields: customer_id, total_amount, or payment_method' });
  }

  db.query(
    'INSERT INTO orders (Customer_id, Total_amount, Payment_method, Order_status) VALUES (?, ?, ?, ?)',
    [customer_id, total_amount, payment_method, order_status],
    (err, result) => {
      if (err) {
        console.error('Error creating order:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'Order created successfully', orderId: result.insertId });
    }
  );
};


// Admin: View a specific order
const getOrderById = (req, res) => {
  const { id } = req.params;

  db.query('SELECT * FROM orders WHERE Order_id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error fetching order by ID:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(results[0]);
  });
};

module.exports = {
  getAll,
  createOrder,
  getOrderById
};
