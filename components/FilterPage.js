import { useState } from "react";
import FilterSidebar from "./FilterSidebar";
import Listings from "./Listings";

const FilterPage = () => {
  const [filters, setFilters] = useState({
    category: "",
    subcategory: "",
    location: { country: "", county: "", subcounty: "" },
    brand: "",
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="filter-page">
      <FilterSidebar onFilterChange={handleFilterChange} />
      <Listings filters={filters} />
    </div>
  );
};

export default FilterPage;
