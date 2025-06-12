// controllers/productController.js

const Product = require('../models/Product');
const ApiError = require('../utils/apiError');

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
const getAllProducts = async (req, res, next) => {
  try {
    const query = {};

    // Filtering by category
    if (req.query.category) {
      query.category = req.query.category;
    }

    // Search by name substring
    if (req.query.search) {
      query.name = { $regex: req.query.search, $options: 'i' };
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const totalItems = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalItems / limit);

    const products = await Product.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      status: 'success',
      page,
      totalPages,
      totalItems,
      data: products
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
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ApiError(404, `Product with id "${req.params.id}" not found`));
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
const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      status: 'success',
      data: product
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
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return next(new ApiError(404, `Product with id "${req.params.id}" not found`));
    }

    res.json({
      status: 'success',
      data: product
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
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return next(new ApiError(404, `Product with id "${req.params.id}" not found`));
    }

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
const getProductStats = async (req, res, next) => {
  try {
    const stats = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          averagePrice: { $avg: '$price' }
        }
      }
    ]);

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
