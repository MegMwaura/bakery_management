// js/app.js
const API_BASE = 'http://localhost:5000/api';
const token = localStorage.getItem('token'); // Assumes token was saved after login

// Headers for authenticated requests
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
};

// Fetch Total Orders
fetch(`${API_BASE}/orders`, { headers })
  .then(res => res.json())
  .then(data => {
    document.getElementById('totalOrders').textContent = data.length;
  });

// Fetch Pending Orders
fetch(`${API_BASE}/orders/pending`, { headers })
  .then(res => res.json())
  .then(data => {
    document.getElementById('pendingOrders').textContent = `${data.length} Pending Orders`;
  });

// Fetch Inventory
fetch(`${API_BASE}/inventory`, { headers })
  .then(res => res.json())
  .then(items => {
    const products = items.filter(i => i.Item_type === 'Product');
    const totalStock = products.reduce((sum, item) => sum + item.Quantity_in_stock, 0);
    const lowStock = products.filter(i => i.Quantity_in_stock < i.Reorder_level);

    document.getElementById('stockCount').textContent = totalStock;
    document.getElementById('lowStock').textContent = `${lowStock.length} Low Stock Items`;
  });

// Fetch Revenue
fetch(`${API_BASE}/reports/revenue`, { headers })
  .then(res => res.json())
  .then(data => {
    const total = parseFloat(data.totalRevenue || 0).toLocaleString('en-KE', { style: 'currency', currency: 'KES' });
    document.getElementById('totalRevenue').textContent = total;
  });