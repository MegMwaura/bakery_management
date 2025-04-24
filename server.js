const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const ordersRoutes = require('./routes/orders');
const reportsRoutes = require('./routes/reports');
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/inventory', require('./routes/inventory'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/customers', require('./routes/customers'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/expenses', require('./routes/expenses'));
app.use('/api/production', require('./routes/production'));
app.use('/api/waste', require('./routes/waste'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users')); 
app.use('/api/orders', ordersRoutes);
app.use('/api/reports', reportsRoutes);



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});