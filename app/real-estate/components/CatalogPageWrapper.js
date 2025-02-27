"use client"; // Mark this as a Client Component

import { useState } from "react";
import FilterSidebar from "./FilterSidebar";

export default function CatalogPageWrapper({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});

  // Function to handle filter changes
  const handleFilterChange = (filters) => {
    console.log("Applied Filters:", filters);
    setActiveFilters(filters); // Update active filters
  };

  // Function to handle reset
  const handleReset = () => {
    console.log("Filters Reset");
    setActiveFilters({}); // Clear active filters
  };

  // Function to remove a specific filter
  const removeFilter = (filterKey) => {
    const updatedFilters = { ...activeFilters };
    delete updatedFilters[filterKey]; // Remove the filter
    setActiveFilters(updatedFilters);
    // Optionally, you can trigger a re-fetch or re-filter here
  };

  return (
    <div>
      <h1>Real Estate Catalog</h1>

      {/* Filter Button and Active Filters */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
        <button onClick={() => setIsModalOpen(true)}>Open Filters</button>

        {/* Display Active Filters */}
        {Object.entries(activeFilters).map(([key, value]) => {
          if (value) {
            return (
              <div key={key} style={{ display: "flex", alignItems: "center", gap: "5px", padding: "5px 10px", backgroundColor: "#f0f0f0", borderRadius: "4px" }}>
                <span>
                  {key}: {value}
                </span>
                <button onClick={() => removeFilter(key)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                  &times;
                </button>
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Filter Modal */}
      {isModalOpen && (
        <FilterSidebar
          onFilterChange={handleFilterChange}
          onReset={handleReset}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* Catalog Content */}
      <div>{children}</div>
    </div>
  );
}