const db = require('../db');

// Get all inventory items
const getAll = (req, res) => {
  db.query('SELECT * FROM inventory', (err, results) => {
    if (err) {
      console.error('Error fetching inventory:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
};

// Update quantity only (restocking or reducing)
const updateInventory = (req, res) => {
  const { Item_id, Quantity_in_stock } = req.body;

  if (!Item_id || Quantity_in_stock == null) {
    return res.status(400).json({ error: 'Missing Item_id or Quantity_in_stock' });
  }

  db.query(
    'UPDATE inventory SET Quantity_in_stock = ? WHERE Item_id = ?',
    [Quantity_in_stock, Item_id],
    (err, result) => {
      if (err) {
        console.error('Error updating quantity:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(200).json({ message: 'Inventory quantity updated successfully' });
    }
  );
};

// Delete an inventory item
const deleteInventoryItem = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM inventory WHERE Item_id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting item:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Inventory item deleted successfully' });
  });
};

// Update entire inventory item (admin-level update)
const updateInventoryItem = (req, res) => {
  const { id } = req.params;
  const {
    Item_name,
    Item_type,
    Quantity_in_stock,
    Unit,
    Unit_cost,
    Expiry_date,
    Supplier,
    Selling_price,
    Reorder_level
  } = req.body;

  if (!Item_name || !Item_type || Quantity_in_stock == null || !Unit || Unit_cost == null || !Expiry_date || !Reorder_level) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query = `
    UPDATE inventory
    SET
      Item_name = ?,
      Item_type = ?,
      Quantity_in_stock = ?,
      Unit = ?,
      Unit_cost = ?,
      Expiry_date = ?,
      Supplier = ?,
      Selling_price = ?,
      Reorder_level = ?
    WHERE Item_id = ?
  `;

  const values = [
    Item_name,
    Item_type,
    Quantity_in_stock,
    Unit,
    Unit_cost,
    Expiry_date,
    Supplier,
    Selling_price,
    Reorder_level,
    id
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error updating item:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({ message: 'Inventory item updated successfully' });
  });
};

module.exports = {
  getAll,
  updateInventory,
  deleteInventoryItem,
  updateInventoryItem
};
