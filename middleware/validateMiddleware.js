// middleware/validateMiddleware.js

const ApiError = require('../utils/apiError');

/**
 * Validation middleware for ‘create’ and ‘update’ product requests.
 * Ensures required fields are present and have the correct type:
 *   - name: non-empty string
 *   - description: string (can be empty)
 *   - price: number >= 0
 *   - category: non-empty string
 *   - inStock: boolean
 */
function validateProduct(req, res, next) {
  const { name, description, price, category, inStock } = req.body;

  if (typeof name !== 'string' || name.trim() === '') {
    return next(new ApiError(400, 'Product “name” is required and must be a non-empty string'));
  }

  if (typeof description !== 'string') {
    return next(new ApiError(400, 'Product “description” must be a string'));
  }

  if (typeof price !== 'number' || price < 0) {
    return next(new ApiError(400, 'Product “price” is required and must be a non-negative number'));
  }

  if (typeof category !== 'string' || category.trim() === '') {
    return next(new ApiError(400, 'Product “category” is required and must be a non-empty string'));
  }

  if (typeof inStock !== 'boolean') {
    return next(new ApiError(400, 'Product “inStock” is required and must be a boolean'));
  }

  next();
}

module.exports = { validateProduct };
