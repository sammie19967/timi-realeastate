"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Home, Computer, Building, Car, Info, Menu, X, Sun, Moon } from "lucide-react"; 
import DarkModeToggle from "../components/darkmodetoggle"; 
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"; // Clerk Auth Imports
import "../styles/navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); 

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
        <Image src="/logozenia.png" alt="Kenyorc Zenia Group" width={120} height={70} className="logo" />
        
      </div>

      {/* Hamburger Menu */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={30} /> : <Menu size={30} />}
      </div>

      {/* Navigation Links */}
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link href="/" className="nav-item"><Home size={20} /> <span>Home</span></Link>
        <Link href="/real-estate" className="nav-item"><Building size={20} /> <span>Real Estate</span></Link>
        <Link href="/showroom" className="nav-item"><Car size={20} /> <span>Showroom</span></Link>
        <Link href="/electronics" className="nav-item"><Computer size={20} /> <span>Electronics</span></Link>
        <Link href="/about-us" className="nav-item"><Info size={20} /> <span>About Us</span></Link>

        {/* Dark Mode Toggle */}
        <div className="dark-mode-toggle" onClick={toggleDarkMode}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </div>

        {/* Authentication Buttons */}
        <div className="auth-buttons">
          <SignedOut>
            <SignInButton mode="modal" /> {/* Sign In Modal */}
           {/* Sign Up Modal */}
          </SignedOut>
          <SignedIn>
            <UserButton /> {/* Shows user profile when logged in */}
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
