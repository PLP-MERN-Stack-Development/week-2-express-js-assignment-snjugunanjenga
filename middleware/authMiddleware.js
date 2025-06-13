// middleware/authMiddleware.js

const ApiError = require('../utils/apiError');

/**
 * Authentication middleware.
 * Expects an `x-api-key` header. 
 * Compares it to process.env.API_KEY.
 * If missing or invalid, rejects the request with 401 Unauthorized.
 */
function authenticate(req, res, next) {
  // Log headers for debugging
  console.log('Request headers:', req.headers);
  
  const apiKey = req.header('x-api-key');
  const validKey = process.env.API_KEY;

  // Log API key status (without exposing the actual key)
  console.log('API Key present:', !!apiKey);
  console.log('Valid key configured:', !!validKey);

  if (!validKey) {
    return next(new ApiError(500, 'Server configuration error: API key not set'));
  }

  if (!apiKey) {
    return next(new ApiError(401, 'API key is missing. Please include x-api-key header'));
  }

  if (apiKey !== validKey) {
    return next(new ApiError(401, 'Invalid API key'));
  }

  // If valid, attach an "authenticated" flag and continue
  req.isAuthenticated = true;
  next();
}

module.exports = authenticate;
