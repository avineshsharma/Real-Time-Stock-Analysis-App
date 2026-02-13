const axios = require('axios');

const getStockQuote = async (req, res) => {
  const symbol = req.params.symbol?.toUpperCase();

  if (!symbol) {
    return res.status(400).json({ error: 'Symbol required (example: AAPL)' });
  }

  try {
    const apiKey = process.env.FINNHUB_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API key missing in .env' });
    }

    const response = await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`
    );

    const data = response.data;

    if (data.c === 0) {
      return res.status(404).json({ error: `No data for ${symbol}` });
    }

    res.json({
      symbol,
      currentPrice: data.c,
      change: data.d,
      percentChange: data.dp,
      previousClose: data.pc
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to get quote', details: error.message });
  }
};

module.exports = { getStockQuote };