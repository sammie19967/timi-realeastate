"use client";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"; // Social media icons
import "@/styles/footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo and Company Name */}
        <div className="footer-logo">
          <Image
            src="/timilogo.png"
            alt="Timi Properties Logo"
            width={120}
            height={70}
            className="logo"
          />
          <span className="company-name">Timi Properties</span>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about-us">About Us</a>
            </li>
            <li>
              <a href="/services">Services</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="footer-section">
          <h3 className="footer-heading">Contact Us</h3>
          <ul className="footer-contact">
            <li>254 Main Street, Nakuru, Kenya</li>
            <li>Phone: +254 (07) 25619364</li>
            <li>Email: timiproperties@gmail.com</li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="footer-section">
          <h3 className="footer-heading">Follow Us</h3>
          <div className="social-media">
            <a href="https://facebook.com" aria-label="Facebook">
              <Facebook size={24} />
            </a>
            <a href="https://twitter.com" aria-label="Twitter">
              <Twitter size={24} />
            </a>
            <a href="https://instagram.com" aria-label="Instagram">
              <Instagram size={24} />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn">
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Timi Properties. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;