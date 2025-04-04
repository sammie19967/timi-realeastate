"use client";
import { useState } from "react";

import { categories, locations } from "./categories"; // import category data

// Define the FilterSidebar component
const FilterSidebar = ({ onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState({ country: "", county: "", subcounty: "" });
  const [selectedBrand, setSelectedBrand] = useState("");

  // Handle category change
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedSubcategory(""); // Reset subcategory when category changes
    onFilterChange({ category: event.target.value, subcategory: "", location: selectedLocation, brand: selectedBrand });
  };

  // Handle subcategory change
  const handleSubcategoryChange = (event) => {
    setSelectedSubcategory(event.target.value);
    onFilterChange({ category: selectedCategory, subcategory: event.target.value, location: selectedLocation, brand: selectedBrand });
  };

  // Handle location change
  const handleLocationChange = (field, value) => {
    setSelectedLocation((prev) => {
      const newLocation = { ...prev, [field]: value };
      onFilterChange({ category: selectedCategory, subcategory: selectedSubcategory, location: newLocation, brand: selectedBrand });
      return newLocation;
    });
  };

  // Handle brand change
  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
    onFilterChange({ category: selectedCategory, subcategory: selectedSubcategory, location: selectedLocation, brand: event.target.value });
  };

  return (
    <div className="filter-sidebar">
      <h2>Filter</h2>

      {/* Category Filter */}
      <div className="filter-group">
        <label>Category</label>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Subcategory Filter */}
      {selectedCategory && (
        <div className="filter-group">
          <label>Subcategory</label>
          <select value={selectedSubcategory} onChange={handleSubcategoryChange}>
            <option value="">Select Subcategory</option>
            {categories
              .find((category) => category.name === selectedCategory)
              .subcategories.map((subcategory) => (
                <option key={subcategory} value={subcategory}>
                  {subcategory}
                </option>
              ))}
          </select>
        </div>
      )}

      {/* Location Filter */}
      <div className="filter-group">
        <label>Country</label>
        <select onChange={(e) => handleLocationChange("country", e.target.value)}>
          <option value="">Select Country</option>
          <option value="Kenya">Kenya</option>
        </select>
      </div>

      {selectedLocation.country && (
        <>
          <div className="filter-group">
            <label>County</label>
            <select onChange={(e) => handleLocationChange("county", e.target.value)}>
              <option value="">Select County</option>
              {locations[0].counties.map((county) => (
                <option key={county.name} value={county.name}>
                  {county.name}
                </option>
              ))}
            </select>
          </div>

          {selectedLocation.county && (
            <div className="filter-group">
              <label>Subcounty</label>
              <select onChange={(e) => handleLocationChange("subcounty", e.target.value)}>
                <option value="">Select Subcounty</option>
                {locations[0].counties
                  .find((county) => county.name === selectedLocation.county)
                  .subcounties.map((subcounty) => (
                    <option key={subcounty} value={subcounty}>
                      {subcounty}
                    </option>
                  ))}
              </select>
            </div>
          )}
        </>
      )}

      {/* Brand Filter */}
      {selectedCategory === "Electronics" || selectedCategory === "Vehicles" ? (
        <div className="filter-group">
          <label>Brand</label>
          <select value={selectedBrand} onChange={handleBrandChange}>
            <option value="">Select Brand</option>
            {/* Brands can be dynamic for Electronics or Vehicles */}
            <option value="Samsung">Samsung</option>
            <option value="Apple">Apple</option>
            <option value="Toyota">Toyota</option>
            <option value="Nissan">Nissan</option>
          </select>
        </div>
      ) : null}
    </div>
  );
};

export default FilterSidebar;
