const express = require('express');
const router = express.Router();
const pool = require('../lib/db');

// Get all locations
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM asset_locations ORDER BY name');
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch locations'
    });
  }
});

module.exports = router; 