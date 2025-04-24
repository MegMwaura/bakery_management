const db = require('../db');
const bcrypt = require('bcryptjs');

// Create a new user (Admin only)
const createUser = (req, res) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ error: 'Access denied, Admins only' });
  }

  const { username, password, fullName, role } = req.body;

  // Validate input
  if (!username || !password || !fullName || !role) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Hash the password before saving
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: 'Error hashing password' });
    }

    const query = 'INSERT INTO Users (Username, Password, Full_name, Role) VALUES (?, ?, ?, ?)';
    db.query(query, [username, hashedPassword, fullName, role], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Error creating user' });
      }
      res.status(201).json({ message: 'User created successfully' });
    });
  });
};

// Get all users (Admin only)
const getAllUsers = (req, res) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ error: 'Access denied, Admins only' });
  }

  const query = 'SELECT User_id, Full_name, Username, Role FROM Users';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching users' });
    }
    res.json(results);
  });
};

module.exports = { createUser, getAllUsers };
