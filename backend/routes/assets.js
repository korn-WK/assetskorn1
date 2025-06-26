const express = require('express');
const router = express.Router();
const pool = require('../lib/db');

// Get all assets with related data
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT 
        a.*,
        d.name_th as department_name,
        u.name as owner_name,
        al.name as location_name
      FROM assets a
      LEFT JOIN departments d ON a.department_id = d.id
      LEFT JOIN users u ON a.owner_id = u.id
      LEFT JOIN asset_locations al ON a.location_id = al.id
      ORDER BY a.created_at DESC
    `);
    
    res.json({
      success: true,
      data: rows,
      count: rows.length
    });
  } catch (error) {
    console.error('Error fetching assets:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch assets',
      message: error.message
    });
  }
});

// Get asset by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT 
        a.*,
        d.name_th as department_name,
        u.name as owner_name,
        al.name as location_name
      FROM assets a
      LEFT JOIN departments d ON a.department_id = d.id
      LEFT JOIN users u ON a.owner_id = u.id
      LEFT JOIN asset_locations al ON a.location_id = al.id
      WHERE a.id = ?
    `, [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Asset not found'
      });
    }
    
    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error fetching asset:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch asset',
      message: error.message
    });
  }
});

// Create new asset
router.post('/', async (req, res) => {
  try {
    const {
      asset_code,
      name,
      description,
      location_id,
      location,
      status,
      department_id,
      owner_id,
      image_url,
      acquired_date
    } = req.body;

    const [result] = await pool.execute(`
      INSERT INTO assets (
        asset_code, name, description, location_id, location, 
        status, department_id, owner_id, image_url, acquired_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      asset_code, name, description, location_id, location,
      status || 'active', department_id, owner_id, image_url, acquired_date
    ]);

    res.status(201).json({
      success: true,
      message: 'Asset created successfully',
      data: { id: result.insertId }
    });
  } catch (error) {
    console.error('Error creating asset:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create asset',
      message: error.message
    });
  }
});

// Update asset
router.put('/:id', async (req, res) => {
  try {
    const {
      asset_code,
      name,
      description,
      location_id,
      location,
      status,
      department_id,
      owner_id,
      image_url,
      acquired_date
    } = req.body;

    const [result] = await pool.execute(`
      UPDATE assets SET
        asset_code = ?, name = ?, description = ?, location_id = ?, location = ?,
        status = ?, department_id = ?, owner_id = ?, image_url = ?, acquired_date = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [
      asset_code, name, description, location_id, location,
      status, department_id, owner_id, image_url, acquired_date,
      req.params.id
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: 'Asset not found'
      });
    }

    res.json({
      success: true,
      message: 'Asset updated successfully'
    });
  } catch (error) {
    console.error('Error updating asset:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update asset',
      message: error.message
    });
  }
});

// Delete asset
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.execute(
      'DELETE FROM assets WHERE id = ?',
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: 'Asset not found'
      });
    }

    res.json({
      success: true,
      message: 'Asset deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting asset:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete asset',
      message: error.message
    });
  }
});

// Get assets by status
router.get('/status/:status', async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT 
        a.*,
        d.name_th as department_name,
        u.name as owner_name,
        al.name as location_name
      FROM assets a
      LEFT JOIN departments d ON a.department_id = d.id
      LEFT JOIN users u ON a.owner_id = u.id
      LEFT JOIN asset_locations al ON a.location_id = al.id
      WHERE a.status = ?
      ORDER BY a.created_at DESC
    `, [req.params.status]);
    
    res.json({
      success: true,
      data: rows,
      count: rows.length
    });
  } catch (error) {
    console.error('Error fetching assets by status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch assets',
      message: error.message
    });
  }
});

module.exports = router; 