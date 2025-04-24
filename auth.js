const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); 
const controller = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');

// Only Admin can register users
router.post('/register', authenticate, (req, res) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ error: 'Forbidden - Admins only' });
  }

  const { username, password, fullName, role } = req.body;

  db.query('SELECT * FROM Users WHERE Username = ?', [username], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length > 0) return res.status(400).json({ error: 'Username already exists' });

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ error: 'Error hashing password' });

      db.query('INSERT INTO Users (Username, Password, Full_name, Role) VALUES (?, ?, ?, ?)',
        [username, hashedPassword, fullName, role],
        (err) => {
          if (err) return res.status(500).json({ error: 'Database error' });

          res.status(201).json({ message: 'User created successfully' });
        });
    });
  });
});

// Login and Profile
router.post('/login', controller.login);
router.get('/profile', authenticate, controller.getProfile);

module.exports = router;
