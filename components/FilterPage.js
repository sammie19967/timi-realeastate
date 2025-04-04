"use client";
import { useState } from "react";
import FilterSidebar from "./FilterSidebar";
import Listings from "./Listings";
import { Filter } from "lucide-react"; // Import an icon for the button
import "@/styles/FilterPage.css"; // Import your CSS styles

const FilterPage = () => {
  const [filters, setFilters] = useState({
    category: "",
    subcategory: "",
    location: { country: "", county: "", subcounty: "" },
    brand: "",
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className={`filter-page ${sidebarOpen ? "sidebar-open" : ""}`}>
      <button 
        className="mobile-filter-toggle"
        onClick={() => setSidebarOpen(true)}
      >
        <Filter size={18} className="mr-2" />
        Show Filters
      </button>
      
      <FilterSidebar onFilterChange={handleFilterChange} />
      
      <div 
        className="sidebar-overlay" 
        onClick={() => setSidebarOpen(false)}
      />
      
      <Listings filters={filters} />
    </div>
  );
};

export default FilterPage;