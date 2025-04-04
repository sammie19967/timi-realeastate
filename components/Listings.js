"use client";
import { useState, useEffect } from "react";

const Listings = ({ filters }) => {
  const [listings, setListings] = useState([]);

  // Simulated fetch data function (you can replace with actual API call)
  const fetchListings = () => {
    // Mock data based on filters
    const mockData = [
      { id: 1, title: "Samsung Galaxy S21", category: "Electronics", brand: "Samsung", location: "Nairobi", price: 70000 },
      { id: 2, title: "Toyota Corolla", category: "Vehicles", brand: "Toyota", location: "Kiambu", price: 1000000 },
      { id: 3, title: "Lenovo Laptop", category: "Electronics", brand: "Lenovo", location: "Mombasa", price: 45000 },
    ];

    const filteredData = mockData.filter((listing) => {
      return (
        (filters.category ? listing.category === filters.category : true) &&
        (filters.subcategory ? listing.subcategory === filters.subcategory : true) &&
        (filters.location.country ? listing.location === filters.location.county : true) &&
        (filters.brand ? listing.brand === filters.brand : true)
      );
    });

    setListings(filteredData);
  };

  // UseEffect to run fetchListings whenever filters change
  useEffect(() => {
    fetchListings();
  }, [filters]);

  return (
    <div className="listings">
      <h2>Listings</h2>
      {listings.length > 0 ? (
        listings.map((listing) => (
          <div key={listing.id} className="listing-item">
            <h3>{listing.title}</h3>
            <p>Category: {listing.category}</p>
            <p>Brand: {listing.brand}</p>
            <p>Location: {listing.location}</p>
            <p>Price: KSh {listing.price}</p>
          </div>
        ))
      ) : (
        <p>No listings match your criteria.</p>
      )}
    </div>
  );
};

export default Listings;
