const express = require('express');
const router = express.Router();
const pool = require('../db/connection');

// GET all properties
router.get('/', async (req, res) => {
  const limit = parseInt(req.query.limit) || 20;
  const offset = parseInt(req.query.offset) || 0;

  const {
    city,
    zipcode,
    minPrice,
    maxPrice,
    beds,
    baths,
    sortBy,
    sortOrder
  } = req.query;

  try {
    let query = 'SELECT * FROM rets_property WHERE 1=1';
    const values = [];

    if (city) {
      query += ' AND L_City = ?';
      values.push(city);
    }

    if (zipcode) {
      query += ' AND L_Zip = ?';
      values.push(zipcode);
    }

    if (minPrice) {
      query += ' AND L_SystemPrice >= ?';
      values.push(minPrice);
    }

    if (maxPrice) {
      query += ' AND L_SystemPrice <= ?';
      values.push(maxPrice);
    }

    if (beds) {
      query += ' AND BedroomsTotal >= ?';
      values.push(beds);
    }

    if (baths) {
      query += ' AND BathroomsTotalInteger >= ?';
      values.push(baths);
    }

    const validSortFields = [
      'L_SystemPrice',
      'BedroomsTotal',
      'BathroomsTotalInteger',
      'YearBuilt'
    ];

    const validOrders = ['ASC', 'DESC'];

    if (sortBy && validSortFields.includes(sortBy)) {
      const order = validOrders.includes((sortOrder || '').toUpperCase())
        ? sortOrder.toUpperCase()
        : 'ASC';

      query += ` ORDER BY ${sortBy} ${order}`;
    }

    query += ' LIMIT ? OFFSET ?';
    values.push(limit, offset);

    console.log(query);
    console.log(values);

    const [results] = await pool.query(query, values);

    res.json({
      total: results.length,
      results
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      error: 'Failed to fetch properties'
    });
  }
});

// GET one property
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [results] = await pool.query(
      'SELECT * FROM rets_property WHERE L_ListingID = ?',
      [id]
    );

    if (results.length === 0) {
      return res.status(404).json({
        error: 'Property not found'
      });
    }

    res.json(results[0]);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      error: 'Failed to fetch property'
    });
  }
});

module.exports = router;