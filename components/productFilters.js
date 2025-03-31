// components/ProductFilters.jsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const ProductFilters = () => {
  const router = useRouter();
  const [filters, setFilters] = useState({
    search: '',
    minPrice: '',
    maxPrice: '',
    location: '',
    brand: '',
    listingType: '',
    sortBy: 'newest'
  });
  
  // Some sample location options (ideally from your database)
  const locations = ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru'];
  
  // Some sample brand options (ideally from your database)
  const brands = ['Samsung', 'Apple', 'Toyota', 'Honda'];
  
  // Load filters from URL when page loads
  useEffect(() => {
    if (router.isReady) {
      const queryFilters = { ...router.query };
      delete queryFilters.page;
      
      setFilters(prev => ({
        ...prev,
        ...queryFilters
      }));
    }
  }, [router.isReady, router.query]);
  
  // Handle filter input changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Apply filters
  const applyFilters = () => {
    // Remove empty filters
    const queryParams = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams[key] = value;
    });
    
    // Update URL with filter params
    router.push({
      pathname: router.pathname,
      query: queryParams
    });
  };
  
  // Reset all filters
  const resetFilters = () => {
    setFilters({
      search: '',
      minPrice: '',
      maxPrice: '',
      location: '',
      brand: '',
      listingType: '',
      sortBy: 'newest'
    });
    
    router.push(router.pathname);
  };
  
  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold mb-4">Filters</h2>
      
      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          name="search"
          placeholder="Search products..."
          value={filters.search}
          onChange={handleFilterChange}
          className="w-full p-2 border rounded"
        />
      </div>
      
      {/* Price range filters */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Price Range</h3>
        <div className="flex space-x-2">
          <input
            type="number"
            name="minPrice"
            placeholder="Min"
            value={filters.minPrice}
            onChange={handleFilterChange}
            className="w-1/2 p-2 border rounded"
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            className="w-1/2 p-2 border rounded"
          />
        </div>
      </div>
      
      {/* Location filter */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Location</h3>
        <select
          name="location"
          value={filters.location}
          onChange={handleFilterChange}
          className="w-full p-2 border rounded"
        >
          <option value="">All Locations</option>
          {locations.map(location => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>
      </div>
      
      {/* Brand filter */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Brand</h3>
        <select
          name="brand"
          value={filters.brand}
          onChange={handleFilterChange}
          className="w-full p-2 border rounded"
        >
          <option value="">All Brands</option>
          {brands.map(brand => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </div>
      
      {/* Listing Type filter */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Listing Type</h3>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="listingType"
              value="sale"
              checked={filters.listingType === 'sale'}
              onChange={handleFilterChange}
              className="mr-2"
            />
            For Sale
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="listingType"
              value="hire"
              checked={filters.listingType === 'hire'}
              onChange={handleFilterChange}
              className="mr-2"
            />
            For Hire
          </label>
        </div>
      </div>
      
      {/* Sort By filter */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Sort By</h3>
        <select
          name="sortBy"
          value={filters.sortBy}
          onChange={handleFilterChange}
          className="w-full p-2 border rounded"
        >
          <option value="newest">Newest First</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>
      
      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={applyFilters}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Apply Filters
        </button>
        <button
          onClick={resetFilters}
          className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default ProductFilters;
