"use client";
import { useState, useEffect } from "react";
import { Star, Heart, Share2, Phone, MessageSquare } from "lucide-react";

const Listings = ({ filters }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulated fetch data function
  const fetchListings = () => {
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const mockData = [
        { 
          id: 1, 
          title: "Samsung Galaxy S21", 
          category: "Electronics", 
          subcategory: "Phones",
          brand: "Samsung", 
          location: "Nairobi", 
          price: 70000,
          rating: 4,
          image: "/phone-placeholder.jpg"
        },
        { 
          id: 2, 
          title: "Toyota Corolla 2018", 
          category: "Vehicles", 
          subcategory: "Sedan",
          brand: "Toyota", 
          location: "Kiambu", 
          price: 1000000,
          rating: 5,
          image: "/car-placeholder.jpg"
        },
        { 
          id: 3, 
          title: "Lenovo ThinkPad", 
          category: "Electronics", 
          subcategory: "Laptops",
          brand: "Lenovo", 
          location: "Mombasa", 
          price: 45000,
          rating: 3,
          image: "/laptop-placeholder.jpg"
        },
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
      setLoading(false);
    }, 800); // Simulate network delay
  };

  useEffect(() => {
    fetchListings();
  }, [filters]);

  if (loading) {
    return (
      <div className="listings">
        <h2>Listings</h2>
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="listings">
      <h2>Listings</h2>
      
      {listings.length > 0 ? (
        <div className="listings-grid">
          {listings.map((listing) => (
            <div key={listing.id} className="listing-item">
              <div className="listing-image">
                {/* In a real app, you would use next/image here */}
                <span>Image Placeholder</span>
              </div>
              <div className="listing-content">
                <div className="category-badge">
                  {listing.category}
                </div>
                <h3>{listing.title}</h3>
                
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      fill={i < listing.rating ? "currentColor" : "none"} 
                    />
                  ))}
                </div>
                
                <p>Brand: {listing.brand}</p>
                <p>Location: {listing.location}</p>
                <p className="price-highlight">KSh {listing.price.toLocaleString()}</p>
                
                <div className="listing-actions">
                  <button className="action-button primary-action">
                    <Phone size={16} className="mr-1" /> Call
                  </button>
                  <button className="action-button secondary-action">
                    <MessageSquare size={16} className="mr-1" /> Chat
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results">
          <p>No listings match your criteria.</p>
          <button 
            className="action-button primary-action"
            style={{ marginTop: '1rem', padding: '0.75rem 1.5rem' }}
          >
            Browse All Listings
          </button>
        </div>
      )}
    </div>
  );
};

export default Listings;