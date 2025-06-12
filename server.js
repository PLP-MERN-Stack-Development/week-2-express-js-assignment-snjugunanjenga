// server.js

require('dotenv').config();                     // 1) Load .env variables
const express = require('express');
const bodyParser = require('body-parser');

const logger = require('./middleware/loggerMiddleware');            // 2) Custom logger middleware
const { notFoundHandler, globalErrorHandler } = require('./middleware/errorMiddleware');  // 3) 404 & global‐error middleware
const productRoutes = require('./routes/productRoutes');            // 4) Routes for /api/products

const app = express();
const PORT = process.env.PORT || 3000;

// 5) Parse JSON bodies
app.use(bodyParser.json());

// 6) Serve static files from the public directory
app.use(express.static('public'));

// 7) Log every request (method, URL, timestamp)
app.use(logger);

// 8) Mount all product‐related routes at /api/products
//    (Inside productRoutes, authentication & validation are already applied.)
app.use('/api/products', productRoutes);

// 9) Simple root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// Test route to verify API key
app.get('/test-api-key', (req, res) => {
  const apiKey = process.env.API_KEY;
  if (apiKey) {
    res.json({ 
      message: 'API key is loaded successfully',
      apiKeyLength: apiKey.length,
      apiKeyPrefix: apiKey.substring(0, 8) + '...' // Only show first 8 characters for security
    });
  } else {
    res.status(500).json({ error: 'API key is not loaded' });
  }
});

// 10) 404 handler for any unmatched route
app.use(notFoundHandler);

// 11) Global error handler
app.use(globalErrorHandler);

// 12) Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// 13) Export for testing or external usage
module.exports = app;
