// middleware/loggerMiddleware.js

/**
 * Logger middleware that logs:
 *   - HTTP method (req.method)
 *   - Request URL (req.originalUrl)
 *   - Timestamp (ISO string)
 */
function logger(req, res, next) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
}

module.exports = logger;
