import { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((term, min, max) => {
      onSearch({ search: term, priceMin: min, priceMax: max });
    }, 300),
    [onSearch]
  );

  // Handle search term changes
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value, priceRange.min, priceRange.max);
  };

  // Handle price range changes
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const newPriceRange = { ...priceRange, [name]: value };
    setPriceRange(newPriceRange);
    debouncedSearch(searchTerm, newPriceRange.min, newPriceRange.max);
  };

  return (
    <div className="w-full space-y-4">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search products..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          aria-label="Search products"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Price Range Inputs */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">
            Min Price
          </label>
          <input
            type="number"
            id="minPrice"
            name="min"
            value={priceRange.min}
            onChange={handlePriceChange}
            placeholder="Min"
            min="0"
            step="0.01"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            aria-label="Minimum price"
          />
        </div>
        <div>
          <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
            Max Price
          </label>
          <input
            type="number"
            id="maxPrice"
            name="max"
            value={priceRange.max}
            onChange={handlePriceChange}
            placeholder="Max"
            min="0"
            step="0.01"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            aria-label="Maximum price"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar; 