"use client";
import { useState, useEffect } from "react";
import "@/styles/FilterBar.css";
import { categories, locations } from "./categories"; // Import your CSS styles

const FilterSidebar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    category: "",
    subcategory: "",
    location: { country: "", county: "", subcounty: "" },
    brand: "",
    priceRange: { min: "", max: "" }
  });

  // Handle all filter changes
  const handleFilterChange = (field, value) => {
    setFilters(prev => {
      const newFilters = { ...prev, [field]: value };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  // Handle nested object changes (like location)
  const handleNestedChange = (parent, field, value) => {
    setFilters(prev => {
      const newNested = { ...prev[parent], [field]: value };
      const newFilters = { ...prev, [parent]: newNested };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      category: "",
      subcategory: "",
      location: { country: "", county: "", subcounty: "" },
      brand: "",
      priceRange: { min: "", max: "" }
    });
    onFilterChange({
      category: "",
      subcategory: "",
      location: { country: "", county: "", subcounty: "" },
      brand: "",
      priceRange: { min: "", max: "" }
    });
  };

  return (
    <div className="filter-sidebar">
      <h2>Filter</h2>

      {/* Category Filter */}
      <div className={`filter-group ${filters.category ? '' : 'active'}`}>
        <label>Category</label>
        <select 
          value={filters.category} 
          onChange={(e) => handleFilterChange('category', e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Subcategory Filter */}
      <div className={`filter-group ${filters.category && !filters.subcategory ? 'active' : ''}`}>
        {filters.category && (
          <>
            <label>Subcategory</label>
            <select
              value={filters.subcategory}
              onChange={(e) => handleFilterChange('subcategory', e.target.value)}
            >
              <option value="">Select Subcategory</option>
              {categories
                .find((c) => c.name === filters.category)
                ?.subcategories?.map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
            </select>
          </>
        )}
      </div>

      {/* Location Filters */}
      <div className={`filter-group ${!filters.location.country ? 'active' : ''}`}>
        <label>Country</label>
        <select
          value={filters.location.country}
          onChange={(e) => handleNestedChange('location', 'country', e.target.value)}
        >
          <option value="">Select Country</option>
          <option value="Kenya">Kenya</option>
        </select>
      </div>

      {/* County Filter */}
      <div className={`filter-group ${filters.location.country && !filters.location.county ? 'active' : ''}`}>
        {filters.location.country && (
          <>
            <label>County</label>
            <select
              value={filters.location.county}
              onChange={(e) => handleNestedChange('location', 'county', e.target.value)}
            >
              <option value="">Select County</option>
              {locations[0].counties.map((county) => (
                <option key={county.name} value={county.name}>
                  {county.name}
                </option>
              ))}
            </select>
          </>
        )}
      </div>

      {/* Subcounty Filter */}
      <div className={`filter-group ${filters.location.county && !filters.location.subcounty ? 'active' : ''}`}>
        {filters.location.county && (
          <>
            <label>Subcounty</label>
            <select
              value={filters.location.subcounty}
              onChange={(e) => handleNestedChange('location', 'subcounty', e.target.value)}
            >
              <option value="">Select Subcounty</option>
              {locations[0].counties
                .find((c) => c.name === filters.location.county)
                ?.subcounties?.map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
            </select>
          </>
        )}
      </div>

      {/* Brand Filter */}
      <div className={`filter-group ${(filters.category === "Electronics" || filters.category === "Vehicles") && !filters.brand ? 'active' : ''}`}>
        {(filters.category === "Electronics" || filters.category === "Vehicles") && (
          <>
            <label>Brand</label>
            <select
              value={filters.brand}
              onChange={(e) => handleFilterChange('brand', e.target.value)}
            >
              <option value="">Select Brand</option>
              <option value="Samsung">Samsung</option>
              <option value="Apple">Apple</option>
              <option value="Toyota">Toyota</option>
              <option value="Nissan">Nissan</option>
            </select>
          </>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="filter-group">
        <label>Price Range</label>
        <div className="price-range">
          <input
            type="number"
            placeholder="Min"
            value={filters.priceRange.min}
            onChange={(e) => handleNestedChange('priceRange', 'min', e.target.value)}
          />
          <span> to </span>
          <input
            type="number"
            placeholder="Max"
            value={filters.priceRange.max}
            onChange={(e) => handleNestedChange('priceRange', 'max', e.target.value)}
          />
        </div>
      </div>

      {/* Clear Filters Button */}
      <button className="clear-filters" onClick={clearFilters}>
        Clear All Filters
      </button>
    </div>
  );
};

export default FilterSidebar;