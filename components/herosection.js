"use client";
import Image from "next/image";
import { Search } from "lucide-react"; // Optional: For search icon
import Typewriter from "typewriter-effect"; // Add this package for typewriter effect
import "../styles/hero.css";

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
        <h1 className="hero-headline">Welcome to Zenia Kenyork</h1>
        <p className="hero-subheadline">Kenya's #1 Online Marketplace</p>

        {/* Typewriter Effect */}
        <div className="hero-typewriter">
          <Typewriter
            options={{
              strings: ["BUY", "SELL", "CONNECT"],
              autoStart: true,
              loop: true,
              delay: 75,
            }}
          />
        </div>

        {/* Search Bar */}
        <div className="hero-search">
          <input
            type="text"
            placeholder="Search by product, service, or location"
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