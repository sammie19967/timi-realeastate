"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Home, Computer, Building, Car, Info, Menu, X, Sun, Moon } from "lucide-react"; 
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import "../styles/navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); 

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.setAttribute("data-theme", newMode ? "dark" : "light");
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo-container">
        <Image src="/logozenia.png" alt="Kenyorc Zenia Group" width={120} height={70} className="logo" />
      </div>

      {/* Create Free Ad Button */}
      <div className="create-ad-button">
        <Link href="/create-ad" className="create-ad-link">Create Free Ad</Link>
      </div>

      {/* Hamburger Menu Only in Header */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </div>

      {/* Navigation Links */}
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link href="/" className="nav-item"><Home size={20} /> <span>Home</span></Link>
        <Link href="/real-estate" className="nav-item"><Building size={20} /> <span>Real Estate</span></Link>
        <Link href="/showroom" className="nav-item"><Car size={20} /> <span>Showroom</span></Link>
        <Link href="/electronics" className="nav-item"><Computer size={20} /> <span>Electronics</span></Link>
        <Link href="/about-us" className="nav-item"><Info size={20} /> <span>About Us</span></Link>

        {/* Theme Toggle with Label */}
        <div className="theme-toggle-container" onClick={toggleDarkMode}>
          {isDarkMode ? (
            <>
              <Sun size={20} />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon size={20} />
              <span>Dark Mode</span>
            </>
          )}
        </div>

        {/* Authentication - Only in Menu */}
        <div className="auth-section">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="sign-in-button">Sign In</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;