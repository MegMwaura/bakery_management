const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db');



// Login
const login = (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM Users WHERE Username = ?', [username], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(400).json({ error: 'Invalid username or password' });

    const user = results[0];
    bcrypt.compare(password, user.Password, (err, isMatch) => {
      if (err) return res.status(500).json({ error: 'Error checking password' });
      if (!isMatch) return res.status(400).json({ error: 'Invalid username or password' });

      const token = jwt.sign(
        {
          user_id: user.User_id,
          role: user.Role,
          name: user.Full_name,
        },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
      );

      // Send basic response or token (e.g., JWT if implemented)
      res.json({
        message: 'Login successful',
        token,
        user: { id: user.User_id, role: user.Role }
      });
    });
  });
};

// Get profile
const getProfile = (req, res) => {
  const userId = req.user.id;

  db.query('SELECT * FROM Users WHERE User_id = ?', [userId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });

    res.json(results[0]);
  });
};

module.exports = { login, getProfile };

