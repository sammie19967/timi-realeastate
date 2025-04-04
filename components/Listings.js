"use client";
import { useState, useEffect } from "react";
import { Star, Heart, Share2, Phone, MessageSquare } from "lucide-react";
import Image from "next/image";

const Listings = ({ filters }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Image assets from public folder (assuming lease1.jpg to lease6.jpg exist)
  const listingImages = [
    "/lease1.jpg",
    "/lease2.jpg",
    "/lease3.jpg",
    "/lease4.jpg",
    "/lease5.jpg",
    "/lease6.jpg"
  ];

  // Simulated fetch data function with image assignment
  const fetchListings = () => {
    setLoading(true);
    
    setTimeout(() => {
      const mockData = [
        { 
          id: 1, 
          title: "Modern Apartment in Kilimani", 
          category: "Real Estate", 
          subcategory: "Apartments",
          brand: "Premium Homes", 
          location: "Nairobi", 
          price: 70000,
          rating: 4,
          image: listingImages[0],
          bedrooms: 2,
          bathrooms: 2,
          size: "1200 sqft"
        },
        { 
          id: 2, 
          title: "Luxury Villa in Runda", 
          category: "Real Estate", 
          subcategory: "Houses",
          brand: "Elite Properties", 
          location: "Kiambu", 
          price: 250000,
          rating: 5,
          image: listingImages[1],
          bedrooms: 4,
          bathrooms: 3,
          size: "3500 sqft"
        },
        { 
          id: 3, 
          title: "Office Space in Westlands", 
          category: "Commercial", 
          subcategory: "Offices",
          brand: "Prime Offices", 
          location: "Nairobi", 
          price: 120000,
          rating: 3,
          image: listingImages[2],
          size: "2000 sqft"
        },
        { 
          id: 4, 
          title: "Studio Apartment in Kileleshwa", 
          category: "Real Estate", 
          subcategory: "Apartments",
          brand: "Urban Living", 
          location: "Nairobi", 
          price: 45000,
          rating: 4,
          image: listingImages[3],
          bedrooms: 1,
          bathrooms: 1,
          size: "800 sqft"
        },
        { 
          id: 5, 
          title: "Retail Space in Mombasa", 
          category: "Commercial", 
          subcategory: "Retail",
          brand: "Coastal Properties", 
          location: "Mombasa", 
          price: 85000,
          rating: 4,
          image: listingImages[4],
          size: "1500 sqft"
        },
        { 
          id: 6, 
          title: "Family Home in Karen", 
          category: "Real Estate", 
          subcategory: "Houses",
          brand: "Prestige Homes", 
          location: "Nairobi", 
          price: 320000,
          rating: 5,
          image: listingImages[5],
          bedrooms: 5,
          bathrooms: 4,
          size: "4200 sqft"
        }
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
    }, 800);
  };

  useEffect(() => {
    fetchListings();
  }, [filters]);

  if (loading) {
    return (
      <div className="listings">
        <h2>Properties for Rent</h2>
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="listings">
      <h2>Properties for Rent</h2>
      
      {listings.length > 0 ? (
        <div className="listings-grid">
          {listings.map((listing) => (
            <div key={listing.id} className="listing-item">
              <div className="listing-image">
                <Image
                  src={listing.image}
                  alt={listing.title}
                  width={400}
                  height={300}
                  className="listing-img"
                  priority={listing.id <= 3} // Only prioritize first 3 images
                />
                <button className="favorite-button">
                  <Heart size={20} fill="currentColor" />
                </button>
              </div>
              <div className="listing-content">
                <div className="listing-header">
                  <div className="category-badge">
                    {listing.category}
                  </div>
                  <h3>{listing.title}</h3>
                  <div className="listing-location">
                    <span>{listing.location}</span>
                  </div>
                </div>
                
                <div className="listing-details">
                  {listing.bedrooms && (
                    <div className="detail-item">
                      <span>Bedrooms</span>
                      <strong>{listing.bedrooms}</strong>
                    </div>
                  )}
                  {listing.bathrooms && (
                    <div className="detail-item">
                      <span>Bathrooms</span>
                      <strong>{listing.bathrooms}</strong>
                    </div>
                  )}
                  {listing.size && (
                    <div className="detail-item">
                      <span>Size</span>
                      <strong>{listing.size}</strong>
                    </div>
                  )}
                </div>
                
                <div className="listing-footer">
                  <div className="price-rating">
                    <p className="price-highlight">KSh {listing.price.toLocaleString()}</p>
                    <div className="rating">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          fill={i < listing.rating ? "currentColor" : "none"} 
                          size={16}
                        />
                      ))}
                    </div>
                  </div>
                  
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
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results">
          <p>No properties match your criteria.</p>
          <button 
            className="action-button primary-action"
            style={{ marginTop: '1rem', padding: '0.75rem 1.5rem' }}
          >
            Browse All Properties
          </button>
        </div>
      )}
    </div>
  );
};

export default Listings;