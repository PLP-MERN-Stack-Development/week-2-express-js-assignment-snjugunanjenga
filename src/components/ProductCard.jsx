import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
          <span className="inline-block px-3 py-1 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-full">
            {product.category}
          </span>
        </div>
        <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>

      <div className="flex items-center justify-between">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            product.inStock
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </span>

        <div className="flex space-x-2">
          <button
            className="p-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200"
            aria-label="Edit product"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            className="p-2 text-gray-600 hover:text-red-600 transition-colors duration-200"
            aria-label="Delete product"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard; 