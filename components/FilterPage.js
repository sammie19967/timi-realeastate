"use client";
import { useState } from "react";
import FilterSidebar from "./FilterSidebar";
import Listings from "./Listings";
import { Filter } from "lucide-react";
import "@/styles/FilterPage.css";

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
    // Optional: Auto-close sidebar on mobile after applying filters
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className={`filter-page ${sidebarOpen ? "sidebar-open" : ""}`}>
      {/* Mobile Filter Toggle */}
      <button 
        className="mobile-filter-toggle"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open filters"
      >
        <Filter size={18} className="mr-2" />
        Filters
      </button>
      
      {/* Filter Sidebar */}
      <FilterSidebar onFilterChange={handleFilterChange} />
      
      {/* Overlay (mobile only) */}
      <div 
        className="sidebar-overlay" 
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />
      
      {/* Main Content */}
      <Listings filters={filters} />
    </div>
  );
};

export default FilterPage;