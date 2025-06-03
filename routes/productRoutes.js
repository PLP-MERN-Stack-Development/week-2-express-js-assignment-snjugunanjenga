// routes/productRoutes.js

const express = require('express');
const router = express.Router();

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductStats
} = require('../controllers/productController');

const authenticate = require('../middleware/authMiddleware');
const { validateProduct } = require('../middleware/validateMiddleware');

// All routes under /api/products will require authentication
router.use(authenticate);

/**
 * @route  GET /api/products
 * @desc   List all products (with optional filter/pagination/search)
 */
router.get('/', getAllProducts);

/**
 * @route  GET /api/products/stats
 * @desc   Get product statistics (count by category)
 */
router.get('/stats', getProductStats);

/**
 * @route  GET /api/products/:id
 * @desc   Get a single product by ID
 */
router.get('/:id', getProductById);

/**
 * @route  POST /api/products
 * @desc   Create a new product
 *        → Validation middleware ensures request body is valid
 */
router.post('/', validateProduct, createProduct);

/**
 * @route  PUT /api/products/:id
 * @desc   Update an existing product
 *        → Validation middleware ensures updates are valid
 */
router.put('/:id', validateProduct, updateProduct);

/**
 * @route  DELETE /api/products/:id
 * @desc   Delete a product by ID
 */
router.delete('/:id', deleteProduct);

module.exports = router;
