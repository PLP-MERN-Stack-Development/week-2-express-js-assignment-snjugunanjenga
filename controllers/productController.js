// controllers/productController.js

const { v4: uuidv4 } = require('uuid');
const ApiError = require('../utils/apiError');

/**
 * In-memory “database” for products.
 * (In a real MERN app, you would use MongoDB + Mongoose for persistence.)
 * For this assignment, we store products in an array.
 */
let products = [];

/**
 * @desc   List all products with optional filtering, pagination, and search
 * @route  GET /api/products
 * @access Authenticated (requires valid API key)
 * 
 * Query parameters supported:
 *   - category (string): filter by category
 *   - search (string): substring match on product name (case-insensitive)
 *   - page (number, default=1): page number for pagination
 *   - limit (number, default=10): number of items per page
 */
const getAllProducts = (req, res, next) => {
  try {
    let result = [...products];

    // 1) Filtering by category
    if (req.query.category) {
      result = result.filter(prod =>
        prod.category.toLowerCase() === req.query.category.toLowerCase()
      );
    }

    // 2) Search by name substring
    if (req.query.search) {
      const searchTerm = req.query.search.toLowerCase();
      result = result.filter(prod =>
        prod.name.toLowerCase().includes(searchTerm)
      );
    }

    // 3) Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalItems = result.length;
    const totalPages = Math.ceil(totalItems / limit);

    const paginatedResults = result.slice(startIndex, endIndex);

    res.json({
      status: 'success',
      page,
      totalPages,
      totalItems,
      data: paginatedResults
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc   Get a specific product by ID
 * @route  GET /api/products/:id
 * @access Authenticated
 */
const getProductById = (req, res, next) => {
  try {
    const { id } = req.params;
    const product = products.find(prod => prod.id === id);
    if (!product) {
      return next(new ApiError(404, `Product with id "${id}" not found`));
    }
    res.json({ status: 'success', data: product });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc   Create a new product
 * @route  POST /api/products
 * @access Authenticated
 */
const createProduct = (req, res, next) => {
  try {
    const { name, description, price, category, inStock } = req.body;

    // id is auto-generated via uuid
    const newProduct = {
      id: uuidv4(),
      name,
      description,
      price,
      category,
      inStock
    };

    products.push(newProduct);

    res.status(201).json({
      status: 'success',
      data: newProduct
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc   Update an existing product
 * @route  PUT /api/products/:id
 * @access Authenticated
 */
const updateProduct = (req, res, next) => {
  try {
    const { id } = req.params;
    const index = products.findIndex(prod => prod.id === id);

    if (index === -1) {
      return next(new ApiError(404, `Product with id "${id}" not found`));
    }

    // Only update the provided fields
    const { name, description, price, category, inStock } = req.body;
    const existing = products[index];

    const updated = {
      ...existing,
      name,
      description,
      price,
      category,
      inStock
    };

    products[index] = updated;

    res.json({
      status: 'success',
      data: updated
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc   Delete a product by ID
 * @route  DELETE /api/products/:id
 * @access Authenticated
 */
const deleteProduct = (req, res, next) => {
  try {
    const { id } = req.params;
    const index = products.findIndex(prod => prod.id === id);

    if (index === -1) {
      return next(new ApiError(404, `Product with id "${id}" not found`));
    }

    // Remove from array
    products.splice(index, 1);

    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc   Get product statistics (e.g., count by category)
 * @route  GET /api/products/stats
 * @access Authenticated
 */
const getProductStats = (req, res, next) => {
  try {
    // Count products by category
    const stats = products.reduce((acc, prod) => {
      const cat = prod.category;
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {});

    res.json({
      status: 'success',
      data: stats
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductStats
};
