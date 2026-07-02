const express = require('express');
const cors = require('cors');
const propertiesRouter = require('./routes/properties');
require('dotenv').config();

const pool = require('./db/connection');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT COUNT(*) AS total FROM rets_property');

    res.json({
      message: 'Backend is running!',
      totalProperties: rows[0].total
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Database connection failed'
    });
  }
});

const PORT = process.env.PORT || 3000;
app.use('/api/properties', propertiesRouter);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});