"use client";
import Image from "next/image";
import { Search } from "lucide-react"; // Optional: For search icon
import "../styles/hero.css"

const HeroSection = () => {
  return (
    <section className="hero-section">
      {/* Background Image with Overlay */}
      <div className="hero-background">
        <Image
          src="/hot1.jpg" // Replace with your image path
          alt="Luxury Real Estate"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="hero-image"
        />
        <div className="hero-overlay"></div>
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        <h1 className="hero-headline">
          Find Your Dream Home with <span>Timi Properties</span>
        </h1>
        <p className="hero-subheadline">
          Explore luxury properties, modern apartments, and cozy homes tailored to your lifestyle.
        </p>

        {/* Call-to-Action Button */}
        <button className="hero-cta">Explore Properties</button>

        {/* Optional: Search Bar */}
        <div className="hero-search">
          <input
            type="text"
            placeholder="Search by city, neighborhood, or ZIP"
            className="search-input"
          />
          <button className="search-button">
            <Search size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;