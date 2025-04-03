"use client";
import { Search } from "lucide-react";
import Typewriter from "typewriter-effect";
import "../styles/hero.css";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-headline">
          <span className="text-primary">Zenia</span>{' '}
          <span className="text-secondary">Kenyork</span>
        </h1>
        <p className="hero-subheadline">Kenya's #1 Online Marketplace</p>

        <div className="hero-typewriter">
          <Typewriter
            options={{
              strings: [
                '<span style="color: var(--color-primary)">BUY</span>',
                '<span style="color: var(--color-secondary)">SELL</span>',
                '<span style="color: var(--color-accent)">CONNECT</span>'
              ],
              autoStart: true,
              loop: true,
              delay: 75,
              cursor: '<span style="color: #FF0000; font-weight: 700">|</span>'
            }}
          />
        </div>

        <div className="hero-search">
          <input
            type="text"
            placeholder="Search by product, service, or location"
            className="search-input"
          />
          <button className="search-button">
            <Search size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;