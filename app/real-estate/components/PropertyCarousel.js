"use client";
import { useState, useEffect } from "react"; // Added useEffect
import { ChevronLeft, ChevronRight, Eye } from "lucide-react"; // Added Eye icon for CTA
import "@/styles/propertycarousel.css";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample carousel data
  const slides = [
    {
      id: 1,
      image: "/carousel1.jpg",
      location: "Downtown, City",
      type: "Cash Sale",
      oldAmount: "$500,000",
      newAmount: "$450,000",
      link: "/product/1", // Link to product view page
    },
    {
      id: 2,
      image: "/carousel2.jpg",
      location: "Suburban Area",
      type: "Lease",
      oldAmount: "$2,500/month",
      newAmount: "$2,200/month",
      link: "/product/2",
    },
    {
      id: 3,
      image: "/carousel3.jpg",
      location: "Beachfront",
      type: "Rent",
      oldAmount: "$4,500/month",
      newAmount: "$4,000/month",
      link: "/product/3",
    },
    {
      id: 4,
      image: "/carousel4.jpg",
      location: "Mountain Retreat",
      type: "Cash Sale",
      oldAmount: "$300,000",
      newAmount: "$280,000",
      link: "/product/4",
    },
  ];

  // Go to next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Go to previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Get color based on type
  const getTypeColor = (type) => {
    switch (type) {
      case "Cash Sale":
        return "#10b981"; // Green
      case "Lease":
        return "#3b82f6"; // Blue
      case "Rent":
        return "#8b5cf6"; // Purple
      default:
        return "#6b7280"; // Default gray
    }
  };

  // Automatic slide change
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide(); // Automatically go to the next slide
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [currentSlide]); // Re-run effect when currentSlide changes

  return (
    <div className="carousel">
      {/* Slides */}
      <div
        className="slides"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="slide">
            <img src={slide.image} alt={slide.location} className="slide-image" />
            <div className="slide-details">
              <div className="glassmorphism-card">
                <h3 className="slide-location">{slide.location}</h3>
                <p
                  className="slide-type"
                  style={{ color: getTypeColor(slide.type) }}
                >
                  {slide.type}
                </p>
                <p className="slide-amount">
                  <span className="old-amount">{slide.oldAmount}</span>{" "}
                  <span className="new-amount">{slide.newAmount}</span>
                </p>
                <a href={slide.link} className="cta-button">
                  <Eye size={18} /> View Product
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button className="nav-button prev" onClick={prevSlide}>
        <ChevronLeft size={32} />
      </button>
      <button className="nav-button next" onClick={nextSlide}>
        <ChevronRight size={32} />
      </button>
    </div>
  );
};

export default Carousel;