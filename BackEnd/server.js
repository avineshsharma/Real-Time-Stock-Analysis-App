// // server.js
// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const axios = require('axios');

// const app = express();

// // Middleware
// app.use(cors({ origin: 'http://localhost:3000' })); // Allow React frontend
// app.use(express.json());

// // Health check route (test if server alive)
// app.get('/api/health', (req, res) => {
//   res.json({
//     status: 'ok',
//     message: 'Backend server is running 🚀',
//     serverTime: new Date().toISOString(),
//     port: process.env.PORT || 5000
//   });
// });

// // Temporary test route - we'll improve later
// app.get('/api/test-stock/:symbol', async (req, res) => {
//   const symbol = req.params.symbol.toUpperCase(); // e.g. AAPL

//   try {
//     // Example using Finnhub (change if you use different API)
//     const apiKey = process.env.FINNHUB_API_KEY;
//     if (!apiKey) {
//       return res.status(500).json({ error: 'API key not set in .env' });
//     }

//     const response = await axios.get(
//       `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`
//     );

//     res.json({
//       symbol,
//       data: response.data,
//       currentPrice: response.data.c,   // current price
//       change: response.data.d,         // change
//       percentChange: response.data.dp  // percent
//     });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ error: 'Failed to fetch stock data', details: error.message });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
//   console.log('Test endpoints:');
//   console.log(`→ http://localhost:${PORT}/api/health`);
//   console.log(`→ http://localhost:${PORT}/api/test-stock/AAPL`);
// });

// server.js
require('dotenv').config();   // ← correct way

const express = require('express');
const cors = require('cors');

const stockRoutes = require('./routes/stockRoutes');  // ← no .default, no extra quotes

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Mount routes with /api prefix
app.use('/api', stockRoutes);

// Optional: Root route for nice welcome
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Live Stock Analysis Backend',
    endpoints: [
      'GET /api/health',
      'GET /api/stock/:symbol  (example: /api/stock/AAPL)'
    ]
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log(`→ http://localhost:${PORT}/`);
  console.log(`→ http://localhost:${PORT}/api/health`);
  console.log(`→ http://localhost:${PORT}/api/stock/AAPL`);
});