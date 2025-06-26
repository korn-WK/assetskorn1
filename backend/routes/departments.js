const express = require('express');
const router = express.Router();
const pool = require('../lib/db');

// Get all departments
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM departments ORDER BY name_th');
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch departments'
    });
  }
});

module.exports = router; 