// middleware/authMiddleware.js

const ApiError = require('../utils/apiError');

/**
 * Authentication middleware.
 * Expects an `x-api-key` header. 
 * Compares it to process.env.API_KEY.
 * If missing or invalid, rejects the request with 401 Unauthorized.
 */
function authenticate(req, res, next) {
  const apiKey = req.header('x-api-key');
  const validKey = process.env.API_KEY;

  if (!apiKey) {
    // No API key provided
    return next(new ApiError(401, 'API key is missing'));
  }

  if (apiKey !== validKey) {
    // Wrong API key
    return next(new ApiError(401, 'Invalid API key'));
  }

  // If valid, attach an “authenticated” flag (optional) and continue
  req.isAuthenticated = true;
  next();
}

module.exports = authenticate;
