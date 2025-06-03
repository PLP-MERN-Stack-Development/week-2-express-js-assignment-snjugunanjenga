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

// 6) Log every request (method, URL, timestamp)
app.use(logger);

// 7) Mount all product‐related routes at /api/products
//    (Inside productRoutes, authentication & validation are already applied.)
app.use('/api/products', productRoutes);

// 8) Simple root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// 9) 404 handler for any unmatched route
app.use(notFoundHandler);

// 10) Global error handler
app.use(globalErrorHandler);

// 11) Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// 12) Export for testing or external usage
module.exports = app;
