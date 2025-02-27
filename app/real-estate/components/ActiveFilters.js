"use client";
import { useState } from "react";

const ActiveFilters = () => {
  const [filters, setFilters] = useState({
    category: "Apartment",
    priceRange: { min: 0, max: 1000000 },
    sortBy: "price-asc",
  });

  const resetFilters = () => {
    setFilters({
      category: "",
      priceRange: { min: 0, max: 1000000 },
      sortBy: "price-asc",
    });
  };

  return (
    <div className="active-filters">
      <h3>Active Filters</h3>
      {filters.category && <p>Category: {filters.category}</p>}
      <p>
        Price Range: ${filters.priceRange.min} - ${filters.priceRange.max}
      </p>
      <p>Sort By: {filters.sortBy}</p>
      <button onClick={resetFilters}>Reset All</button>
    </div>
  );
};

export default ActiveFilters;