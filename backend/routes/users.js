const express = require('express');
const router = express.Router();
const pool = require('../lib/db');

// Get all users
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT id, username, name, email, role, department_id FROM users WHERE is_active = 1 ORDER BY name');
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch users'
    });
  }
});

module.exports = router; 