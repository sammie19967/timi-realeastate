"use client"; // Required for using React hooks in App Router

import { useState, useEffect } from "react";
import styles from "./FilterSidebar.module.css";

export default function FilterSidebar({ onFilterChange, onReset, onClose }) {
  // State for filters
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [purchaseType, setPurchaseType] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Apply filters in real-time
  useEffect(() => {
    const filters = {
      location,
      priceRange: priceRange.min || priceRange.max ? `${priceRange.min}-${priceRange.max}` : "",
      purchaseType,
      sortOrder,
    };
    onFilterChange(filters);
  }, [location, priceRange, purchaseType, sortOrder]);

  // Reset all filters
  const handleReset = () => {
    setLocation("");
    setPriceRange({ min: "", max: "" });
    setPurchaseType("");
    setSortOrder("asc");
    onReset();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h3>Filters</h3>

        {/* Location Filter */}
        <div className={styles.filterGroup}>
          <label>Location</label>
          <select value={location} onChange={(e) => setLocation(e.target.value)}>
            <option value="">All</option>
            <option value="Nairobi">Nairobi</option>
            <option value="Mombasa">Mombasa</option>
            <option value="Kisumu">Kisumu</option>
          </select>
        </div>

        {/* Price Range Filter */}
        <div className={styles.filterGroup}>
          <label>Price Range</label>
          <input
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
          />
          <input
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
          />
        </div>

        {/* Purchase Type Filter */}
        <div className={styles.filterGroup}>
          <label>Purchase Type</label>
          <select
            value={purchaseType}
            onChange={(e) => setPurchaseType(e.target.value)}
          >
            <option value="">All</option>
            <option value="cash">Cash Sales</option>
            <option value="rent">Rent</option>
            <option value="lease">Lease</option>
          </select>
        </div>

        {/* Sort Order */}
        <div className={styles.filterGroup}>
          <label>Sort By</label>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>

        {/* Reset Button */}
        <button className={styles.resetButton} onClick={handleReset}>
          Reset Filters
        </button>
      </div>
    </div>
  );
}