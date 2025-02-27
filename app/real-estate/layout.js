"use client"

import PropertyCarousel from "./components/PropertyCarousel"
import { Component } from "lucide-react";


export default function RealEstateLayout({ children }) {
  return (
    <div className="real-estate-layout">
    <PropertyCarousel/>

      {/* Main Content (if needed) */}
      {children}
    </div>
  );
}