"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Home, Building, Car, Info, Menu, X, Sun, Moon } from "lucide-react"; // Added Sun and Moon icons
import DarkModeToggle from "../components/darkmodetoggle"; // Import your DarkModeToggle component
import "../styles/navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "light" : "dark"
    );
  };

  return (
    <nav className="navbar">
      {/* Logo and Company Name */}
      <div className="logo-container">
        <Image
          src="/timilogo.png"
          alt="Timi Properties Logo"
          width={120}
          height={70}
          className="logo"
        />
        <span className="company-name">Timi Properties</span>
      </div>

      {/* Hamburger Menu */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={30} /> : <Menu size={30} />}
      </div>

      {/* Navigation Links */}
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link href="/" className="nav-item">
          <Home size={20} /> <span>Home</span>
        </Link>
        <Link href="/real-estate" className="nav-item">
          <Building size={20} /> <span>Real Estate</span>
        </Link>
        <Link href="/showroom" className="nav-item">
          <Car size={20} /> <span>Showroom</span>
        </Link>
        <Link href="/about-us" className="nav-item">
          <Info size={20} /> <span>About Us</span>
        </Link>

        {/* Dark Mode Toggle */}
        <div className="dark-mode-toggle" onClick={toggleDarkMode}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;