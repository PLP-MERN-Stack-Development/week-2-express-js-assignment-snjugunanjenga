// server.js

require('dotenv').config();                     // 1) Load .env variables
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');       // 2) Import database connection

const logger = require('./middleware/loggerMiddleware');            // 3) Custom logger middleware
const { notFoundHandler, globalErrorHandler } = require('./middleware/errorMiddleware');  // 4) 404 & global‐error middleware
const productRoutes = require('./routes/productRoutes');            // 5) Routes for /api/products

const app = express();
const PORT = process.env.PORT || 3000;

// 6) Connect to MongoDB
connectDB();

// 7) Parse JSON bodies
app.use(bodyParser.json());

// 8) Serve static files from the public directory
app.use(express.static('public'));

// 9) Log every request (method, URL, timestamp)
app.use(logger);

// 10) Mount all product‐related routes at /api/products
//    (Inside productRoutes, authentication & validation are already applied.)
app.use('/api/products', productRoutes);

// 11) Simple root route
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

// 12) 404 handler for any unmatched route
app.use(notFoundHandler);

// 13) Global error handler
app.use(globalErrorHandler);

// 14) Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// 15) Export for testing or external usage
module.exports = app;
