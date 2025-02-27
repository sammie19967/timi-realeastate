"use client";
import { useEffect, useState } from "react";

const Catalog = () => {
  const [properties, setProperties] = useState([]);

  // Fetch properties based on filters (mock data for now)
  useEffect(() => {
    const mockProperties = [
      { id: 1, name: "Luxury Apartment", price: 500000, category: "Apartment" },
      { id: 2, name: "Modern Villa", price: 1200000, category: "Villa" },
      { id: 3, name: "Cozy Condo", price: 300000, category: "Condo" },
      { id: 4, name: "Spacious Townhouse", price: 800000, category: "Townhouse" },
    ];
    setProperties(mockProperties);
  }, []);

  return (
    <div className="catalog">
      <h3>Properties</h3>
      <div className="property-list">
        {properties.map((property) => (
          <div key={property.id} className="property-card">
            <h4>{property.name}</h4>
            <p>Price: ${property.price}</p>
            <p>Category: {property.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;