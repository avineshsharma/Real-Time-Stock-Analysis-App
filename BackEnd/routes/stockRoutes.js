// routes/stockRoutes.js

// import { Router } from 'express';
// const router = Router();

// import { getStockQuote } from '../controllers/stockController.js';

// // Health check (we can keep it here or move later)
// router.get('/health', (req, res) => {
//   res.json({
//     status: 'ok',
//     message: 'Stock API backend is running 🚀',
//     serverTime: new Date().toISOString()
//   });
// });

// // Main stock quote endpoint
// router.get('/stock/:symbol', getStockQuote);

// export default router;
// routes/stockRoutes.js
const express = require('express');
const router = express.Router();

const { getStockQuote } = require('../controllers/stockController');

router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Backend is running',
    time: new Date().toISOString()
  });
});

router.get('/stock/:symbol', getStockQuote);

module.exports = router;