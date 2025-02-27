"use client";
import { useState } from "react";

const FilterSidebar = () => {
  const [filters, setFilters] = useState({
    category: "",
    priceRange: { min: 0, max: 1000000 },
    sortBy: "price-asc",
  });

  const categories = ["Apartment", "Villa", "Condo", "Townhouse", "Land"];
  const sortOptions = [
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "date-asc", label: "Date: Oldest First" },
    { value: "date-desc", label: "Date: Newest First" },
  ];

  const handleCategoryChange = (category) => {
    setFilters((prev) => ({ ...prev, category }));
  };

  const handlePriceRangeChange = (min, max) => {
    setFilters((prev) => ({ ...prev, priceRange: { min, max } }));
  };

  const handleSortChange = (sortBy) => {
    setFilters((prev) => ({ ...prev, sortBy }));
  };

  return (
    <div className="filter-sidebar-container">
      <h3>Filters</h3>

      {/* Category Filter */}
      <div className="filter-section">
        <h4>Category</h4>
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${filters.category === category ? "active" : ""}`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Price Range Filter */}
      <div className="filter-section">
        <h4>Price Range</h4>
        <input
          type="range"
          min={0}
          max={1000000}
          value={filters.priceRange.min}
          onChange={(e) =>
            handlePriceRangeChange(Number(e.target.value), filters.priceRange.max)
          }
        />
        <input
          type="range"
          min={0}
          max={1000000}
          value={filters.priceRange.max}
          onChange={(e) =>
            handlePriceRangeChange(filters.priceRange.min, Number(e.target.value))
          }
        />
        <p>
          ${filters.priceRange.min} - ${filters.priceRange.max}
        </p>
      </div>

      {/* Sort By */}
      <div className="filter-section">
        <h4>Sort By</h4>
        <select
          value={filters.sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterSidebar;