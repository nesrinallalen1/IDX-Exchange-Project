const express = require('express');
const router = express.Router();
const pool = require('../db/connection');

router.get('/', async (req, res) => {
  try {
    const [results] = await pool.query(
      'SELECT * FROM rets_openhouse LIMIT 20'
    );

    res.json({
      total: results.length,
      results
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      error: 'Failed to fetch open houses'
    });
  }
});

module.exports = router;